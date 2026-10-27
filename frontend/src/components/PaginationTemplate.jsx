import { useDispatch, useSelector } from "react-redux";
import { memo } from 'react';
import { asyncLoadProduct } from "../store/actions/productActions";

const PaginationTemplate = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.productReducer.products.currentPage);
    const totalPages = useSelector((state) => state.productReducer.products.totalPages);
    const scrollAtTheTop = () => {
        window.scrollTo(0, 0); // it moves the browser's scroll position to the top-left corner of the page. 0, 0 means x = 0 (horizontal position) and y = 0 (vertical position).
    }

    const renderPages = Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => <button key={page} onClick={() => {
        scrollAtTheTop();
        dispatch(asyncLoadProduct(page));
    }} className={`hover:underline cursor-pointer px-3 py-1 rounded-full ${currentPage === page && 'bg-[#FEE3C8]'}`}>{page}</button>);

    console.log('Pagination template rendering...');
    return (
        <div className="flex justify-center gap-6 py-5 text-blue-800/70 font-medium">
            <button onClick={() => {
                if (currentPage !== 1) {
                    scrollAtTheTop();
                    dispatch(asyncLoadProduct(currentPage - 1));
                }
            }} className="hover:underline cursor-pointer">Prev.</button>
            {renderPages}
            <button onClick={() => {
                if (currentPage < totalPages) {
                    scrollAtTheTop();
                    dispatch(asyncLoadProduct(currentPage + 1));
                };
            }} className="hover:underline cursor-pointer">Next</button>
        </div>
    )
}

export default PaginationTemplate