import Head from "next/head";
import Image from "next/image";

const data = [
  {
    name: "Nasi Goreng",
    description:
      "Nasi Goreng Kambing Kebon Sirih telah melegenda karena berdiri sejak tahun 1958. Seiring berjalan waktu, nasi goreng kambing ini terkenal dan menjadi tujuan kuliner di daerah Kebon Sirih saat malam hari. Menggunakan berbagai bumbu serta potongan daging kambing sehingga menciptakan aroma rempah sangat terasa. Tambahkan emping serta acar agar terasa segar. Langsung pesan melalui GO-FOOD Jakarta!",
    category: "Food",
    discount: 0,
    price: 20000,
    image: "nasiGoreng.jpg",
  },
  {
    name: "Gurame & Nasi Timbel Putri Ayu - Petojo Selatan",
    description: "Gurame & Nasi Timbel Dijamin Enaknya",
    category: "Food",
    discount: 50,
    price: 100000,
    image: "ikanBakar.jpg",
  },
  {
    name: "Jolly Joy",
    description:
      "Jolly Joy ini menarik banget ya kemasannya. Di kemas dalam botol kaca dan menarik untuk di foto di social media Go-Foodies. Ada green tea caramel, chocolate hazelnut, vanila crunchy dan masih banyak lagi. Penasaran langsung aja pesan, khusus untuk area GO-FOOD Makassar ya.",
    category: "Drink",
    discount: 0,
    price: 25000,
    image: "jolly.png",
  },
];

export default function Home() {
  return (
    <div className="relative grid w-screen h-screen overflow-hidden text-white bg-gray-700 md:grid-cols-3">
      <Head>
        <title>Welcome</title>
      </Head>

      {/* Sebelah Kiri */}
      <div className="grid p-6 overflow-auto justify-items-center md:col-span-2 ">
        <div className="flex w-full rounded">
          <input
            placeholder="Find what you want"
            type="text"
            className="w-full p-2 bg-slate-800 focus:ring-0 focus:border-0 focus:outline-0"
            name=""
            id=""
          />
          <button className="p-2 bg-slate-900">🔍</button>
        </div>

        <div className="grid w-full h-10 grid-flow-col gap-3 mt-3 overflow-auto md:mt-5 auto-cols-fr">
          <button className="p-1 font-bold underline bg-transparent underline-offset-4 hover:underline">
            All
          </button>
          <button className="p-1 bg-transparent underline-offset-4 hover:underline ">
            Food
          </button>
          <button className="p-1 bg-transparent underline-offset-4 hover:underline ">
            Drink
          </button>
          <button className="p-1 bg-transparent underline-offset-4 hover:underline ">
            Discount
          </button>
        </div>

        <div className="grid w-full gap-5 mt-5 md:mt-10 grid-col-1 justify-items-center md:grid-cols-2 ">
          {data.map((tunggal, index) => {
            return (
              <div
                key={index}
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
      </div>

      {/* Sebelah Kanan */}
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

      <button className="p-3 bg-slate-900 md:hidden">Cart 🛒</button>
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
