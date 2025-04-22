import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((store: RootState) => store.userReducer);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/items/order/history");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <svg
          className="mx-auto mb-4 w-16 h-16 text-green-500 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>

        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          Thank you{loggedInUser?.name ? `, ${loggedInUser.name}` : ""}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Your order has been placed successfully. 🛒
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          You will be redirected to your order history in a few seconds...
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;

