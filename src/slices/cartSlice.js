import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items,action.payload];
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id===action.payload.id
      )
      let newCart = [...state.items];
      if(index>=0)
      {
        // Item exist karta hai
        newCart.splice(index,1) // splice ki help hum us item ko remove kr denge
      }
      else
      {
        // Item nhi hai toh msg bhejenge
        console.warn(`Can't remove product (id:${action.payload.id}) as it is not present in the Cart`);
      }

      state.items=newCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.cart.items;
// Idhr humne apna khuka export const selector bnaya jisme humne reduce 
//method ka use kiya jisse total price count kiya
export const selectTotal = (state) =>
  state.cart.items.reduce((total,item)=>total+item.price,0);

export default cartSlice.reducer;
