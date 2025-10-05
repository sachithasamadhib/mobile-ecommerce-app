import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StripeProvider } from '@stripe/stripe-react-native';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import Navigation from './src/navigation/Navigation';
import { initializeStripe } from './src/services/stripe';

const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_publishable_key_here';

export default function App() {
  useEffect(() => {
    initializeStripe();
  }, []);

  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <AuthProvider>
        <CartProvider>
          <Navigation />
          <StatusBar style="auto" />
        </CartProvider>
      </AuthProvider>
    </StripeProvider>
  );
}
