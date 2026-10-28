import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import { asyncLoadProduct } from "../store/actions/productActions";

const PaginationTemplate = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.productReducer.products.currentPage);
    const totalPages = useSelector((state) => state.productReducer.products.totalPages);

    const scrollAtTheTop = () => {
        window.scrollTo(0, 0);
    };

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage >= totalPages;

    const renderPages = Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
        <button
            key={page}
            onClick={() => {
                scrollAtTheTop();
                dispatch(asyncLoadProduct(page));
            }}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center ${
                currentPage === page
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
        >
            {page}
        </button>
    ));

    console.log("Pagination template rendering...");

    return (
        <nav
            aria-label="Product pagination"
            className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
        >
            {/* Previous Button */}
            <button
                disabled={isFirstPage}
                onClick={() => {
                    if (currentPage !== 1) {
                        scrollAtTheTop();
                        dispatch(asyncLoadProduct(currentPage - 1));
                    }
                }}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-4 h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isFirstPage
                        ? "opacity-40 cursor-not-allowed bg-zinc-100 text-zinc-400 border border-zinc-200"
                        : "cursor-pointer bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900 shadow-xs active:scale-95"
                }`}
            >
                <i className="ri-arrow-left-s-line text-base"></i>
                <span className="hidden xs:inline">Prev</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5 sm:gap-2">
                {renderPages}
            </div>

            {/* Next Button */}
            <button
                disabled={isLastPage}
                onClick={() => {
                    if (currentPage < totalPages) {
                        scrollAtTheTop();
                        dispatch(asyncLoadProduct(currentPage + 1));
                    }
                }}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-4 h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isLastPage
                        ? "opacity-40 cursor-not-allowed bg-zinc-100 text-zinc-400 border border-zinc-200"
                        : "cursor-pointer bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900 shadow-xs active:scale-95"
                }`}
            >
                <span className="hidden xs:inline">Next</span>
                <i className="ri-arrow-right-s-line text-base"></i>
            </button>
        </nav>
    );
};

export default memo(PaginationTemplate);
