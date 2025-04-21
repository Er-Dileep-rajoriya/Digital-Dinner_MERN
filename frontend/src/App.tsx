import Layout from "./components/Layout";
import { ThemeProvider } from "./ThemeProvider.tsx";
import Menu from "./components/Menu/Menu.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./components/Cart/Cart.tsx";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import Login from "./components/Login/Login.tsx";
import Signup from "./components/Signup/Signup.tsx";
import PlaceOrder from "./components/Order/PlaceOrder.tsx";
import PastOrders from "./components/Order/PastOrders.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "items/order",
        element: <PlaceOrder />,
      },
      {
        path: "items/order/history",
        element: <PastOrders />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
