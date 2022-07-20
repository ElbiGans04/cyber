import { createSlice } from "@reduxjs/toolkit";
import { Type } from "../data/dataReducer";

export interface TypeCart {
  modal: boolean;
  data: Type["result"];
}

const initialState: TypeCart = {
  modal: false,
  data: [],
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openModal(state) {
      state.modal = true;
    },
    closeModal(state) {
      state.modal = false;
    },
    removeAll(state) {
      state.data = [];
    },
    removeItem(state, payload: { payload: { id: string } }) {
      state.data = state.data.filter((data) => data.id !== payload.payload.id);
    },
    addItem(state, payload: { payload: typeof initialState["data"][number] }) {
      state.data.push(payload.payload);
    },
  },
});

export const { removeAll, removeItem, addItem, openModal, closeModal } =
  cartReducer.actions;

export default cartReducer.reducer;
