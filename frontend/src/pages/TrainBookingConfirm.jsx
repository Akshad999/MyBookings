import { useLocation, useNavigate } from "react-router-dom";
const TrainBookingConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, seats } = location.state;
  const pricePerSeat = train.price || 250;
  const total = seats.length * pricePerSeat;

  return (
    <div>
      <h2>Confirm Booking</h2>
      <div>Train: {train.train_name}</div>
      <div>Date: {train.date || "Selected Date"}</div>
      <div>Seats: {seats.join(", ")}</div>
      <div>Total: ₹{total}</div>
      <button onClick={() => navigate("/booking/train/payment", { state: { train, seats, total } })}>
        Proceed to Pay
      </button>
    </div>
  );
};
export default TrainBookingConfirm;

