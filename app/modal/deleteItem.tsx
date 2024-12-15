export default function DeleteItemModal({ isOpen, onClose, onDelete, itemName }: {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    itemName: string;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96">
                {/* Header */}
                <h2 className="text-xl font-semibold mb-4">Hapus Item</h2>

                {/* Body */}
                <p className="text-gray-700 mb-6">
                    Apakah Anda yakin ingin menghapus <span className="font-bold">{itemName}</span> dari daftar?
                </p>

                {/* Actions */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
