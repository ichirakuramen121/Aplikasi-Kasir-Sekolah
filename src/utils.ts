/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Formats a number into Indonesian Rupiah format.
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Converts a number of any scale into Indonesian spelled-out text (Terbilang).
 * E.g., 350000 -> "Tiga Ratus Lima Puluh Ribu Rupiah"
 */
export function terbilang(nominal: number): string {
  const words = [
    "", "Satu", "Dua", "Tiga", "Empat", "Lima", 
    "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"
  ];

  function convert(n: number): string {
    if (n < 12) {
      return words[n];
    } else if (n < 20) {
      return convert(n - 10) + " Belas";
    } else if (n < 100) {
      const tens = Math.floor(n / 10);
      const units = n % 10;
      return convert(tens) + " Puluh " + convert(units);
    } else if (n < 200) {
      return "Seratus " + convert(n - 100);
    } else if (n < 1000) {
      const hundreds = Math.floor(n / 100);
      const remainder = n % 100;
      return convert(hundreds) + " Ratus " + convert(remainder);
    } else if (n < 2000) {
      return "Seribu " + convert(n - 1000);
    } else if (n < 1000000) {
      const thousands = Math.floor(n / 1000);
      const remainder = n % 1000;
      return convert(thousands) + " Ribu " + convert(remainder);
    } else if (n < 1000000000) {
      const millions = Math.floor(n / 1000000);
      const remainder = n % 1000000;
      return convert(millions) + " Juta " + convert(remainder);
    } else if (n < 1000000000000) {
      const billions = Math.floor(n / 1000000000);
      const remainder = n % 1000000000;
      return convert(billions) + " Milyar " + convert(remainder);
    }
    return "Angka Terlalu Besar";
  }

  if (nominal === 0) return "Nol Rupiah";
  const processed = convert(Math.abs(nominal)).trim();
  // Safe cleanup for extra spaces
  return processed.replace(/\s+/g, " ") + " Rupiah";
}

/**
 * Generates a unique transaction billing number.
 */
export function generateKuitansiNumber(prefix: string = "KWT"): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}${month}${day}-${random}`;
}

/**
 * Translates a month key (YYYY-MM) to indonesian month format (e.g. "Mei 2026")
 */
export function formatBulanIndo(monthKey: string): string {
  if (monthKey.includes(",")) {
    return monthKey
      .split(",")
      .map((key) => formatBulanIndo(key.trim()))
      .join(", ");
  }
  const parts = monthKey.split("-");
  if (parts.length !== 2) return monthKey;
  
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const monthIdx = parseInt(parts[1], 10) - 1;
  if (monthIdx < 0 || monthIdx > 11) return monthKey;
  
  return `${monthNames[monthIdx]} ${parts[0]}`;
}

/**
 * List of months in school year / calendar year
 */
export const DAFTAR_BULAN = [
  { key: "2025-07", label: "Juli 2025" },
  { key: "2025-08", label: "Agustus 2025" },
  { key: "2025-09", label: "September 2025" },
  { key: "2025-10", label: "Oktober 2025" },
  { key: "2025-11", label: "November 2025" },
  { key: "2025-12", label: "Desember 2025" },
  { key: "2026-01", label: "Januari 2026" },
  { key: "2026-02", label: "Februari 2026" },
  { key: "2026-03", label: "Maret 2026" },
  { key: "2026-04", label: "April 2026" },
  { key: "2026-05", label: "Mei 2026" },
  { key: "2026-06", label: "Juni 2026" }
];

export const NAMA_BULAN = [
  { key: "01", label: "Januari" },
  { key: "02", label: "Februari" },
  { key: "03", label: "Maret" },
  { key: "04", label: "April" },
  { key: "05", label: "Mei" },
  { key: "06", label: "Juni" },
  { key: "07", label: "Juli" },
  { key: "08", label: "Agustus" },
  { key: "09", label: "September" },
  { key: "10", label: "Oktober" },
  { key: "11", label: "November" },
  { key: "12", label: "Desember" }
];

export const DAFTAR_TAHUN = ["2023", "2024", "2025", "2026", "2027", "2028"];
