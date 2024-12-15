export default function Pagination({ totalPages, currentPage, onPageChange }: {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}) {
    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    return (
        <div className="flex justify-center items-center space-x-2 p-4">
            {/* Previous Button */}
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1
                        ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                        : "text-blue-500 bg-white hover:bg-blue-100"
                    }`}
            >
                Previous
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`px-3 py-1 border rounded ${currentPage === page
                                ? "text-white bg-blue-500"
                                : "text-blue-500 bg-white hover:bg-blue-100"
                            }`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${currentPage === totalPages
                        ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                        : "text-blue-500 bg-white hover:bg-blue-100"
                    }`}
            >
                Next
            </button>
        </div>
    );
}
