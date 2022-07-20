import React, { useEffect, useRef, useState, Dispatch, SetStateAction, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  Type,
  all,
  food,
  drink,
  discount,
  search,
} from "../src/features/data/dataReducer";
import {
  closeModal,
  openModal,
  TypeCart,
  removeItem,
  preparedAddItem,
  selectorCountCartItem,
} from "../src/features/cart/cartReducer";
import { TypeDispatch } from "../src/store";

export default function Home() {
  return (
    <div className="relative grid w-screen h-screen overflow-hidden text-white bg-gray-700 md:grid-cols-3">
      <Head>
        <title>Welcome</title>
      </Head>

      {/* Sebelah Kiri */}
      <div className="p-6 overflow-auto md:col-span-2">
        <Search />
        <Category />
        <Cards />
      </div>

      {/* Sebelah Kanan */}
      <Cart />

      <CartButton />
    </div>
  );
}

function formatRupiah(angka: number, prefix: string) {
  let angka2 = angka.toString();
  var number_string = angka2.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}

function Search() {
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  /* 
    Handler
  */
  const handler = () => {
    if (!ref.current) return;
    const value = ref.current.value;

    dispatch(value.length === 0 ? all() : search({ name: value }));
  };

  return (
    <div className="flex w-full h-12 rounded">
      <input
        placeholder="Find what you want"
        type="text"
        className="w-full h-full p-2 bg-slate-800 focus:ring-0 focus:border-0 focus:outline-0"
        ref={ref}
      />
      <button onClick={handler} className="h-full p-2 bg-slate-900">
        🔍
      </button>
    </div>
  );
}

function Category() {
  const dispatch = useDispatch();
  const data = useSelector<{ data: Type }, Type["filter"]>(
    (data) => data.data.filter
  );
  return (
    <div className="grid w-full grid-flow-col gap-3 mt-3 overflow-auto h-14 md:mt-5 auto-cols-fr">
      <button
        onClick={() => dispatch(all())}
        className={
          `p-1 bg-transparent underline-offset-4 hover:underline` +
          (data === "ALL" ? ` font-bold underline` : ``)
        }
      >
        All
      </button>
      <button
        onClick={() => dispatch(food())}
        className={
          `p-1 bg-transparent underline-offset-4 hover:underline` +
          (data === "FOOD" ? ` font-bold underline` : ``)
        }
      >
        Food
      </button>
      <button
        onClick={() => dispatch(drink())}
        className={
          `p-1 bg-transparent underline-offset-4 hover:underline` +
          (data === "DRINK" ? ` font-bold underline` : ``)
        }
      >
        Drink
      </button>
      <button
        onClick={() => dispatch(discount())}
        className={
          `p-1 bg-transparent underline-offset-4 hover:underline` +
          (data === "DISCOUNT" ? ` font-bold underline` : ``)
        }
      >
        Discount
      </button>
    </div>
  );
}

