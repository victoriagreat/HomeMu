import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulated login logic
    if (email === 'admin@homemu.com') {
      localStorage.setItem('userRole', 'admin');
    } else if (email === 'agent@homemu.com') {
      localStorage.setItem('userRole', 'agent');
    } else {
      localStorage.setItem('userRole', 'user');
    }

    navigate('/');
    window.location.reload(); // Refresh to update header
  };

  return (
    <section className="py-20 bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login to HomeMu</h2>
        <form onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="w-full bg-lemongreen text-white font-bold py-4 rounded-lg hover:bg-lemongreen-dark transition"
          >
            Login
          </button>
        </form>
        {/* <p className="text-center mt-6 text-gray-600">
          Test accounts:<br/>
          <strong>admin@homemu.com</strong> → Admin<br/>
          <strong>agent@homemu.com</strong> → Agent<br/>
          Any other email → Regular User
        </p> */}
      </div>
    </section>
  );
}

export default Login;