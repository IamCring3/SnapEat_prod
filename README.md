# SnapEat - Food Ordering Application

SnapEat is a food ordering application with a React frontend and Node.js backend. It uses Firebase for authentication and database, and Razorpay for payment processing.

## Features

- User authentication with phone number verification
- Admin dashboard for managing orders, users, and products
- Razorpay payment gateway integration
- Responsive design for all devices

## Setup Instructions

### Prerequisites

- Node.js (v20.x recommended)
- npm or yarn
- Firebase account
- Razorpay test account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SnapEat-main
```

2. Install dependencies for both client and server:
```bash
# Install client dependencies
cd client
npm install

# Install admin server dependencies
cd ../admin
npm install
```

3. Configure Firebase:
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Firestore, Authentication (with Phone and Email/Password providers)
   - Get your Firebase configuration from Project Settings
   - Update the Firebase configuration in `client/src/lib/firebase.ts`

4. Configure Razorpay:
   - Create a Razorpay account at https://dashboard.razorpay.com/
   - Get your API keys from the Dashboard
   - Update the Razorpay API keys in:
     - `client/src/ui/RazorpayCheckoutBtn.tsx`
     - `admin/routes/razorpay.mjs`
     - `admin/.env` file

5. Create an admin user:
```bash
cd admin
npm run create-admin
```
Follow the prompts to create your admin user with email and password.

### Running the Application

1. Start the client:
```bash
cd client
npm run dev
```

2. Start the admin server:
```bash
cd admin
npm start
```

3. Access the application:
   - Client: http://localhost:5173/
   - Admin login: http://localhost:5173/admin/login

## Usage

### Regular Users

1. Regular users can register using phone number authentication
2. Browse products, add to cart, and checkout using Razorpay
3. View order history and profile information

### Admin Users

1. Admin users can log in at `/admin/login` using email and password
2. Access the admin dashboard at `/admin/dashboard`
3. Manage orders, users, and products
4. Create new admin users from the Users section

## Testing Razorpay

For testing Razorpay payments, use the following test card details:
- Card Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits
- Name: Any name

## Testing Phone Authentication

For testing phone authentication:
1. Enable phone authentication in your Firebase project
2. Add test phone numbers in the Firebase Authentication console
3. Use the verification codes provided in the Firebase console

## Project Structure

- `client/`: React frontend application
  - `src/`: Source code
    - `pages/`: Page components
    - `ui/`: UI components
    - `lib/`: Utility functions and Firebase setup

- `admin/`: Node.js backend server
  - `routes/`: API routes
  - `public/`: Static files
  - `createAdminUser.mjs`: Utility to create admin users

## License

[MIT License](LICENSE)
