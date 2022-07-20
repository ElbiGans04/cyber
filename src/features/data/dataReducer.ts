import { createSlice } from '@reduxjs/toolkit'

export interface Type {
  filter: 'ALL' | 'FOOD' | 'DRINK' | 'DISCOUNT',
  result: {
      id: string,
      name: string,
      description: string,
      category: "FOOD" | "DRINK",
      discount: number,
      price: number,
      image: string,
  }[]
}

const initialState: Type = {
    filter: 'ALL',
    result: [
        {
          id: 'P1',
          name: "Nasi Goreng",
          description:
            "Nasi Goreng Kambing Kebon Sirih telah melegenda karena berdiri sejak tahun 1958. Seiring berjalan waktu, nasi goreng kambing ini terkenal dan menjadi tujuan kuliner di daerah Kebon Sirih saat malam hari. Menggunakan berbagai bumbu serta potongan daging kambing sehingga menciptakan aroma rempah sangat terasa. Tambahkan emping serta acar agar terasa segar. Langsung pesan melalui GO-FOOD Jakarta!",
          category: "FOOD",
          discount: 0,
          price: 20000,
          image: "nasiGoreng.jpg",
        },
        {
          id: 'P2',
          name: "Gurame & Nasi Timbel Putri Ayu - Petojo Selatan",
          description: "Gurame & Nasi Timbel Dijamin Enaknya",
          category: "FOOD",
          discount: 50,
          price: 100000,
          image: "ikanBakar.jpg",
        },
        {
          id: 'P3',
          name: "Jolly Joy",
          description:
            "Jolly Joy ini menarik banget ya kemasannya. Di kemas dalam botol kaca dan menarik untuk di foto di social media Go-Foodies. Ada green tea caramel, chocolate hazelnut, vanila crunchy dan masih banyak lagi. Penasaran langsung aja pesan, khusus untuk area GO-FOOD Makassar ya.",
          category: "DRINK",
          discount: 0,
          price: 25000,
          image: "jolly.png",
        },
      ]
};


const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    all() {
      return initialState
    },
    food(state) {
      state.filter = "FOOD"
      state.result = initialState.result.filter(data => data.category === "FOOD");
    },
    drink(state) {
      state.filter = "DRINK"
      state.result = initialState.result.filter(data => data.category === "DRINK");
    },
    discount (state) {
        state.filter = "DISCOUNT"
        state.result = initialState.result.filter(data => data.discount !== 0);
    },
    search (state, payload: {payload: {name: string}, type: string}) {
        state.result = state.result.filter(data => data.name.indexOf(payload.payload.name) !== -1);
    }
  }
})

export const { all, food, drink, discount, search } = dataSlice.actions

export default dataSlice.reducer