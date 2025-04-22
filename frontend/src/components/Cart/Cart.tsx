import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { removeFromCart, updateCartItemQuantity } from "@/redux/slice/cartSlice";
import { RootState } from "@/redux/store";
import { CartItemType } from "@/types/type";
import Loading from "../Loading";
import { setCartItems } from "@/redux/slice/cartSlice";

// API base URL
const apiUrl = import.meta.env.VITE_API_URL;

const Cart: React.FC = () => {
  const { cartItems } = useSelector((store: RootState) => store.cartReducer);
  const { loggedInUser } = useSelector((store: RootState) => store.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);



  // fetch all cart items from this api -> GET METHOD - apiUrl/cart and set to the redux also

  // Redirect if not logged in
  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`${apiUrl}/cart`, {
          withCredentials: true,
        });
  
        if (res.status === 200) {
          dispatch(setCartItems(res.data?.cartItems));
        }
      } catch (err: unknown) {
        const error = err as AxiosError<{ message?: string }>;
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
  
    if (loggedInUser) {
      fetchCartItems();
    }
  }, [loggedInUser, dispatch]);
  

  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveFromCart = async (item: CartItemType): Promise<void> => {
    const itemId = item._id;
    try {
      const res = await axios.post(
        `${apiUrl}/cart/${itemId}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(removeFromCart(itemId));
        toast.success(res.data?.message || "Item removed from cart");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
    
      console.error(error);
    
      toast.error(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  };

  const increaseQuantity = async (id: string, currentQty: number): Promise<void> => {
    try {
      const res = await axios.patch(
        `${apiUrl}/cart/inc/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(updateCartItemQuantity({ id, quantity: currentQty + 1 }));
        toast.success("Increased quantity");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
    
      console.error(error);
    
      toast.error(
        error.response?.data?.message || "Failed with response"
      );
    }
  };

  const decreaseQuantity = async (id: string, currentQty: number): Promise<void> => {
    if (currentQty <= 1) return;
    try {
      const res = await axios.patch(
        `${apiUrl}/cart/dec/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(updateCartItemQuantity({ id, quantity: currentQty - 1 }));
        toast.success("Decreased quantity");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
    
      console.error(error);
    
      toast.error(
        error.response?.data?.message || "Failed to Decrease Quantity."
      );
    }
  };

  if (loading) return <Loading />;

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h2 className="text-2xl text-gray-700 dark:text-gray-200 font-semibold">
          Your cart is empty 🛒
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-600">
        Your Cart
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white dark:bg-zinc-900">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200 dark:bg-zinc-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Item</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50 dark:hover:bg-zinc-800">
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100">{item.title}</td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100">₹{item.price}</td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100">
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 text-black bg-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-700"
                      onClick={() => decreaseQuantity(item._id, item.quantity)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="px-2 py-1 text-black bg-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-700"
                      onClick={() => increaseQuantity(item._id, item.quantity)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100">₹{item.price * item.quantity}</td>
                <td className="px-4 py-4 text-sm text-red-600 dark:text-red-500">
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <span className="text-xl font-semibold">Total:</span>
        <span className="text-2xl text-green-600 font-bold">₹{calculateTotal()}</span>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/items/order")}
          className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Cart;
