import { initStripe } from '@stripe/stripe-react-native';
import Constants from 'expo-constants';

const STRIPE_PUBLISHABLE_KEY_VALUE = Constants.expoConfig?.extra?.stripePublishableKey;
const STRIPE_SECRET_KEY = Constants.expoConfig?.extra?.stripeSecretKey;

export const initializeStripe = async () => {
  await initStripe({
    publishableKey: STRIPE_PUBLISHABLE_KEY_VALUE,
    merchantIdentifier: 'merchant.com.tulutech.ecommerce',
  });
};

export const stripeService = {
  async createPaymentIntent(amount, currency = 'usd') {
    try {
      const response = await fetch('https://api.stripe.com/v1/payment_intents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `amount=${Math.round(amount * 100)}&currency=${currency}`,
      });
      
      const paymentIntent = await response.json();
      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  },

  async confirmPayment(paymentIntentClientSecret, paymentMethodId) {
    try {
      const response = await fetch(`https://api.stripe.com/v1/payment_intents/${paymentIntentClientSecret.split('_secret_')[0]}/confirm`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `payment_method=${paymentMethodId}`,
      });
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  }
};