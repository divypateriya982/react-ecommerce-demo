import { useNavigate } from "react-router-dom";
import { asyncCreateCart, asyncDeleteCart } from "../store/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { memo } from "react";

const ProductTemplate = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userReducer.user);
    const carts = useSelector((state) => state.cartReducer.carts);
    const cart = carts.find((cart) => cart.productId === product.id && cart.userId === user?.id);

    console.log("Product template rendering...");

    return (
        <article
            onClick={() => {
                if (user) navigate(`/product/${product.id}`);
                else {
                    toast.error("Please login first");
                    navigate("/login");
                }
            }}
            className="group relative bg-white rounded-2xl border border-zinc-200/90 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden p-4 sm:p-5 flex flex-col justify-between cursor-pointer"
        >
            <div>
                {/* Product Image Container */}
                <div className="relative w-full aspect-4/3 rounded-xl bg-zinc-50 border border-zinc-100 overflow-hidden flex items-center justify-center p-3 mb-4">
                    <img
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        src={product.url}
                        alt={product.title || "No image found"}
                        loading="lazy"
                    />

                    {/* Category Chip Tag */}
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-zinc-700 border border-zinc-200/70 shadow-xs">
                        {product.category}
                    </span>
                </div>

                {/* Title & Description */}
                <div>
                    <h2 className="text-base font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-1">
                        {product.title}
                    </h2>
                    <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed line-clamp-2 h-9">
                        {product.description.split(/\s+/).slice(0, 12).join(" ") + " ...more"}
                    </p>
                </div>
            </div>

            {/* Price & Action Area */}
            <div className="mt-4 pt-3.5 border-t border-zinc-100 flex items-center justify-between gap-2">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
                        Price
                    </span>
                    <span className="text-lg font-bold text-zinc-900">
                        ${product.price}
                    </span>
                </div>

                {cart ? (
                    user ? (
                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                dispatch(asyncDeleteCart(cart.id));
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white active:scale-95 transition-all duration-200 cursor-pointer shadow-xs"
                        >
                            <i className="ri-delete-bin-line text-sm"></i>
                            <span>Remove</span>
                        </button>
                    ) : (
                        <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all duration-200 cursor-pointer shadow-xs">
                            <i className="ri-shopping-cart-2-line text-sm"></i>
                            <span>Add to cart</span>
                        </button>
                    )
                ) : (
                    !user?.isAdmin ? (
                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                if (user) {
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
                                } else {
                                    toast.error("Please login first!");
                                    navigate("/login");
                                }
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all duration-200 cursor-pointer shadow-xs"
                        >
                            <i className="ri-shopping-cart-2-line text-sm"></i>
                            <span>Add to cart</span>
                        </button>
                    ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-xl">
                            <i className="ri-settings-line"></i>
                            <span>Manage</span>
                        </span>
                    )
                )}
            </div>
        </article>
    );
};

export default memo(ProductTemplate);
