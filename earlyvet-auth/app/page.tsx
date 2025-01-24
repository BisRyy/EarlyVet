import React from "react";

const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <img src="/logo.jpeg" alt="EarlyVet Logo" className="h-64 mb-6" />
      <h1 className="text-5xl font-bold mb-6">Welcome to EarlyVet</h1>
      <p className="text-xl mb-8">Your trusted companion for livestock care.</p>
      <a
        href="/login"
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Get Started
      </a>
    </main>
  );
};

export default LandingPage;
