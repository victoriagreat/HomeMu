import { useParams, Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';

function PropertyDetails() {
  const { id } = useParams();
  const { properties } = useProperties();
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800">Property not found</h2>
        <Link to="/listings" className="text-lemongreen hover:underline">← Back to Listings</Link>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <Link to="/listings" className="text-lemongreen hover:underline mb-6 inline-block">
          ← Back to Listings
        </Link>

        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-xl shadow-xl overflow-hidden">
          <div>
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="p-8">
            <span className="bg-lemongreen text-white px-4 py-2 rounded-full text-sm font-semibold">
              {property.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-3">
              {property.title}
            </h1>
            <p className="text-3xl font-bold text-lemongreen mb-4">
              {property.price}
            </p>
            <p className="text-xl text-gray-700 mb-6">📍 {property.location}</p>

            <div className="flex gap-6 text-lg text-gray-600 mb-8">
              {property.bedrooms && <span>🛏️ {property.bedrooms} Bedrooms</span>}
              {property.bathrooms && <span>🚿 {property.bathrooms} Bathrooms</span>}
            </div>

            <div className="flex gap-4">
              <Link to={`/booking/${property.id}`} className="block">
                <button className="bg-lemongreen text-white font-bold px-8 py-4 rounded-lg hover:bg-lemongreen-dark transition transform hover:scale-105 w-full md:w-auto">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyDetails;