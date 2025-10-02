export type Booking = {
  id: number;
  name: string;
  email: string;
  tour: string;
  date: string;
  status: string;
};

type BookingCardProps = {
  booking: Booking;
};

export default function BookingCard({ booking }: BookingCardProps) {
  const travelDate = new Date(booking.date);

  return (
    <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50 p-6 text-left shadow-sm">
      <h3 className="text-2xl font-semibold text-purple-900">{booking.tour}</h3>
      <dl className="mt-4 space-y-2 text-sm text-purple-900">
        <div className="flex justify-between">
          <dt className="font-medium">Guest</dt>
          <dd>{booking.name}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Email</dt>
          <dd>{booking.email}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Travel date</dt>
          <dd>{travelDate.toLocaleDateString()}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Status</dt>
          <dd className="font-semibold uppercase tracking-wide">{booking.status}</dd>
        </div>
      </dl>
    </div>
  );
}
