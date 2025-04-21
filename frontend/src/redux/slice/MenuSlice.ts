import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItemType } from '@/types/type';

interface MenuState {
  menuItems: MenuItemType[];
}

const initialState: MenuState = {
  menuItems: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItemType[]>) => {
      state.menuItems = action.payload;
    },
    addNewItem: (state, action: PayloadAction<MenuItemType>) => {
      state.menuItems.push(action.payload);
    },
  },
});

export const { setMenuItems, addNewItem } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
