import { useState } from 'react';
import PropertyCard from '../components/common/PropertyCard';
import { useProperties } from '../context/PropertyContext';

function Listings() {
  const { properties } = useProperties();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory ? property.category === selectedCategory : true;

    const propertyPrice = parseFloat(property.price.replace(/₦|,/g, '')) || 0;
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : null;

    const matchesPrice = maxPriceNum ? propertyPrice <= maxPriceNum : true;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
          All Properties in Anambra State
        </h1>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lemongreen bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lemongreen bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Categories</option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Shortlet">Shortlet</option>
            </select>

            <input
              type="number"
              placeholder="Max Price (₦)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lemongreen bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          {filteredProperties.length} properties found
        </p>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              No properties found matching your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Listings;