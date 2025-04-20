import React from 'react';

function Home() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-cover bg-center h-[70vh] flex items-center justify-center text-white px-4"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1470&q=80')" }}>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to My Auth App 🚀</h1>
          <p className="text-lg">Secure, Fast, and Beautifully Built with the MERN Stack</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 py-12 max-w-4xl mx-auto text-slate-700">
        <h2 className="text-3xl font-semibold mb-6 text-center text-slate-800">What’s Inside</h2>
        <p className="mb-4">
          This full-stack web application is built using the MERN (MongoDB, Express, React, Node.js) stack.
          It supports user authentication with JSON Web Tokens (JWT), protected routes, and responsive UI.
        </p>
        <p className="mb-4">
          Whether you're building a SaaS product or a personal dashboard, this app gives you a solid head start.
        </p>
        <p>
          You can customize and scale this application as per your needs. It’s your playground to build something amazing.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="px-6 pb-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-slate-800 mb-8">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1581090700227-1e8e1f52e1b7?auto=format&fit=crop&w=800&q=80"
              alt="Space"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Outer Space</h3>
              <p className="text-sm text-slate-600">
                Discover the vast universe beyond our world. Perfect for space enthusiasts.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80"
              alt="Cars"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Super Cars</h3>
              <p className="text-sm text-slate-600">
                Check out the latest and greatest in car design and engineering.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&w=800&q=80"
              alt="Tech"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Tech & Innovation</h3>
              <p className="text-sm text-slate-600">
                Dive into the world of emerging technologies and futuristic trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
