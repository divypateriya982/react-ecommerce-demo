import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncCreateCart, asyncDeleteCart } from "../store/actions/cartActions";
import { memo } from "react";

const ProductDetailsTemplate = ({ product, id, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const carts = useSelector((state) => state.cartReducer.carts);
    const cart = carts.find((cart) => cart.productId === id);

    console.log("ProductDetails template rendering...");

    return (
        <article className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs p-5 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left Column: Product Image Showcase */}
                <div className="relative w-full aspect-square sm:aspect-4/3 lg:aspect-square bg-zinc-50/80 rounded-2xl border border-zinc-100 flex items-center justify-center p-6 sm:p-10 overflow-hidden">
                    <img
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        src={product.url}
                        alt={product.title || "Product image"}
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs text-indigo-700 border border-zinc-200/80 shadow-xs">
                        <i className="ri-price-tag-3-line"></i>
                        {product.category}
                    </span>
                </div>

                {/* Right Column: Product Information & Purchase Area */}
                <div className="flex flex-col justify-between h-full space-y-6">
                    <div>
                        {/* Category & Title */}
                        <div className="space-y-2">
                            <span className="text-xs uppercase font-bold tracking-widest text-indigo-600">
                                {product.category}
                            </span>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                                {product.title}
                            </h1>
                        </div>

                        {/* Price & Stock Status Strip */}
                        <div className="mt-5 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between">
                            <div>
                                <span className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                                    Total Price
                                </span>
                                <span className="text-3xl font-extrabold text-zinc-900">
                                    ${product.price}
                                </span>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                In Stock
                            </span>
                        </div>

                        {/* Description Section */}
                        <div className="mt-6 space-y-2">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Description
                            </h2>
                            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Trust Markers */}
                        <div className="mt-6 grid grid-cols-2 gap-3 pt-6 border-t border-zinc-100">
                            <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-600">
                                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <i className="ri-truck-line text-sm"></i>
                                </div>
                                <span>Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-600">
                                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <i className="ri-shield-check-line text-sm"></i>
                                </div>
                                <span>100% Genuine</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button Area */}
                    <div className="pt-6 border-t border-zinc-100">
                        {user?.isAdmin ? (
                            /* Admin: Manage & Update Product Button */
                            <button
                                onClick={() => navigate(`/admin/update-product/${id}`)}
                                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 font-semibold cursor-pointer shadow-md hover:shadow-lg text-sm sm:text-base"
                            >
                                <i className="ri-settings-3-line text-lg"></i>
                                <span>Manage Product</span>
                            </button>
                        ) : cart ? (
                            /* Customer: Remove from Cart */
                            <button
                                onClick={() => dispatch(asyncDeleteCart(cart.id))}
                                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white active:scale-[0.98] transition-all duration-200 font-semibold cursor-pointer shadow-xs text-sm sm:text-base"
                            >
                                <i className="ri-delete-bin-line text-lg"></i>
                                <span>Remove from Cart</span>
                            </button>
                        ) : (
                            /* Customer: Add to Cart */
                            <button
                                onClick={() => {
                                    dispatch(
                                        asyncCreateCart({
                                            userId: user.id,
                                            productId: product.id,
                                            url: product.url,
                                            title: product.title,
                                            price: product.price,
                                            quantity: 1,
                                        })
                                    );
                                }}
                                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 font-semibold cursor-pointer shadow-md hover:shadow-lg text-sm sm:text-base"
                            >
                                <i className="ri-shopping-cart-2-line text-lg"></i>
                                <span>Add to Cart</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default memo(ProductDetailsTemplate);
