import { Navigate } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/common/PropertyCard';

function AdminDashboard() {
  const role = localStorage.getItem('userRole');
  if (role !== 'admin') return <Navigate to="/login" />;

  const { properties, deleteProperty } = useProperties();

  const stats = {
    total: properties.length,
    rent: properties.filter(p => p.category === 'Rent').length,
    sale: properties.filter(p => p.category === 'Sale').length,
    hospitality: properties.filter(p => p.category === 'Hospitality').length,
    shortlet: properties.filter(p => p.category === 'Shortlet').length,
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-10">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-600">Total Listings</h3>
            <p className="text-4xl font-bold text-lemongreen mt-2">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-600">For Rent</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">{stats.rent}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-600">For Sale</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">{stats.sale}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-600">Hospitality</h3>
            <p className="text-4xl font-bold text-purple-600 mt-2">{stats.hospitality}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-600">Shortlet</h3>
            <p className="text-4xl font-bold text-orange-600 mt-2">{stats.shortlet}</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8">All Properties (Admin View)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(property => (
            <div key={property.id} className="relative group">
              <PropertyCard property={property} />
              <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => {
                  if (confirm('Delete this property?')) deleteProperty(property.id);
                }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;