import { Loader2, LogOut, Menu, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearLoggedInUser } from "@/redux/slice/userSlice";
import { toast } from "sonner";
import axios from "axios";
import { clearCart } from "@/redux/slice/cartSlice";

const apiUrl = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { loggedInUser } = useSelector((store: RootState) => store.userReducer);
  const { cartItems } = useSelector((store: RootState) => store.cartReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/user/logout`);
      if (res?.data?.success) {
        dispatch(clearLoggedInUser());
        dispatch(clearCart());
        toast.success(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    clsx(
      "cursor-pointer transition font-medium",
      isActive
        ? "text-cyan-400 scale-105"
        : "text-foreground hover:text-cyan-400 hover:scale-105"
    );

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50",
        "backdrop-blur-md shadow-md transition-all duration-300",
        "bg-transparent dark:bg-black/30 bg-white/20"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground p-2 rounded-md hover:bg-foreground/10 hover:scale-110 transition"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <NavLink to={"/"}>
              <span className="font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight bg-gradient-to-r from-blue-400 via-cyan-500 to-sky-600 dark:from-blue-300 dark:via-purple-400 dark:to-fuchsia-500 bg-clip-text text-transparent select-none">
                Digital Dinner
              </span>
            </NavLink>
          </div>

          <nav className="hidden md:flex space-x-6 text-foreground font-medium">
            <NavLink to="/" className={linkClasses}>
              Menu
            </NavLink>
            <NavLink to="/cart" className={linkClasses}>
              Cart
            </NavLink>
          </nav>

          <div className="flex items-center space-x-2">
            {loggedInUser ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-foreground border-foreground/20 bg-transparent hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors duration-200 px-4 py-2"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {loading ? <Loader2 className="animate-spin" /> : "Logout"}
              </Button>
            ) : (
              <>
                <NavLink to="/login">
                  <Button
                    variant="outline"
                    className="text-foreground border-foreground/20 bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200 px-4 py-2"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/signup">
                  <Button
                    variant="default"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors duration-200 hidden sm:inline-flex px-4 py-2"
                  >
                    Sign Up
                  </Button>
                </NavLink>
              </>
            )}

            <ThemeToggle />

            <NavLink to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-accent hover:text-accent-foreground md:hidden p-2 rounded-md transition-colors duration-200 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems?.length}
                </span>
              </Button>
            </NavLink>
          </div>
        </div>

        <div
          className={clsx(
            "md:hidden mt-2 backdrop-blur-md rounded-xl shadow-md border border-white/10 px-4 py-4 space-y-3 transition-all duration-300 ease-in-out",
            "bg-white/10 dark:bg-black/30 flex flex-col",
            mobileMenuOpen ? "block" : "hidden"
          )}
        >
          <NavLink
            to="/"
            className={linkClasses}
            onClick={() => setMobileMenuOpen(false)}
          >
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={linkClasses}
            onClick={() => setMobileMenuOpen(false)}
          >
            Cart
          </NavLink>
          {!loggedInUser && (
            <>
              <NavLink
                to="/login"
                className={linkClasses}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={linkClasses}
                onClick={() => setMobileMenuOpen(false)}
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
