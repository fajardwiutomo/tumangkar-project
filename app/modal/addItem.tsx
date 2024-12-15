import { useState } from "react";

export default function AddItemModal({ isOpen, onClose, onAdd }: {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onAdd: (item: any) => void;
}) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const handleAddItem = () => {
    if (!itemName || !quantity || !unit) {
      alert("Semua field harus diisi!");
      return;
    }

    const newItem = {
      name: itemName,
      qty: quantity,
      unit: unit,
    };

    onAdd(newItem); // Callback untuk menambahkan barang
    onClose(); // Tutup modal
    setItemName("");
    setQuantity("");
    setUnit("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tambah Barang</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Barang
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Contoh: Gula"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Contoh: 10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Satuan
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Pilih Satuan</option>
              <option value="kg">Kg</option>
              <option value="pcs">Pcs</option>
              <option value="ltr">Liter</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            onClick={handleAddItem}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}
