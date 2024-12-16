/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import axios from "axios";
import { useState, useEffect } from "react";
import { IStock } from "../stock/page";

export interface ICart {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
}

export default function AddItemPembelian({ isOpen, onClose, cart, setCart }: {
  isOpen: boolean;
  onClose: () => void;
  cart: IStock[];
  setCart: React.Dispatch<React.SetStateAction<IStock[]>>; // Pastikan tipe ini
}) {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [itemSearch, setItemSearch] = useState<ICart[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setSearch('');
    }
  }, [isOpen])

  // Debounce state
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Debouncing effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Fetch data based on debounced search
  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setItemSearch([]); // Clear cart when search is empty
      return;
    }

    const fetchStock = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/search-stock?search=${debouncedSearch}`);
        if (res.status === 200) {
          setItemSearch(res.data.stocks);
        }
      } catch (error) {
        console.error("Error searching stocks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  if (!isOpen) return null;

  console.log(cart, 'cart')

  const handleRowClick = (item: IStock) => {
    const modifiedItem: IStock = { ...item, quantity: 1 }; // Set default quantity to 1
    setCart((prevCart: IStock[]) => {
      // Cek jika item sudah ada di cart
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem._id === item._id);
      if (existingItemIndex >= 0) {
        // Jika item sudah ada, update quantity jika diperlukan atau abaikan
        return prevCart;
      }
      // Jika item belum ada, tambahkan ke cart
      return [...prevCart, modifiedItem];
    });
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-7/12">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tambah item pembelian</h2>
          <button
            onClick={() => {
              setLoading(false);
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="flex gap-4 items-center justify-center">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Contoh: Gula"
              disabled={loading}
            />
          </div>
          {
            search &&
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left w-4/12">Nama Barang</th>
                  <th className="border border-gray-300 px-4 py-2 text-center w-2/12">
                    Harga
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center w-1/12">Stock</th>
                  {/* <th className="border border-gray-300 px-4 py-2 text-center w-2/12">Jumlah</th> */}
                </tr>
              </thead>
              <tbody>
                {itemSearch?.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="border border-gray-300 px-4 py-10 text-center font-semibold text-xl text-gray-300"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
                {itemSearch?.map((item: ICart, index: number) => (
                  <tr
                    onClick={() => handleRowClick(item)} // Tambahkan handler di sini
                    key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2"> {item.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      Rp {item.price.toLocaleString()} / {item.unit}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center"> {item.quantity}</td>
                    {/* <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      type="number"
                      className="w-16 text-center border rounded-md"
                      value={item.quantity}
                      min={1}
                      max={item.quantity} // Optional: Limit to available stock
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          Number(e.target.value)
                        )
                      }
                    />
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