function Cards() {
  const dispatch = useDispatch<TypeDispatch>();
  const data = useSelector<{ data: Type }, Type["result"]>(
    (data) => data.data.result
  );
  return (
    <div className="grid w-full gap-5 mt-5 mb-16 md:mt-10 grid-col-1 justify-items-center md:grid-cols-2 ">
      {data.map((tunggal) => {
        return (
          <div
            key={tunggal["id"]}
            className="grid w-full h-full grid-rows-2 overflow-hidden rounded-md shadow cursor-pointer bg-slate-800 shadow-slate-900"
            title={tunggal["name"]}
            onClick={() => dispatch(preparedAddItem(tunggal))}
          >
            <div className="relative w-full h-full bg-slate-900 ">
              <Image
                src={`/${tunggal["image"]}`}
                layout="fill"
                objectFit="contain"
                alt="makanan"
              />
            </div>
            <div className="p-3 ">
              <p className="text-xl font-semibold">{tunggal["name"]}</p>
              <p className="my-2 text-sm">{tunggal["description"]}</p>
              <div className="flex flex-col justify-center mt-5">
                <div className="flex items-center">
                  <p
                    className={
                      `mr-2 font-bold text-md` +
                      (tunggal["discount"] !== 0 ? " text-red-700" : "")
                    }
                  >
                    {formatRupiah(
                      tunggal["discount"] !== 0
                        ? (tunggal["price"] * tunggal["discount"]) / 100
                        : tunggal["price"],
                      "Rp."
                    )}
                  </p>
                  {tunggal["discount"] !== 0 && (
                    <p className="text-xs line-through">
                      {formatRupiah(tunggal["price"], "Rp")}
                    </p>
                  )}
                </div>
                {tunggal["discount"] !== 0 && (
                  <p className="text-sm font-bold">{`Anda Hemat ${tunggal["discount"]}%`}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Cart() {
  const dispatch = useDispatch();
  const data = useSelector<{ cart: TypeCart }, TypeCart>((data) => data.cart);

  const [dataTotal, setDataTotal] = useState<
    { jumlah: number; data: TypeCart["data"][number] }[]
  >([]);

  useEffect(() => {
    if (data.data.length > dataTotal.length) {
      const newDataTotal = [...dataTotal];
      newDataTotal.push({
        jumlah: 0,
        data: data.data[data.data.length - 1],
      });

      setDataTotal(newDataTotal);
    } else if (data.data.length < dataTotal.length) {
      setDataTotal(
        data.data.map((tunggal) => ({
          data: tunggal,
          jumlah:
            dataTotal.find(
              (dataTotalSingular) => dataTotalSingular.data.id === tunggal["id"]
            )?.jumlah || 0,
        }))
      );
    }
  }, [data.data, dataTotal, setDataTotal]);

  const total = useMemo(() => {
    return dataTotal.reduce((prev, data) => {
      const newPrev = {...prev};
      newPrev.harga = prev.harga + (data.data.price * data.jumlah);
      newPrev.discount = prev.discount + ((data.data.discount !== 0 ? ((data.data.price * data.data.discount) / 100) : 0) * data.jumlah);
      return newPrev;
    }, {harga: 0, discount: 0} as {harga: number, discount: number})
  }, [dataTotal])

  return (
    <div
      className={`absolute duration-500 z-50 flex flex-col w-full h-full overflow-hidden transition-all bg-slate-900 md:z-auto md:top-0 md:relative ${
        data.modal ? "top-0" : "top-[-1000px]"
      }`}
    >
      <div className="flex items-center justify-between h-16 p-3 p-5 text-center">
        <p className="text-3xl ">Cart</p>
        <button onClick={() => dispatch(closeModal())}>Close</button>
      </div>

      <div className="flex flex-col w-full h-full p-5 overflow-auto">
        {dataTotal.map((tunggal) => {
          return (
            <CartItem
              setState={setDataTotal}
              jumlah={tunggal["jumlah"]}
              data={tunggal["data"]}
              key={tunggal["data"]["id"]}
            />
          );
        })}
      </div>

      <div className="grid items-center self-end w-full h-32 grid-cols-2 p-5 justify-items-center bg-slate-800">
        <p>Sub Total</p>
        <p>{formatRupiah(total.harga, 'Rp.')}</p>
        <p>Discount</p>
        <p>{formatRupiah(total.discount, 'Rp.')}</p>
        <p>Total</p>
        <p>{formatRupiah(total.harga - total.discount, 'Rp.')}</p>
      </div>
    </div>
  );
}

function CartButton() {
  const dispatch = useDispatch();
  const count = useSelector(selectorCountCartItem);
  return (
    <button
      onClick={() => dispatch(openModal())}
      className="absolute h-12 p-3 border-2 border-slate-600 bottom-5 rounded-xl left-5 bg-slate-900 md:hidden"
    >
      🛒 Cart ({count})
    </button>
  );
}

// function CartItems() {
//   const data = useSelector<{ cart: TypeCart }, TypeCart["data"]>(
//     (data) => data.cart.data
//   );
//   return (
//     <div className="flex flex-col w-full h-full p-5 overflow-auto">
//       {data.map((tunggal) => {
//         return <CartItem data={tunggal} key={tunggal["id"]} />;
//       })}
//     </div>
//   );
// }

// function CartItem({
//   data,
//   jumlah,
//   setState,
// }: {
//   data: TypeCart["data"][number];
//   jumlah: number;
//   setState: Dispatch<
//     SetStateAction<{ data: TypeCart["data"][number]; jumlah: number }[]>
//   >;
// }) {
//   const dispatch = useDispatch();

//   const handler = () => {
//     // setState(state => {
//     //   const newState = [...state];
//     //   const match = newState.findIndex(newStateTunggal => newStateTunggal.data.id === data['id']);

//     //   // Jika tidak ketemu
//     //   console.log(match, newState[match]['jumlah'])
//     //   if (match === -1) return state;
//     //   newState[match]['jumlah'] = newState[match]['jumlah'] + 1;
//     //   return newState
//     // })
//     console.log("Hello")
//   };

//   return (
//     <div className="flex flex-col w-full my-5">
//       <hr></hr>
//       <br />
//       <p className="text-xl">{data["name"]}</p>
//       <p>
//         <span className="font-bold text-md">
//           {" "}
//           {formatRupiah(
//             data["discount"] !== 0
//               ? (data["price"] * data["discount"]) / 100
//               : data["price"],
//             "Rp."
//           )}
//         </span>{" "}
//         {data["discount"] !== 0 && (
//           <span className="text-xs text-red-700 line-through">
//             {formatRupiah(data["price"], "Rp")}
//           </span>
//         )}
//       </p>
//       <div className="flex items-center justify-between w-full mt-3">
//         <div>
//           <button onClick={handler} className="w-10 mr-2 rounded bg-slate-800 lg:p-2">+</button>
//           <button className="w-10 rounded bg-slate-800 lg:p-2">-</button>
//         </div>
//         <p>Qty {jumlah}</p>
//       </div>
//       <div className="flex items-center w-full mt-3">
//         <button
//           onClick={() => dispatch(removeItem({ id: data["id"] }))}
//           className="w-full p-1 rounded bg-slate-800 lg:p-2"
//         >
//           Remove
//         </button>
//       </div>
//     </div>
//   );
// }

const CartItem = React.memo(function CartItem({
  data,
  jumlah,
  setState,
}: {
  data: TypeCart["data"][number];
  jumlah: number;
  setState: Dispatch<
    SetStateAction<{ data: TypeCart["data"][number]; jumlah: number }[]>
  >;
}) {
  const dispatch = useDispatch();

  const handler = (tambah: boolean) => {
    setState(state => {
      const newState = [...state];
      const match = newState.findIndex(newStateTunggal => newStateTunggal.data.id === data['id']);
      if (match === -1) return state;
      newState[match]['jumlah'] = tambah ? (jumlah + 1) : ((jumlah - 1) < 1 ? 1 : jumlah - 1);
      return newState
    })
  };

  return (
    <div className="flex flex-col w-full my-5">
      <hr></hr>
      <br />
      <p className="text-xl">{data["name"]}</p>
      <p>
        <span className="font-bold text-md">
          {" "}
          {formatRupiah(
            data["discount"] !== 0
              ? (data["price"] * data["discount"]) / 100
              : data["price"],
            "Rp."
          )}
        </span>{" "}
        {data["discount"] !== 0 && (
          <span className="text-xs text-red-700 line-through">
            {formatRupiah(data["price"], "Rp")}
          </span>
        )}
      </p>
      <div className="flex items-center justify-between w-full mt-3">
        <div>
          <button onClick={() => handler(true)} className="w-10 mr-2 rounded bg-slate-800 lg:p-2">+</button>
          <button onClick={() => handler(false)} className="w-10 rounded bg-slate-800 lg:p-2">-</button>
        </div>
        <p>Qty {jumlah}</p>
      </div>
      <div className="flex items-center w-full mt-3">
        <button
          onClick={() => dispatch(removeItem({ id: data["id"] }))}
          className="w-full p-1 rounded bg-slate-800 lg:p-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
})