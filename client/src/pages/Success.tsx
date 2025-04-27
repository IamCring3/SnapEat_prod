import { Link, useLocation, useNavigate } from "react-router-dom";
import { store } from "../lib/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Container from "../ui/Container";
import Loading from "../ui/Loading";

const Success = () => {
  const { currentUser, cartProduct, resetCart } = store();
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const paymentId = new URLSearchParams(location.search).get("payment_id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionId && !paymentId) {
      navigate("/");
    } else if (cartProduct.length > 0) {
      const saveOrder = async () => {
        try {
          setLoading(true);
          console.log("Attempting to save order...");
          console.log("Current user:", currentUser);

          // Wait for user data to be available if it's not yet loaded
          if (!currentUser?.id) {
            console.log("User ID not found, waiting for user data to load...");
            // Wait a bit and check again - the user might still be loading
            await new Promise(resolve => setTimeout(resolve, 2000));

            // If still no user ID, show a more user-friendly error
            if (!currentUser?.id) {
              throw new Error("Unable to save your order. Please try again or contact support.");
            }
          }

          const orderRef = doc(db, "orders", currentUser.id);
          const docSnap = await getDoc(orderRef);

          // Determine payment method and ID
          const paymentMethod = sessionId ? "stripe" : "razorpay";
          const finalPaymentId = sessionId || paymentId;

          console.log("Payment method:", paymentMethod);
          console.log("Payment ID:", finalPaymentId);
          console.log("Cart products:", cartProduct.length);
          console.log("Saving order for user ID:", currentUser.id);

          // Try to get shipping address from localStorage
          let shippingAddress = null;
          try {
            const savedAddress = localStorage.getItem('lastShippingAddress');
            if (savedAddress) {
              shippingAddress = JSON.parse(savedAddress);
            }
          } catch (error) {
            console.error("Error retrieving shipping address:", error);
          }

          const orderData = {
            userEmail: currentUser?.email || null,
            phoneNumber: currentUser?.phoneNumber || null,
            userName: `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim(),
            paymentId: finalPaymentId,
            orderItems: cartProduct,
            paymentMethod: paymentMethod,
            userId: currentUser.id,
            orderDate: new Date().toISOString(),
            totalAmount: cartProduct.reduce((sum, item) => sum + ((item.discountedPrice || item.regularPrice) * item.quantity), 0),
            shippingAddress: shippingAddress,
            shippingCost: 25,
            taxAmount: 15
          };

          if (docSnap.exists()) {
            console.log("Updating existing order document");
            // Document exists, update the orderItems array
            await updateDoc(orderRef, {
              orders: arrayUnion(orderData),
            });
          } else {
            console.log("Creating new order document");
            // Document doesn't exist, create a new one
            await setDoc(orderRef, {
              orders: [orderData],
            });
          }

          console.log("Order saved successfully");
          toast.success("Payment accepted successfully & order saved!");
          resetCart();
        } catch (error: any) {
          console.error("Error saving order data:", error);
          toast.error(`Error saving order data: ${error.message || "Unknown error"}`);
        } finally {
          setLoading(false);
        }
      };
      saveOrder();
    }
  }, [sessionId, paymentId, navigate, currentUser, cartProduct, resetCart]);

  return (
    <Container>
      {loading && <Loading />}
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          {loading
            ? "Your order payment is processing"
            : "Your Payment Accepted by supergear.com"}
        </h2>
        <p>
          {loading ? "Once done" : "Now"} you can view your Orders or continue
          Shopping with us
        </p>
        <div className="flex items-center gap-x-5">
          <Link to={"/orders"}>
            <button className="bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              View Orders
            </button>
          </Link>
          <Link to={"/"}>
            <button className="bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Success;
