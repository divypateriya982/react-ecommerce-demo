import { useDispatch, useSelector } from "react-redux";
import ProductTemplate from "../components/ProductTemplate";
import PaginationTemplate from "../components/PaginationTemplate";
import { memo, useEffect, useMemo } from 'react';
import { asyncLoadProduct } from "../store/actions/productActions";

const Products = () => {

    const dispatch = useDispatch();

    const productsData = useSelector((state) => state.productReducer.products.productsData);
    const currentPage = useSelector((state) => state.productReducer.products.currentPage);
    // console.log(currentPage)

    const renderProducts = productsData.map((product) => {
        return <ProductTemplate key={product.id} product={product} />
    });

    // const renderPagination = <PaginationTemplate />;

    // useEffect(() => {
    //     dispatch(asyncLoadProduct(currentPage));
    // }, [currentPage])

    console.log("Products rendering...");
    return (
        <>
            {productsData.length > 0 ? (
                <div className="min-h-screen bg-[#FEE3C8]">
                    <div className="pt-25 px-6 py-4 grid gap-6 sm:grid-cols-2 min-[430px]:max-[500px]:px-10 min-[500px]:max-[640px]:px-20 min-[500px]:max-[640px]:gap-7 sm:px-6 md:px-15 md:gap-10 lg:grid-cols-3 lg:px-8 lg:gap-5 xl:grid-cols-4 xl:px-8 xl:gap-8">
                        {renderProducts}
                    </div>
                    {<PaginationTemplate />}
                </div>
            ) : (
                <div className="bg-[#FEE3C8] h-screen flex justify-center items-end">
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">No products yet!</p>
                    {<PaginationTemplate />}
                </div>
            )}

        </>
    )
}

export default Products