import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItemType } from '@/types/type';

interface RootStateType {
    cartItems: object,
}

const initialState: RootStateType = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action: PayloadAction<object[]>) => {
            state.cartItems = action.payload;
        },
        addToCart: (state, action: PayloadAction<object>) => {

            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );

            if (itemIndex > -1) {
                // If item already exists, increase quantity
                state.cartItems[itemIndex].quantity += action.payload.quantity;
            } else {
                // If item doesn't exist, add to cart
                state.cartItems.push(action.payload);
            }

            console.log("ACTION : ", state.cartItems)
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload
            );
        },
        updateCartItemQuantity: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) => {
            const item = state.cartItems.find(
                (cartItem) => cartItem._id === action.payload.id
            );
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const {
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
