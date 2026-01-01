import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  return (
    <Link to={`/property/${property.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-4 left-4 bg-lemongreen text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.category}
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {property.title}
          </h3>
          <p className="text-lemongreen text-2xl font-bold mb-2">
            {property.price}
          </p>
          <p className="text-gray-600 flex items-center">
            📍 {property.location}
          </p>
          {(property.bedrooms || property.bathrooms) && (
            <div className="flex gap-4 mt-4 text-gray-600">
              {property.bedrooms && <span>🛏️ {property.bedrooms} Beds</span>}
              {property.bathrooms && <span>🚿 {property.bathrooms} Baths</span>}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;