import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';

function Booking() {
  const { id } = useParams();
  const { properties } = useProperties();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === Number(id));

  if (!property) return <div className="text-center py-20">Property not found</div>;

  const handleProceed = () => {
    navigate(`/payment/${id}`);
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Book {property.title}</h1>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <img src={property.image} alt={property.title} className="rounded-lg w-full h-80 object-cover" />
            <div>
              <h2 className="text-3xl font-bold">{property.title}</h2>
              <p className="text-2xl text-lemongreen font-bold my-4">{property.price}</p>
              <p className="text-lg text-gray-700">📍 {property.location}</p>
              <p className="text-lg mt-4">Category: <strong>{property.category}</strong></p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-6">Enter Your Details</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleProceed(); }}>
            <input placeholder="Full Name" required className="w-full px-5 py-3 mb-4 border rounded-lg" />
            <input type="email" placeholder="Email" required className="w-full px-5 py-3 mb-4 border rounded-lg" />
            <input type="tel" placeholder="Phone Number" required className="w-full px-5 py-3 mb-4 border rounded-lg" />
            <textarea placeholder="Check-in / Check-out Dates or Message" rows="4" className="w-full px-5 py-3 mb-6 border rounded-lg"></textarea>

            <button type="submit" className="w-full bg-lemongreen text-white font-bold py-5 rounded-lg hover:bg-lemongreen-dark transition text-xl">
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Booking;