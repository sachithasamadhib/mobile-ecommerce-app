# 📱 TuluTech E-Commerce Mobile App

A modern mobile e-commerce application built with React Native and Expo, featuring secure authentication, product browsing, and integrated payment processing.

[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.12-black.svg)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.3.0-orange.svg)](https://firebase.google.com/)
[![Stripe](https://img.shields.io/badge/Stripe-0.50.3-purple.svg)](https://stripe.com/)

## 🌟 Features

- 🔐 **Authentication**: Secure user registration and login with Firebase Auth
- 🛍️ **Product Catalog**: Browse and search products
- 🛒 **Shopping Cart**: Add/remove items with real-time updates
- 💳 **Payment Processing**: Secure checkout with Stripe integration
- 📱 **Cross-Platform**: Works on iOS and Android
- 🎨 **Modern UI**: Clean and intuitive interface

## 📱 Screenshots

<div align="center">

### Authentication & Registration
<img src="screenshots/Screenshot_20251007_092730_Expo Go.jpg" width="250" alt="Login Screen" />
<img src="screenshots/Screenshot_20251007_092741_Expo Go.jpg" width="250" alt="Registration Screen" />

### Product Catalog & Details
<img src="screenshots/Screenshot_20251007_092745_Expo Go.jpg" width="250" alt="Home Screen - Product Catalog" />
<img src="screenshots/Screenshot_20251007_092811_Expo Go.jpg" width="250" alt="Product Details" />

### Shopping Cart & Checkout
<img src="screenshots/Screenshot_20251007_092838_Expo Go.jpg" width="250" alt="Shopping Cart" />
<img src="screenshots/Screenshot_20251007_092859_Expo Go.jpg" width="250" alt="Checkout Screen" />

### Payment Processing
<img src="screenshots/Screenshot_20251007_092929_Expo Go.jpg" width="250" alt="Payment Form" />
<img src="screenshots/Screenshot_20251007_093023_Expo Go.jpg" width="250" alt="Payment Processing" />

### Order Confirmation
<img src="screenshots/Screenshot_20251007_093034_Expo Go.jpg" width="250" alt="Order Success" />
<img src="screenshots/Screenshot_20251007_093042_Expo Go.jpg" width="250" alt="Order Confirmation" />
<img src="screenshots/Screenshot_20251007_093055_Expo Go.jpg" width="250" alt="Final Screen" />

</div>

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sachithasamadhib/mobile-ecommerce-app.git
   cd mobile-ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase and Stripe credentials
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   - Scan QR code with Expo Go app (mobile)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication with Email/Password
3. Copy your config to `.env` file

### Stripe Setup
1. Create a Stripe account
2. Get your test API keys
3. Add them to `.env` file

## 📦 Tech Stack

- **Frontend**: React Native, Expo
- **Navigation**: React Navigation
- **Authentication**: Firebase Auth
- **Payment**: Stripe
- **State Management**: React Context API
- **Storage**: AsyncStorage

## 📦 Project Structure

```
mobile-ecommerce-app/
├── 📁 assets/                    # Images, icons, and static assets
├── 📁 src/
│   ├── 📁 components/            # Reusable UI components
│   │   ├── ErrorBoundary.js      # Error handling wrapper
│   │   ├── LoadingScreen.js      # Loading state component
│   │   └── ProductCard.js        # Product display component
│   ├── 📁 context/               # React Context providers
│   │   ├── AuthContext.js        # Authentication state management
│   │   └── CartContext.js        # Shopping cart state management
│   ├── 📁 navigation/            # App navigation structure
│   │   └── Navigation.js         # Main navigation component
│   ├── 📁 screens/               # App screens
│   │   ├── CartScreen.js         # Shopping cart view
│   │   ├── CheckoutScreen.js     # Payment processing
│   │   ├── HomeScreen.js         # Product catalog
│   │   ├── LoginScreen.js        # User authentication
│   │   ├── ProductDetailScreen.js # Individual product view
│   │   ├── RegisterScreen.js     # User registration
│   │   └── SuccessScreen.js      # Order confirmation
│   ├── 📁 services/              # External service integrations
│   │   ├── api.js                # Product API service
│   │   ├── firebase.js           # Firebase configuration
│   │   └── stripe.js             # Stripe payment service
│   └── 📁 utils/                 # Utility functions
├── 📄 app.json                   # Expo configuration
├── 📄 package.json               # Dependencies and scripts
└── 📄 README.md                  # Project documentation
```

## 🛠️ Technology Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Screen navigation and routing
- **React Context API** - State management

### Backend Services
- **Firebase Authentication** - User management
- **Firebase Firestore** - NoSQL database
- **DummyJSON API** - Product data source

### Payment Processing
- **Stripe** - Payment processing and security
- **Stripe React Native SDK** - Mobile payment integration

### Storage & Security
- **AsyncStorage** - Local data persistence
- **Expo SecureStore** - Secure credential storage
- **Expo Crypto** - Cryptographic functions

## ⚙️ Setup Guide

### 1. Firebase Configuration

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** → **Email/Password** sign-in method
3. Create a **Firestore Database**
4. Get your configuration from **Project Settings** → **General**
5. Update `.env` file with Firebase credentials

### 2. Stripe Configuration

1. Create an account at [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers** → **API keys**
3. Copy your **Publishable key** and **Secret key** (test mode)
4. Update `.env` file with Stripe credentials

### 3. Environment Variables

Create a `.env` file in the project root:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
```

## 📱 Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser
```

## 🔒 Security Features

- **Environment Variables** - Sensitive data protection
- **Firebase Security Rules** - Database access control
- **Encrypted Storage** - Secure local data storage
- **HTTPS Communication** - Encrypted data transmission
- **Input Validation** - XSS and injection prevention

## 🎨 UI/UX Features

- **Responsive Design** - Adapts to all screen sizes
- **Intuitive Navigation** - Easy-to-use interface
- **Loading States** - Visual feedback during operations
- **Error Handling** - Graceful error management
- **Offline Support** - Basic functionality without internet

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Type checking (if TypeScript is added)
npm run type-check
```

## 📚 API Reference

### Product API (DummyJSON)
- **Base URL**: `https://dummyjson.com`
- **Endpoints**:
  - `GET /products` - Get all products
  - `GET /products/{id}` - Get product by ID
  - `GET /products/search?q={query}` - Search products

### Firebase Services
- **Authentication** - User management
- **Firestore** - Data storage
- **Security Rules** - Access control

## 🚀 Deployment

### Expo Application Services (EAS)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS**
   ```bash
   eas build:configure
   ```

3. **Build for production**
   ```bash
   eas build --platform all
   ```

4. **Submit to app stores**
   ```bash
   eas submit
   ```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License.

---
