import { useRef } from "react";
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

      <button className="absolute h-12 p-3 border-2 border-slate-600 bottom-5 rounded-xl left-5 bg-slate-900 md:hidden">Cart 🛒</button>
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
  return (
    <div className="absolute z-50 grid w-full h-full overflow-hidden transition bg-slate-900 md:z-auto md:top-0 md:relative top-[-1000px]">
      <div className="flex justify-between h-16 p-3 p-5 text-center">
        <p className="text-3xl ">Cart</p>
        <button>Close</button>
      </div>
      <div className="grid w-full h-full gap-5 p-5 overflow-auto">
        <div className="flex flex-col w-full">
          <hr></hr>
          <p className="text-xl">Ayam Geprek</p>
          <p className="font-bold text-md">Rp. 300.000</p>
          <div className="flex items-center justify-between w-full mt-3">
            <div>
              <button className="w-10 mr-2 rounded bg-slate-800 lg:p-2">
                +
              </button>
              <button className="w-10 rounded bg-slate-800 lg:p-2">-</button>
            </div>
            <p>Qty 0</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <hr></hr>
          <p className="text-xl">Ayam Geprek</p>
          <p className="font-bold text-md">Rp. 300.000</p>
          <div className="flex items-center justify-between w-full mt-3">
            <div>
              <button className="w-10 mr-2 rounded bg-slate-800 lg:p-2">
                +
              </button>
              <button className="w-10 rounded bg-slate-800 lg:p-2">-</button>
            </div>
            <p>Qty 0</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <hr></hr>
          <p className="text-xl">Ayam Geprek</p>
          <p className="font-bold text-md">Rp. 300.000</p>
          <div className="flex items-center justify-between w-full mt-3">
            <div>
              <button className="w-10 mr-2 rounded bg-slate-800 lg:p-2">
                +
              </button>
              <button className="w-10 rounded bg-slate-800 lg:p-2">-</button>
            </div>
            <p>Qty 0</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <hr></hr>
          <p className="text-xl">Ayam Geprek</p>
          <p className="font-bold text-md">Rp. 300.000</p>
          <div className="flex items-center justify-between w-full mt-3">
            <div>
              <button className="w-10 mr-2 rounded bg-slate-800 lg:p-2">
                +
              </button>
              <button className="w-10 rounded bg-slate-800 lg:p-2">-</button>
            </div>
            <p>Qty 0</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <hr></hr>
          <p className="text-xl">Ayam Geprek</p>
          <p className="font-bold text-md">Rp. 300.000</p>
          <div className="flex items-center justify-between w-full mt-3">
            <div>
              <button className="w-10 mr-2 rounded bg-slate-800 lg:p-2">
                +
              </button>
              <button className="w-10 rounded bg-slate-800 lg:p-2">-</button>
            </div>
            <p>Qty 0</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <hr></hr>
          <p className="text-xl">Ayam Geprek</p>
          <p className="font-bold text-md">Rp. 300.000</p>
          <div className="flex items-center justify-between w-full mt-3">
            <div>
              <button className="w-10 mr-2 rounded bg-slate-800 lg:p-2">
                +
              </button>
              <button className="w-10 rounded bg-slate-800 lg:p-2">-</button>
            </div>
            <p>Qty 0</p>
          </div>
        </div>
      </div>

      <div className="grid items-center self-end h-32 grid-cols-2 p-5 justify-items-center bg-slate-800">
        <p>Sub Total</p>
        <p>120.000</p>
        <p>Discount</p>
        <p>120.000</p>
        <p>Total</p>
        <p>120.000</p>
      </div>
    </div>
  );
}
