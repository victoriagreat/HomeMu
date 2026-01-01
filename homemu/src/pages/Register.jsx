import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to user
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulated registration
    localStorage.setItem('userRole', role);
    alert(`Registered as ${role}! Logging you in...`);
    navigate('/');
    window.location.reload();
  };

  return (
    <section className="py-20 bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lemongreen"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lemongreen"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-5 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lemongreen"
          >
            <option value="user">User (Browse & Book)</option>
            <option value="agent">Agent / Landlord</option>
            <option value="admin">Admin (Request approval)</option>
          </select>
          <button
            type="submit"
            className="w-full bg-lemongreen text-white font-bold py-4 rounded-lg hover:bg-lemongreen-dark transition"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account? <a href="/login" className="text-lemongreen hover:underline">Login</a>
        </p>
      </div>
    </section>
  );
}

export default Register;