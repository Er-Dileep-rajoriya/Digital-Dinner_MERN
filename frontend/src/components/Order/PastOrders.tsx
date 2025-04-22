import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import { OrderType } from "@/types/type";

const apiUrl = import.meta.env.VITE_API_URL;

const PastOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.post<{ orders: OrderType[] }>(
        `${apiUrl}/items/order/history`,
        {},
        {
          withCredentials: true,
        }
      );
      setOrders(res.data.orders);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Failed to load past orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Your Past Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="mb-6 p-4 border rounded shadow bg-white dark:bg-zinc-900"
          >
            <p className="mb-2 font-semibold text-lg">Order ID: {order.id}</p>
            <p className="mb-2">Phone: {order.phoneNumber}</p>
            <p className="mb-2">Total Amount: ₹{order.totalAmount}</p>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Items:</strong>
              <ul className="list-disc ml-5">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.title} x {item.quantity} = ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PastOrders;
