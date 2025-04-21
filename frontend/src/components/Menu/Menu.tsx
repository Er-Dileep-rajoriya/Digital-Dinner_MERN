import { RootState } from "@/redux/store";
import { MenuItemType } from "@/types/type";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setMenuItems } from "@/redux/slice/MenuSlice";
import Loading from "../Loading";
import { addToCart } from "@/redux/slice/cartSlice";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Menu = () => {
  const { menuItems } = useSelector((store: RootState) => store.menuReducer);
  const { cartItems } = useSelector((store: RootState) => store.cartReducer);
  const { loggedInUser } = useSelector((store: RootState) => store.userReducer);
  const [menuData, setMenuData] = useState<MenuItemType[]>([]);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const res = await axios.get(`${apiUrl}/menu`);
        if (res?.data?.success) {
          setMenuData(res.data.Items);
          dispatch(setMenuItems(res.data.Items));
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Something went wrong.");
      }
    }

    fetchMenuItems();
  }, [dispatch]);

  async function handleAddToCart(item: MenuItemType) {
    if (!loggedInUser) {
      return navigate("/login");
    }

    try {
      setLoadingItemId(item._id);
      const res = await axios.post(
        `${apiUrl}/cart`,
        {
          itemId: item._id,
          quantity: 1,
        },
        {
          withCredentials: true,
        }
      );

      if (res?.status === 200) {
        dispatch(addToCart({ ...item, quantity: 1 }));
        toast.success(res?.data?.message);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoadingItemId(null);
    }
  }

  const categorizedMenu = useMemo(() => {
    const grouped: Record<string, MenuItemType[]> = {};
    menuData.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  }, [menuData]);

  if (!menuItems || menuData.length <= 0) {
    return <Loading />;
  }

  function isAlreadyPresentInCart(item: MenuItemType) {
    return cartItems?.some((cartItem) => cartItem._id === item._id);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Our Menu</h1>

      {Object.entries(categorizedMenu).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">
            {category}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 rounded-xl shadow hover:shadow-lg transition-all transform hover:scale-105 flex flex-col h-full"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold mb-1 text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-3">
                  {item.description}
                </p>
                <p className="text-md font-semibold text-green-600 dark:text-green-400 mb-4">
                  ₹{item.price}
                </p>
                <div className="mt-auto">
                  <button
                    disabled={
                      isAlreadyPresentInCart(item) || loadingItemId === item._id
                    }
                    onClick={() => handleAddToCart(item)}
                    className={`w-full py-2 rounded-lg transition duration-200 flex items-center justify-center ${
                      isAlreadyPresentInCart(item)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    {loadingItemId === item._id ? (
                      <Loader2 className="animate-spin" />
                    ) : isAlreadyPresentInCart(item) ? (
                      "Already in cart"
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
