// tugas-es6.mjs
// Latihan ES6: filter(), map(), reduce(), destructuring, dan arrow function

// 1. Data transaksi belanja (array of objects)
const transaksi = [
  { id: 1, barang: "Beras 5kg",      harga: 68000, qty: 2,  kategori: "Makanan" },
  { id: 2, barang: "Minyak Goreng",  harga: 32000, qty: 3,  kategori: "Makanan" },
  { id: 3, barang: "Sabun Mandi",    harga: 4500,  qty: 6,  kategori: "Kebersihan" },
  { id: 4, barang: "Buku Tulis",     harga: 5000,  qty: 10, kategori: "Alat Tulis" },
  { id: 5, barang: "Pulpen",         harga: 3000,  qty: 12, kategori: "Alat Tulis" },
  { id: 6, barang: "Deterjen",       harga: 21000, qty: 2,  kategori: "Kebersihan" },
  { id: 7, barang: "Telur 1kg",      harga: 28000, qty: 2,  kategori: "Makanan" },
];

// 2. Fungsi format rupiah
const formatRupiah = (angka) => `Rp${angka.toLocaleString("id-ID")}`;

// 3. filter(): saring transaksi berdasarkan kategori
const filterKategori = (data, namaKategori) =>
  data.filter(({ kategori }) => kategori === namaKategori);

// 4. map(): hitung subtotal tiap barang (harga x qty)
const hitungSubtotal = (data) =>
  data.map(({ harga, qty, ...sisa }) => ({
    ...sisa,
    harga,
    qty,
    subtotal: harga * qty,
  }));

// 5. reduce(): jumlahkan seluruh subtotal
const hitungTotal = (data) =>
  data.reduce((total, { subtotal }) => total + subtotal, 0);

// 6. Fungsi untuk menampilkan hasil
const cetakTabel = (judul, data) => {
  console.log(`\n=== ${judul} ===`);
  data.forEach(({ id, barang, harga, qty, subtotal }) =>
    console.log(
      `#${id} | ${barang.padEnd(14)} | ${formatRupiah(harga).padStart(10)} x ${String(qty).padStart(2)} = ${formatRupiah(subtotal)}`
    )
  );
  console.log(`TOTAL: ${formatRupiah(hitungTotal(data))}`);
};

// ---------- Eksekusi ----------

// a. Semua transaksi + subtotal
const semuaDenganSubtotal = hitungSubtotal(transaksi);
cetakTabel("Semua Transaksi", semuaDenganSubtotal);

// b. Hanya kategori tertentu (filter -> map -> reduce)
const kategoriDipilih = "Makanan";
const transaksiKategori = hitungSubtotal(filterKategori(transaksi, kategoriDipilih));
cetakTabel(`Kategori: ${kategoriDipilih}`, transaksiKategori);

// c. Total per kategori (destructuring + reduce ke object)
const totalPerKategori = semuaDenganSubtotal.reduce(
  (hasil, { kategori, subtotal }) => ({
    ...hasil,
    [kategori]: (hasil[kategori] ?? 0) + subtotal,
  }),
  {}
);

console.log("\n=== Total per Kategori ===");
Object.entries(totalPerKategori).forEach(([kategori, total]) =>
  console.log(`${kategori.padEnd(12)}: ${formatRupiah(total)}`)
);