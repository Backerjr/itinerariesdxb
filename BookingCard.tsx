export default function BookingCard({ booking }) {
  return (
    <div style={{
      margin: "1rem 0",
      padding: "1rem",
      border: "1px solid #ddd",
      borderRadius: "8px"
    }}>
      <h3>{booking.tourName}</h3>
      <p><b>Date:</b> {new Date(booking.date).toLocaleDateString()}</p>
      <p><b>Pickup:</b> {booking.pickup}</p>
      <p><b>Status:</b> {booking.status}</p>
      <p><b>Ref:</b> {booking.reference}</p>
    </div>
  );
}
