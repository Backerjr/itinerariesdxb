import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    setMessage("");
    setBookings([]);

    const res = await fetch("/api/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      const data = await res.json();
      setBookings(data);
    } else {
      const error = await res.json();
      setMessage(error.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Guest Booking Lookup</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSearch}>Find My Booking</button>
      </div>

      {message && <p>{message}</p>}

      {bookings.length > 0 && (
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              <strong>{b.tour}</strong> on {new Date(b.date).toLocaleDateString()} → {b.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
