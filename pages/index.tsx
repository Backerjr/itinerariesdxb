import { FormEvent, useState } from "react";
import BookingCard, { Booking } from "../components/BookingCard";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setBooking(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = typeof data?.message === "string" ? data.message : "Booking not found";
        setError(message);
        return;
      }

      setBooking(data as Booking);
    } catch (err) {
      console.error("Failed to look up booking", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-900">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-8 flex items-center justify-center">
          🔍 Find Your Booking
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={isLoading || !name || !email}
            className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Searching..." : "Find My Booking"} <span className="ml-2">🌙</span>
          </button>
        </form>

        {error && (
          <p className="mt-6 rounded-lg bg-red-100 p-4 text-sm font-medium text-red-700" role="alert">
            {error}
          </p>
        )}

        {booking && <BookingCard booking={booking} />}
      </div>
    </div>
  );
}
