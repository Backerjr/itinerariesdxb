import { useState } from "react";
import BookingCard from "../components/BookingCard";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);

  async function lookup() {
    const res = await fetch(`/api/lookup?name=${name}&email=${email}`);
    const data = await res.json();
    if (data.guest) setBookings(data.guest.bookings);
    else alert(data.error);
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Ahmed Backer | Travel Expert™</h1>
      <p>Type your name & email to see your tour details.</p>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={lookup}>Find My Tours</button>

      {bookings.map((b) => (
        <BookingCard key={b.id} booking={b} />
      ))}
    </div>
  );
}
