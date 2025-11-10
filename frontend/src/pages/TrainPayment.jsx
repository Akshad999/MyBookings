// import { useLocation } from "react-router-dom";
// const TrainPayment = () => {
//   const { state } = useLocation();
//   // Show summary and dummy payment
//   return (
//     <div>
//       <h2>Payment</h2>
//       <div>Train: {state.train.train_name}</div>
//       <div>Seats: {state.seats.join(", ")}</div>
//       <div>Total Amount: ₹{state.total}</div>
//       <button onClick={() => alert("Booking Confirmed!")}>Complete Payment</button>
//     </div>
//   );
// };
// export default TrainPayment;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

const TrainPayment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Send booking to backend
      const { data } = await api.post('/tickets/book', {
        train: state.train,
        seats: state.seats,
        total: state.total,
        from: state.train.from_station_name,
        to: state.train.to_station_name,
        date: state.train.date || new Date(),
        type: "train"
      });
      if (data.success) {
        toast.success("Booking confirmed!");
        navigate('/my-bookings'); // go to bookings page
      } else {
        toast.error("Booking failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      <div>Train: {state.train.train_name}</div>
      <div>Seats: {state.seats.join(", ")}</div>
      <div>Total Amount: ₹{state.total}</div>
      <button onClick={handlePayment}>Complete Payment</button>
    </div>
  );
};
export default TrainPayment;
