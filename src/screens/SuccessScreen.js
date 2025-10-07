import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  Share
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen = ({ route }) => {
  const navigation = useNavigation();
  const { paymentIntent, amount, orderDetails } = route.params || {};
  
  const scaleValue = new Animated.Value(0);
  const fadeValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 600,
        easing: Easing.back(1.2),
        useNativeDriver: true,
      }),
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const generateOrderNumber = () => {
    return 'ORD-' + Date.now().toString().slice(-8);
  };

  const handleContinueShopping = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  const handleShareOrder = async () => {
    try {
      const orderNumber = generateOrderNumber();
      const message = `🎉 Order Confirmed!\n\nOrder #${orderNumber}\nAmount: ${formatPrice(amount || 0)}\n\nThank you for shopping with us!`;
      
      await Share.share({
        message,
        title: 'Order Confirmation',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const orderNumber = generateOrderNumber();
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.successIcon, { transform: [{ scale: scaleValue }] }]}>
          <View style={styles.checkmarkContainer}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </Animated.View>
        
        <Animated.View style={[styles.textContainer, { opacity: fadeValue }]}>
          <Text style={styles.title}>Order Confirmed!</Text>
          <Text style={styles.subtitle}>
            Thank you for your purchase
          </Text>
        </Animated.View>
        
        <Animated.View style={[styles.detailsContainer, { opacity: fadeValue }]}>
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Order Information</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Order Number:</Text>
              <Text style={styles.detailValue}>{orderNumber}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment ID:</Text>
              <Text style={styles.detailValue}>
                {paymentIntent?.id || 'DEMO_' + Date.now()}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount Paid:</Text>
              <Text style={styles.detailValue}>
                {formatPrice(amount || 0)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Method:</Text>
              <Text style={styles.detailValue}>Credit Card</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Estimated Delivery:</Text>
              <Text style={styles.detailValue}>
                {estimatedDelivery.toLocaleDateString()}
              </Text>
            </View>
          </View>

          {orderDetails?.shipping && (
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Shipping Address</Text>
              <Text style={styles.addressText}>
                {orderDetails.shipping.address}
              </Text>
              <Text style={styles.addressText}>
                {orderDetails.shipping.city}, {orderDetails.shipping.postalCode}
              </Text>
              <Text style={styles.addressText}>
                {orderDetails.shipping.country}
              </Text>
            </View>
          )}

          {orderDetails?.items && (
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>
                Items Ordered ({orderDetails.items.length})
              </Text>
              {orderDetails.items.slice(0, 3).map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.itemQuantity}>×{item.quantity}</Text>
                  <Text style={styles.itemPrice}>
                    {formatPrice(item.price * item.quantity)}
                  </Text>
                </View>
              ))}
              {orderDetails.items.length > 3 && (
                <Text style={styles.moreItems}>
                  ... and {orderDetails.items.length - 3} more items
                </Text>
              )}
            </View>
          )}
        </Animated.View>

        <Animated.View style={[styles.messageContainer, { opacity: fadeValue }]}>
          <Text style={styles.message}>
            🎉 Your order has been confirmed and will be processed shortly.
          </Text>
          <Text style={styles.submessage}>
            You will receive an email confirmation with tracking details at{' '}
            <Text style={styles.email}>{orderDetails?.email || 'your email'}</Text>
          </Text>
        </Animated.View>

        <Animated.View style={[styles.buttonContainer, { opacity: fadeValue }]}>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShareOrder}
          >
            <Text style={styles.shareButtonText}>Share Order</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinueShopping}
          >
            <Text style={styles.continueButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.trackingInfo, { opacity: fadeValue }]}>
          <Text style={styles.trackingText}>
            📱 Download our app for real-time order tracking
          </Text>
        </Animated.View>
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
    alignItems: 'center',
    padding: 20,
  },
  successIcon: {
    marginTop: 40,
    marginBottom: 30,
  },
  checkmarkContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  checkmark: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 25,
  },
  detailSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
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
    textAlign: 'center',
    paddingTop: 8,
  },
  messageContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  submessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  email: {
    fontWeight: '600',
    color: '#007AFF',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  shareButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  trackingInfo: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  trackingText: {
    fontSize: 12,
    color: '#1976d2',
    textAlign: 'center',
  },
});

export default SuccessScreen;