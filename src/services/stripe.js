import { initStripe } from '@stripe/stripe-react-native';

const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_publishable_key_here';

export const initializeStripe = async () => {
  await initStripe({
    publishableKey: STRIPE_PUBLISHABLE_KEY,
    merchantIdentifier: 'merchant.com.mobilecommerce',
  });
};

export const stripeService = {
  async createPaymentIntent(amount, currency = 'usd') {
    try {
      const response = await fetch('https://api.stripe.com/v1/payment_intents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
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
          'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
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