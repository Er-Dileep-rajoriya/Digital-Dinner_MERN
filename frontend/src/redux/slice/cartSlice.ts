import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType } from '@/types/type';

// Define the shape of the cart state
interface CartState {
    cartItems: CartItemType[];
}

// Initial state
const initialState: CartState = {
    cartItems: [],
};

// Create the cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Set entire cart items array
        setCartItems(state, action: PayloadAction<CartItemType[]>) {
            state.cartItems = action.payload;
        },

        // Add item to cart or update quantity if it already exists
        addToCart(state, action: PayloadAction<CartItemType>) {
            const existingIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );

            if (existingIndex !== -1) {
                // Item exists, update quantity
                state.cartItems[existingIndex].quantity += action.payload.quantity;
            } else {
                // New item, add to cart
                state.cartItems.push(action.payload);
            }

            // Debug log (optional)
            console.log('Cart Items:', state.cartItems);
        },

        // Remove item from cart by ID
        removeFromCart(state, action: PayloadAction<string>) {
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload
            );
        },

        // Update item quantity
        updateCartItemQuantity(
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) {
            const item = state.cartItems.find(
                (item) => item._id === action.payload.id
            );

            if (item) {
                item.quantity = action.payload.quantity;
            }
        },

        // Clear all items from cart
        clearCart(state) {
            state.cartItems = [];
        },
    },
});

// Export actions
export const {
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
} = cartSlice.actions;

// Export reducer
export const cartReducer = cartSlice.reducer;
