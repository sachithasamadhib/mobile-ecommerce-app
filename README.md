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

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
├── context/         # React Context providers
├── navigation/      # Navigation configuration
├── screens/         # Screen components
├── services/        # API and external services
└── utils/          # Utility functions
```