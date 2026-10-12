import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../store/reducers/productSlice";

const PaginationTemplate = () => {
    const dispatch = useDispatch();
    const { currentPage, totalPages } = useSelector((state) => state.productReducer);

    const renderPages = Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => <button key={page} onClick={() => dispatch(loadProduct({ currentPage: page }))} className={`hover:underline cursor-pointer px-3 py-1 rounded-full ${currentPage === page && 'bg-white/70'}`}>{page}</button>);

    console.log('Pagination template rendering...');
    return (
        <div className="flex justify-center items-center gap-6 py-5 text-blue-800/70 font-medium">
            <button onClick={() => {
                if (currentPage !== 1) {
                    dispatch(loadProduct({ currentPage: currentPage - 1 }))
                }
            }} className="hover:underline cursor-pointer">Prev.</button>
            {renderPages}
            <button onClick={() => {
                if (currentPage < totalPages) dispatch(loadProduct({ currentPage: currentPage + 1 }));
            }} className="hover:underline cursor-pointer">Next</button>
        </div>
    )
}

export default PaginationTemplate