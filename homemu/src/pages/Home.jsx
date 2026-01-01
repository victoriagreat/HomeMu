import { Link } from 'react-router-dom';
import PropertyCard from '../components/common/PropertyCard';
import { useProperties } from '../context/PropertyContext';

function Home() {
  // Show only 3 featured properties on home page
  const { properties } = useProperties();
  const featured = properties.slice(0, 3);

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
  {/* Blurred Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-110"
    style={{ backgroundImage: 'url(/hero-bg.jpg)' }}  // Make sure your image is named hero-bg.jpg in public/
  />

  {/* Dark Overlay for Better Text Readability */}
  <div className="absolute inset-0 bg-black bg-opacity-50" />

  {/* Floating Particles (Optional - keep the subtle animation) */}
  <div className="absolute inset-0 opacity-30 pointer-events-none">
    <div className="animate-float absolute top-20 left-10 w-72 h-72 bg-lemongreen-light rounded-full blur-3xl"></div>
    <div className="animate-float-delayed absolute bottom-20 right-10 w-96 h-96 bg-lemongreen-light rounded-full blur-3xl"></div>
  </div>

  {/* Hero Content */}
  <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 drop-shadow-2xl">
      Find Your Perfect Home<br />
      in <span className="text-lemongreen-light">Anambra State</span>
    </h1>
    <p className="text-xl sm:text-2xl md:text-3xl text-white mb-10 opacity-90 drop-shadow-lg">
      Rent • Buy • Book Hotels & Shortlets — All in One Place
    </p>
    <Link
      to="/listings"
      className="inline-block bg-lemongreen text-white font-bold text-lg sm:text-xl px-10 py-5 rounded-full hover:bg-lemongreen-dark transition transform hover:scale-105 shadow-2xl"
    >
      Explore Properties
    </Link>
  </div>
</section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Featured Properties
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/listings"
              className="text-lemongreen text-lg font-semibold hover:underline"
            >
              View All Properties →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Quick Links */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Rent', 'Sale', 'Hospitality', 'Shortlet'].map((cat) => (
              <Link
                key={cat}
                to={`/listings?category=${cat}`}
                className="bg-white rounded-xl shadow-lg p-10 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-5xl mb-4">🏠</div>
                <h3 className="text-2xl font-bold text-gray-800">{cat}</h3>
                <p className="text-gray-600 mt-2">
                  Explore {cat.toLowerCase()} options in Anambra
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;