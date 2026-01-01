import { useParams, Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

function Payment() {
  const { id } = useParams();
  const { properties } = useProperties();
  const property = properties.find(p => p.id === Number(id));

  if (!property) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl">Property not found</p>
        <Link to="/listings" className="text-lemongreen hover:underline">← Back to Listings</Link>
      </div>
    );
  }

  const config = {
    public_key: 'FLWPUBK_TEST-YOUR_TEST_KEY_HERE-X', // ← Paste your test key here
    tx_ref: 'homemu-' + Date.now() + '-' + property.id,
    amount: parseFloat(property.price.replace(/₦|,/g, '')) || 10000,
    currency: 'NGN',
    payment_options: 'card,banktransfer,ussd',
    customer: {
      email: 'customer@example.com',
      phone_number: '07012345678',
      name: 'John Doe',
    },
    customizations: {
      title: 'HomeMu Booking',
      description: `Payment for ${property.title}`,
      logo: '/logo.png', // Your logo in public folder
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <section className="py-16 bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Complete Payment</h1>

        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold">{property.title}</h2>
          <p className="text-xl text-lemongreen font-bold mt-2">Amount: {property.price}</p>
          <p className="text-gray-700 mt-2">📍 {property.location}</p>
        </div>

        <button
          onClick={() => {
            handleFlutterPayment({
              callback: (response) => {
                console.log(response);
                if (response.status === 'successful') {
                  alert('🎉 Payment Successful! Booking confirmed.');
                  closePaymentModal();
                  window.location.href = '/';
                } else {
                  alert('Payment failed. Please try again.');
                }
              },
              onClose: () => {
                console.log('Payment modal closed');
              },
            });
          }}
          className="w-full bg-lemongreen text-white font-bold py-6 rounded-lg hover:bg-lemongreen-dark transition text-xl shadow-lg"
        >
          Pay with Flutterwave
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Secured by Flutterwave 🇳🇬<br />
          <Link to="/listings" className="text-lemongreen hover:underline">← Back to Listings</Link>
        </p>
      </div>
    </section>
  );
}

export default Payment;