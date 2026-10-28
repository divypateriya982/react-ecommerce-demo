import { useDispatch, useSelector } from "react-redux";
import ProductTemplate from "../components/ProductTemplate";
import PaginationTemplate from "../components/PaginationTemplate";
import { memo } from "react";

const Products = () => {
    const productsData = useSelector((state) => state.productReducer.products.productsData);
    const totalPages = useSelector((state) => state.productReducer.products.totalPages);

    const renderProducts = productsData.map((product) => {
        return <ProductTemplate key={product.id} product={product} />;
    });

    console.log("Products rendering...");
    return (
        <main className="min-h-screen bg-zinc-50/70 pt-22 sm:pt-24 pb-16 transition-colors">
            {productsData.length > 0 ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 pb-8 border-b border-zinc-200/80 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-2">
                                <i className="ri-sparkling-fill text-indigo-600"></i>
                                Premium Catalog
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                                Explore Products
                            </h1>
                            <p className="text-sm text-zinc-500 mt-1 max-w-xl">
                                Browse our handpicked selection of premium essentials crafted with unmatched quality.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 self-start sm:self-auto bg-white px-3.5 py-1.5 rounded-full border border-zinc-200 shadow-xs">
                            <i className="ri-layout-grid-line text-zinc-400"></i>
                            <span>Showing {productsData.length} items</span>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
                        {renderProducts}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 pt-6 border-t border-zinc-200/80">
                        <PaginationTemplate />
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] flex flex-col justify-between">
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                        <div className="w-20 h-20 rounded-2xl bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-400 shadow-xs mb-5">
                            <i className="ri-inbox-2-line text-4xl"></i>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 tracking-tight">
                            No products found
                        </h2>
                        <p className="text-sm text-zinc-500 max-w-md mt-2">
                            We couldn't find any products in the catalog right now. Check back soon or verify server connection.
                        </p>
                    </div>
                    <div className="py-6 border-t border-zinc-200/80">
                        <PaginationTemplate />
                    </div>
                </div>
            )}
        </main>
    );
};

export default Products;
