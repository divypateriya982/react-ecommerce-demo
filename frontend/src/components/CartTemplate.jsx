import { useDispatch } from "react-redux";
import { asyncDeleteCart, asyncUpdateCart } from "../store/actions/cartActions";
import { memo } from "react";

const CartTemplate = ({ cart }) => {
    const dispatch = useDispatch();

    console.log("Cart template rendering...");

    return (
        <article className="bg-white rounded-2xl border border-zinc-200/90 shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 hover:border-zinc-300 transition-all">
            {/* Left: Product Thumbnail & Details */}
            <div className="flex items-center gap-4 sm:gap-5 min-w-0 flex-1">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-zinc-50 border border-zinc-100 p-2 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                        className="w-full h-full object-contain"
                        src={cart.url}
                        alt={cart.title || "Cart item"}
                        loading="lazy"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <h2 className="text-sm sm:text-base font-semibold text-zinc-900 leading-snug truncate">
                        {cart.title}
                    </h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                        ${Number(cart.price).toFixed(2)} each
                    </p>
                    <button
                        onClick={() => dispatch(asyncDeleteCart(cart.id))}
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer mt-2.5 active:scale-95"
                    >
                        <i className="ri-delete-bin-line text-sm"></i>
                        <span>Remove</span>
                    </button>
                </div>
            </div>

            {/* Right: Quantity Stepper & Subtotal */}
            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                {/* Quantity Stepper Control */}
                <div className="inline-flex items-center border border-zinc-200 rounded-xl bg-zinc-50/70 p-0.5">
                    <button
                        type="button"
                        onClick={() => {
                            if (cart.quantity > 1) {
                                const copyCart = { ...cart };
                                copyCart.quantity -= 1;
                                dispatch(asyncUpdateCart(cart.id, copyCart));
                            } else {
                                dispatch(asyncDeleteCart(cart.id));
                            }
                        }}
                        className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:bg-white rounded-lg transition-colors cursor-pointer active:scale-95"
                        aria-label="Decrease quantity"
                    >
                        <i className="ri-subtract-line text-sm font-semibold"></i>
                    </button>
                    <span className="w-9 text-center text-sm font-bold text-zinc-800 select-none">
                        {cart.quantity}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            const copyCart = { ...cart };
                            copyCart.quantity += 1;
                            dispatch(asyncUpdateCart(cart.id, copyCart));
                        }}
                        className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:bg-white rounded-lg transition-colors cursor-pointer active:scale-95"
                        aria-label="Increase quantity"
                    >
                        <i className="ri-add-line text-sm font-semibold"></i>
                    </button>
                </div>

                {/* Subtotal for Item */}
                <div className="text-right sm:min-w-24">
                    <span className="block text-base sm:text-lg font-bold text-zinc-900">
                        ${(cart.quantity * cart.price).toFixed(2)}
                    </span>
                </div>
            </div>
        </article>
    );
};

export default memo(CartTemplate);
