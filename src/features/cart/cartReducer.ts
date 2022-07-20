import { createSlice } from "@reduxjs/toolkit";
import { Type } from "../data/dataReducer";

const initialState: Type["result"] = [];

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeAll () {
        return initialState
    },
    removeItem (state, payload: {payload : {id: string}}) {
        state = state.filter(data => data.id !== payload.payload.id)
    },
    addItem (state, payload: {payload: typeof initialState[number]}) {
        state.push(payload.payload);
    }
  },
});

export const { removeAll, removeItem, addItem } = cartReducer.actions;

export default cartReducer.reducer;
