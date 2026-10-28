import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import ProductDetailsTemplate from "../../components/ProductDetailsTemplate";

const ProductDetails = () => {
    console.log("ProductDetails rendering...");

    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.userReducer.user);
    const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`/products/${id}`);
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    return (
        <main className="min-h-screen bg-zinc-50/70 pt-22 sm:pt-24 pb-16 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Navigation Bar */}
                <div className="py-4 flex items-center justify-between gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 shadow-xs transition duration-200 cursor-pointer text-sm font-semibold active:scale-95"
                    >
                        <i className="ri-arrow-left-line text-base"></i>
                        <span>Back</span>
                    </button>

                    {product && (
                        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-zinc-400">
                            <span>Products</span>
                            <i className="ri-arrow-right-s-line text-zinc-300"></i>
                            <span className="capitalize">{product.category}</span>
                            <i className="ri-arrow-right-s-line text-zinc-300"></i>
                            <span className="text-zinc-600 truncate max-w-40">{product.title}</span>
                        </div>
                    )}
                </div>

                {/* Main Content Area */}
                {user && product ? (
                    <div className="mt-2">
                        <ProductDetailsTemplate product={product} id={id} user={user} />
                    </div>
                ) : (
                    <div className="min-h-[50vh] flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-sm font-medium text-zinc-500">Loading product details...</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default ProductDetails;
