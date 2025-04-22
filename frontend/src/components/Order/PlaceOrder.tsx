import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import { clearCart } from "@/redux/slice/cartSlice";

const apiUrl = import.meta.env.VITE_API_URL;

const PlaceOrder = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  const handleOrder = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setLoading(true);
  
    try {
      // Place the order
      const res = await axios.post(
        `${apiUrl}/items/order`,
        {
          items: cartItems,
          totalAmount,
          phoneNumber,
        },
        { withCredentials: true }
      );
  
      // Only clear cart if order placement is successful
      if (res.status === 201) {
        // Clear backend cart
        const res2 = await axios.delete(`${apiUrl}/cart/clear`, {
          withCredentials: true,
        });
  
        if (res2.status === 200) {
          dispatch(clearCart()); // Clear local Redux cart
        } else {
          console.warn("Cart not cleared on backend");
        }
  
        navigate("/items/order/confirm");
        toast.success("Order placed successfully!");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Order placement error:", error);
      toast.error(error?.response?.data?.message || "Failed to place the order");
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Confirm Your Order
      </h2>

      <div className="bg-white dark:bg-zinc-900 shadow rounded p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between py-2 border-b text-sm"
          >
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between mt-4 font-semibold text-lg">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow rounded p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3">Contact Details</h3>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded-md dark:bg-zinc-800 dark:text-white"
        />
      </div>

      <button
        onClick={handleOrder}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition shadow"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default PlaceOrder;
