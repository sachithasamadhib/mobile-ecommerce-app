import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  TextInput
} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'US'
  });
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { confirmPayment } = useStripe();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const validateShippingInfo = () => {
    const { address, city, postalCode } = shippingInfo;
    if (!address.trim() || !city.trim() || !postalCode.trim()) {
      Alert.alert('Error', 'Please fill in all shipping information');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateShippingInfo()) return;

    if (!cardDetails?.complete) {
      Alert.alert('Error', 'Please enter complete card details');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('https://stripe-demo-server.herokuapp.com/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(getCartTotal() * 100),
          currency: 'usd',
          metadata: {
            userId: user?.uid || 'guest',
            email: user?.email || 'guest@example.com'
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { client_secret: clientSecret } = await response.json();

      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            email: user?.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              postal_code: shippingInfo.postalCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (error) {
        Alert.alert('Payment Failed', error.message);
      } else if (paymentIntent?.status === 'Succeeded') {
        clearCart();
        navigation.replace('Success', { 
          paymentIntent: paymentIntent,
          amount: getCartTotal(),
          orderDetails: {
            items: cartItems,
            shipping: shippingInfo,
            email: user?.email
          }
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Error', 'Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTestPayment = () => {
    if (!validateShippingInfo()) return;

    Alert.alert(
      'Test Payment',
      'This will simulate a successful payment. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Proceed', 
          onPress: () => {
            clearCart();
            navigation.replace('Success', { 
              paymentIntent: { id: 'pi_test_' + Date.now() },
              amount: getCartTotal(),
              orderDetails: {
                items: cartItems,
                shipping: shippingInfo,
                email: user?.email
              }
            });
          }
        },
      ]
    );
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Checkout</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Street Address"
            value={shippingInfo.address}
            onChangeText={(text) => setShippingInfo({...shippingInfo, address: text})}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              value={shippingInfo.city}
              onChangeText={(text) => setShippingInfo({...shippingInfo, city: text})}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Postal Code"
              value={shippingInfo.postalCode}
              onChangeText={(text) => setShippingInfo({...shippingInfo, postalCode: text})}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.slice(0, 3).map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.itemName} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.itemQuantity}>×{item.quantity}</Text>
              <Text style={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</Text>
            </View>
          ))}
          {cartItems.length > 3 && (
            <Text style={styles.moreItems}>
              ... and {cartItems.length - 3} more items
            </Text>
          )}
          
          <View style={styles.summarySection}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax:</Text>
              <Text style={styles.summaryValue}>{formatPrice(tax)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping:</Text>
              <Text style={styles.summaryValue}>
                {shipping === 0 ? 'FREE' : formatPrice(shipping)}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>{formatPrice(total)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <CardField
            postalCodeEnabled={true}
            placeholders={{
              number: '4242 4242 4242 4242',
              expiration: 'MM/YY',
              cvc: 'CVC',
            }}
            cardStyle={styles.cardField}
            style={styles.cardContainer}
            onCardChange={(details) => setCardDetails(details)}
          />
          
          <View style={styles.testInfo}>
            <Text style={styles.testTitle}>Test Cards:</Text>
            <Text style={styles.testNote}>• 4242 4242 4242 4242 (Visa)</Text>
            <Text style={styles.testNote}>• 5555 5555 5555 4444 (Mastercard)</Text>
            <Text style={styles.testNote}>• Use any future date and 3-digit CVC</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.testButton}
            onPress={handleTestPayment}
          >
            <Text style={styles.testButtonText}>
              Test Payment (Demo) - {formatPrice(total)}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.payButton, loading && styles.payButtonDisabled]}
            onPress={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.payButtonText}>
                Pay {formatPrice(total)}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.securityInfo}>
          <Text style={styles.securityText}>
            🔒 Your payment information is secure and encrypted
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  moreItems: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    paddingVertical: 8,
    textAlign: 'center',
  },
  summarySection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  cardContainer: {
    height: 50,
    marginVertical: 15,
  },
  cardField: {
    backgroundColor: '#f8f9fa',
    textColor: '#333',
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  testInfo: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  testTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  testNote: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  buttonContainer: {
    gap: 12,
  },
  testButton: {
    backgroundColor: '#ffa500',
    paddingVertical: 15,
    borderRadius: 8,
  },
  testButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  securityInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    alignItems: 'center',
  },
  securityText: {
    fontSize: 12,
    color: '#2d6e2d',
    textAlign: 'center',
  },
});

export default CheckoutScreen;