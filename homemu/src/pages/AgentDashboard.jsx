import { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/common/PropertyCard';
import { Navigate } from 'react-router-dom';

function AgentDashboard() {
  const role = localStorage.getItem('userRole');
  if (role !== 'agent') return <Navigate to="/login" />;

  const { properties, addProperty, updateProperty, deleteProperty } = useProperties();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', price: '', location: '', category: 'Rent', bedrooms: '', bathrooms: '', image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProperty(editingId, formData);
      setEditingId(null);
    } else {
      addProperty(formData);
    }
    setFormData({ title: '', price: '', location: '', category: 'Rent', bedrooms: '', bathrooms: '', image: '' });
    setIsAdding(false);
  };

  const startEdit = (property) => {
    setEditingId(property.id);
    setFormData({
      title: property.title,
      price: property.price,
      location: property.location,
      category: property.category,
      bedrooms: property.bedrooms || '',
      bathrooms: property.bathrooms || '',
      image: property.image
    });
    setIsAdding(true);
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Agent Dashboard</h1>

        <button
          onClick={() => setIsAdding(true)}
          className="mb-8 bg-lemongreen text-white font-bold py-3 px-6 rounded-lg hover:bg-lemongreen-dark transition"
        >
          + Add New Property
        </button>

        {isAdding && (
          <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit' : 'Add New'} Property</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="px-4 py-3 border rounded-lg" />
              <input required placeholder="Price (e.g. ₦1,200,000/year)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="px-4 py-3 border rounded-lg" />
              <input required placeholder="Location (e.g. Awka, Anambra)" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="px-4 py-3 border rounded-lg" />
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="px-4 py-3 border rounded-lg">
                <option>Rent</option>
                <option>Sale</option>
                <option>Hospitality</option>
                <option>Shortlet</option>
              </select>
              <input placeholder="Bedrooms" type="number" value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} className="px-4 py-3 border rounded-lg" />
              <input placeholder="Bathrooms" type="number" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} className="px-4 py-3 border rounded-lg" />
              <input required placeholder="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="px-4 py-3 border rounded-lg md:col-span-2" />
              <div className="md:col-span-2 flex gap-4">
                <button type="submit" className="bg-lemongreen text-white px-8 py-3 rounded-lg">{editingId ? 'Update' : 'Add'} Property</button>
                <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="bg-gray-500 text-white px-8 py-3 rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <h2 className="text-3xl font-bold mb-8">Your Listings ({properties.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(property => (
            <div key={property.id} className="relative">
              <PropertyCard property={property} />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button onClick={() => startEdit(property)} className="bg-blue-600 text-white px-4 py-2 rounded shadow">Edit</button>
                <button onClick={() => deleteProperty(property.id)} className="bg-red-600 text-white px-4 py-2 rounded shadow">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AgentDashboard;