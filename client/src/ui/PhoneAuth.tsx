import { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, db, storage } from "../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { MdPhotoLibrary } from "react-icons/md";
import Label from "./Label";
import { useNavigate } from "react-router-dom";
import { store } from "../lib/store";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

const PhoneAuth = ({ setLogin }: { setLogin: any }) => {
  const navigate = useNavigate();
  const { getUserInfo } = store();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(1); // 1: Enter phone and user details, 2: Enter verification code
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and registration
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    avatar: null as File | null,
    avatarUrl: ""
  });

  // Clean up reCAPTCHA when component unmounts
  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  // Setup recaptcha
  const setupRecaptcha = () => {
    try {
      console.log("Setting up reCAPTCHA...");
      if (!window.recaptchaVerifier) {
        // Use invisible reCAPTCHA for better user experience
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'send-code-button', {
          'size': 'invisible',
          'callback': () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log("reCAPTCHA verified, sending verification code...");
            // The sendVerificationCode will be called manually
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            console.log("reCAPTCHA expired");
            toast.error("Verification expired. Please try again.");
            if (window.recaptchaVerifier) {
              window.recaptchaVerifier.clear();
              window.recaptchaVerifier = null;
            }
          }
        });

        console.log("reCAPTCHA verifier created");
      }
    } catch (error) {
      console.error("Error setting up reCAPTCHA:", error);
      toast.error("Failed to set up verification. Please try again.");
    }
  };

  // Send verification code
  const sendVerificationCode = async () => {
    try {
      setLoading(true);
      setError("");

      // Format phone number (ensure it has country code)
      const formattedPhoneNumber = phoneNumber.startsWith("+")
        ? phoneNumber
        : `+${phoneNumber}`;

      console.log("Sending verification code to:", formattedPhoneNumber);

      // Send verification code
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier
      );

      console.log("Verification code sent successfully");

      // Save confirmation result
      window.confirmationResult = confirmationResult;

      // Move to verification step
      setStep(2);
      toast.success("Verification code sent!");
    } catch (error: any) {
      console.error("Error sending verification code:", error);
      // Log detailed error information
      if (error.code) {
        console.error("Error code:", error.code);
      }
      if (error.message) {
        console.error("Error message:", error.message);
      }

      let errorMessage = "Failed to send verification code";

      // More specific error messages based on error code
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = "Invalid phone number format. Please include country code (e.g., +1234567890)";
      } else if (error.code === 'auth/missing-phone-number') {
        errorMessage = "Please enter a phone number";
      } else if (error.code === 'auth/quota-exceeded') {
        errorMessage = "SMS quota exceeded. Please try again later";
      } else if (error.code === 'auth/captcha-check-failed') {
        errorMessage = "reCAPTCHA verification failed. Please try again";
      }

      setError(errorMessage);
      toast.error(errorMessage);

      // Reset recaptcha
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  // Verify code and sign in
  const verifyCode = async () => {
    try {
      setLoading(true);
      setError("");

      if (!window.confirmationResult) {
        throw new Error("Verification session expired. Please try again.");
      }

      // Confirm the verification code
      const result = await window.confirmationResult.confirm(verificationCode);

      // User signed in successfully
      const user = result.user;

      // Check if this is a registration or login
      if (isRegistering) {
        // Upload avatar if provided
        let avatarUrl = "";
        if (userInfo.avatar) {
          const storageRef = ref(storage, `avatars/${user.uid}_${Date.now()}`);
          await uploadBytes(storageRef, userInfo.avatar);
          avatarUrl = await getDownloadURL(storageRef);
        }

        // Save user profile to Firestore
        await setDoc(doc(db, "users", user.uid), {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          phoneNumber: user.phoneNumber,
          avatar: avatarUrl,
          id: user.uid,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }, { merge: true });

        toast.success("Successfully registered and logged in!");
      } else {
        // Just update last login time for existing users
        await setDoc(doc(db, "users", user.uid), {
          lastLogin: new Date().toISOString()
        }, { merge: true });

        toast.success("Successfully logged in!");
      }

      // Reset form
      setUserInfo({
        firstName: "",
        lastName: "",
        avatar: null,
        avatarUrl: ""
      });

      // Update the global store with the user information
      console.log("Updating global store with user ID:", user.uid);
      await getUserInfo(user.uid);

      // Automatically redirect to home page after successful login
      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (error: any) {
      console.error("Error verifying code:", error);
      setError(error.message || "Failed to verify code");
      toast.error("Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  // Handle phone number and user info submit
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Phone submit form submitted");

    // Validate user information if registering
    if (isRegistering && (!userInfo.firstName || !userInfo.lastName)) {
      setError("First name and last name are required");
      return;
    }

    // Validate phone number format
    if (!phoneNumber) {
      setError("Please enter a phone number");
      return;
    }

    const formattedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber}`;

    // Basic validation for phone number format
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formattedPhoneNumber)) {
      setError("Invalid phone number format. Please include country code (e.g., +1234567890)");
      return;
    }

    // Setup reCAPTCHA first
    setupRecaptcha();

    // Then manually send the verification code
    await sendVerificationCode();
  };

  // Handle verification code submit
  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode();
  };

  // Handle avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserInfo({
        ...userInfo,
        avatar: file,
        avatarUrl: URL.createObjectURL(file)
      });
    }
  };

  return (
    <div className="bg-gray-950 rounded-lg">
      {step === 1 ? (
        <form onSubmit={handlePhoneSubmit} className="max-w-5xl mx-auto pt-10 px-10 lg:px-0 text-white">
          <div className="border-b border-b-white/10 pb-5">
            <h2 className="text-lg font-semibold uppercase leading-7">
              {isRegistering ? "Registration Form" : "Phone Login"}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              {isRegistering
                ? "Please provide your information to create an account. You'll receive a verification code on your phone."
                : "Enter your phone number to receive a verification code."}
            </p>
          </div>

          <div className="border-b border-b-white/10 pb-5">
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
              {isRegistering && (
                <>
                  <div className="sm:col-span-3">
                    <Label title="First name" htmlFor="firstName" />
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={userInfo.firstName}
                      onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-4 outline-none text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
                      required
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <Label title="Last name" htmlFor="lastName" />
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={userInfo.lastName}
                      onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-4 outline-none text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
                      required
                    />
                  </div>
                </>
              )}

              <div className={isRegistering ? "sm:col-span-3" : "sm:col-span-6"}>
                <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-white">
                  Phone Number (with country code)
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1234567890"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-4 outline-none text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
                  required
                />
              </div>

              {isRegistering && (
                <div className="col-span-full">
                  <div className="mt-2 flex items-center gap-x-3">
                    <div className="flex-1">
                      <Label title="Profile Photo (Optional)" />
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-4">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-14 h-14 border border-gray-600 rounded-full p-1">
                            {userInfo.avatarUrl ? (
                              <img
                                src={userInfo.avatarUrl}
                                alt="userImage"
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <MdPhotoLibrary className="mx-auto h-full w-full text-gray-500" />
                            )}
                          </div>
                          <div className="mt-4 flex items-center mb-1 text-sm leading-6 text-gray-400">
                            <label htmlFor="file-upload">
                              <span className="relative cursor-pointer rounded-md px-2 py-1 bg-gray-900 font-semibold text-gray-200 hover:bg-gray-800">
                                Upload a file
                              </span>
                              <input
                                type="file"
                                name="file-upload"
                                id="file-upload"
                                className="sr-only"
                                onChange={handleAvatarChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-400">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* reCAPTCHA container is no longer needed as we're using invisible reCAPTCHA */}
          </div>

          {error && (
            <p className="bg-white/90 text-red-600 text-center py-1 rounded-md tracking-wide font-semibold mt-4">
              {error}
            </p>
          )}

          <button
            id="send-code-button" // This ID is used by the reCAPTCHA verifier
            type="submit"
            disabled={loading || !phoneNumber || (isRegistering && (!userInfo.firstName || !userInfo.lastName))}
            className="mt-5 bg-primary w-full py-2 uppercase text-base font-bold tracking-wide text-white rounded-md hover:!bg-white hover:text-red-600 hover:border-2 hover:border-red-600 duration-300 ease-in disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:hover:text-white disabled:hover:border-transparent"
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerificationSubmit} className="max-w-5xl mx-auto pt-10 px-10 lg:px-0 text-white">
          <div className="border-b border-b-white/10 pb-5">
            <h2 className="text-lg font-semibold uppercase leading-7">
              Verify Phone Number
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Enter the verification code sent to {phoneNumber}
            </p>
          </div>

          <div className="border-b border-b-white/10 pb-5">
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="verificationCode" className="block text-sm font-medium leading-6 text-white">
                  Verification Code
                </label>
                <input
                  type="text"
                  name="verificationCode"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-4 outline-none text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="bg-white/90 text-red-600 text-center py-1 rounded-md tracking-wide font-semibold mt-4">
              {error}
            </p>
          )}

          <div className="flex gap-4 mt-5">
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setError("");
                if (window.recaptchaVerifier) {
                  window.recaptchaVerifier.clear();
                  window.recaptchaVerifier = null;
                }
              }}
              className="bg-gray-700 w-1/2 py-2 uppercase text-base font-bold tracking-wide text-white rounded-md hover:bg-gray-600 duration-300 ease-in"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading || !verificationCode}
              className="bg-primary w-1/2 py-2 uppercase text-base font-bold tracking-wide text-white rounded-md hover:!bg-white hover:text-red-600 hover:border-2 hover:border-red-600 duration-300 ease-in disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:hover:text-white disabled:hover:border-transparent"
            >
              {loading ? "Verifying..." : isRegistering ? "Verify & Complete Registration" : "Verify & Login"}
            </button>
          </div>
        </form>
      )}

      <p className="text-sm leading-6 text-gray-400 text-center py-10">
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError("");
          }}
          className="text-gray-200 font-semibold underline underline-offset-2 decoration-[1px] hover:text-red-600 duration-300 ease-in"
        >
          {isRegistering ? "Login with Phone" : "Register Now"}
        </button>
      </p>

      {loading && <Loading />}
    </div>
  );
};

export default PhoneAuth;
