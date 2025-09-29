import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
      {/* Overlay for classy dim effect */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 max-w-lg w-full bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-10">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-8 tracking-tight">
          🔍 Find Your Booking
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
          >
            Find My Booking
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 rounded-xl bg-white shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Your Booking:
            </h2>
            {result.error ? (
              <p className="text-red-600">{result.error}</p>
            ) : (
              <ul className="space-y-2 text-gray-700">
                <li><strong>Tour:</strong> {result.tour}</li>
                <li><strong>Date:</strong> {new Date(result.date).toLocaleDateString()}</li>
                <li><strong>Status:</strong> {result.status}</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
