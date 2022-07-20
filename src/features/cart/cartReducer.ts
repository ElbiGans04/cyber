import { createSlice, createSelector  } from "@reduxjs/toolkit";
import { Type } from "../data/dataReducer";
import {TypeDispatch, TypeGetState} from '../../store'
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


export function preparedAddItem (data: Type['result'][number]) {
  return async function (dispatch: TypeDispatch, getState:TypeGetState) {
    const state = getState();
    const result = state.cart.data.findIndex(source => source.id === data.id);

    if (result === -1) dispatch(addItem(data))
  }
}

const selectorr = (state: ReturnType<TypeGetState>) => state.cart.data
export const selectorCountCartItem = createSelector(
  selectorr,
  data => data.length
)