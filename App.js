import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StripeProvider } from '@stripe/stripe-react-native';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import Navigation from './src/navigation/Navigation';
import ErrorBoundary from './src/components/ErrorBoundary';
import { initializeStripe } from './src/services/stripe';
import Constants from 'expo-constants';

export default function App() {
  useEffect(() => {
    initializeStripe();
  }, []);

  return (
    <ErrorBoundary>
      <StripeProvider publishableKey={Constants.expoConfig?.extra?.stripePublishableKey}>
        <AuthProvider>
          <CartProvider>
            <Navigation />
            <StatusBar style="auto" />
          </CartProvider>
        </AuthProvider>
      </StripeProvider>
    </ErrorBoundary>
  );
}
