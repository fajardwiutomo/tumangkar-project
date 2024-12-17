'use client'

import { ShoppingCartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface ICart {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
}

export default function FinalPembayaran({ isOpen, onClose, totalAmount, handleCheckout, isCheckoutLoading }: {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  handleCheckout: () => void;
  isCheckoutLoading: boolean;
}) {
  const [amountPaid, setAmountPaid] = useState<number>(0); // State for storing amount paid as string
  const [change, setChange] = useState<number>(0); // State for storing change

  // Calculate change whenever amountPaid changes
  useEffect(() => {
    if (amountPaid >= totalAmount) {
      setChange(amountPaid - totalAmount);
    } else {
      setChange(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountPaid]);

  useEffect(() => {
    setAmountPaid(0);
  },[])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-4/12">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Total yang harus dibayar</h2>
          <button
            onClick={() => {
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Body
        <div className="mb-4 text-2xl text-red-500">Rp {totalAmount.toLocaleString()}</div> */}

        {/* Form */}
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jumlah Uang Customer
            </label>
            <input
              type="text"
              value={amountPaid} // Format number with "Rp"
              onChange={(e) => setAmountPaid(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Contoh: 12000"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className='flex justify-between'>
            <div>
              Jumlah pembayaran
            </div>
            <div className='font-semibold text-lg'>{`Rp ${Number(amountPaid).toLocaleString()}`} </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className='flex justify-between'>
            <div>
              Total yang harus dibayar
            </div>
            <div className='font-semibold text-lg'>{`Rp ${totalAmount.toLocaleString()}`} </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className='flex justify-between'>
            <div>
              Kembalian
            </div>
            <div className='font-semibold text-red-500 text-lg'>{amountPaid > totalAmount ? `Rp ${Number(change).toLocaleString()}` : 0} </div>
          </div>
        </div>


        <div className="flex justify-between mt-6 w-full">
          <button
            onClick={() => {
              setAmountPaid(0);
              onClose()}}
            className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200 h-10"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              handleCheckout();
              onClose();
            }}
            className="flex justify-center items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg mb-4 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={isCheckoutLoading || amountPaid < totalAmount}
          >
            {isCheckoutLoading ? 'Processing...' : (
              <>
                <ShoppingCartIcon className="h-5 w-5" /> Bayar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
