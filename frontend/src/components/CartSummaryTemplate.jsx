import { Link } from "react-router-dom";
import { memo } from "react";

const CartSummaryTemplate = ({ carts }) => {
    const totalPrice = carts.reduce((acc, cart) => {
        return acc + Number(cart.price * cart.quantity);
    }, 0);

    const taxAmount = totalPrice * 0.18;
    const orderTotal = totalPrice + taxAmount;

    console.log("CartSummary template rendering...");

    return (
        <div className="w-full bg-white rounded-3xl border border-zinc-200/90 shadow-xs p-6 sm:p-7 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
                    Order Summary
                </h2>
                <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <i className="ri-receipt-line text-base"></i>
                </span>
            </div>

            {/* Price Calculations */}
            <div className="space-y-3.5 text-sm">
                <div className="flex items-center justify-between text-zinc-600">
                    <span>Original Price</span>
                    <span className="font-semibold text-zinc-900">
                        ${totalPrice.toFixed(2)}
                    </span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                    <span className="flex items-center gap-1.5">
                        <span>Tax (18%)</span>
                        <i className="ri-information-line text-zinc-400 text-xs"></i>
                    </span>
                    <span className="font-semibold text-zinc-900">
                        ${taxAmount.toFixed(2)}
                    </span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                    <span>Shipping</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                        <i className="ri-check-line text-xs"></i>
                        Free
                    </span>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                        <span className="block text-base font-bold text-zinc-900">
                            Total Due
                        </span>
                        <span className="block text-xs text-zinc-400">
                            Includes all taxes & delivery
                        </span>
                    </div>
                    <span className="text-2xl font-extrabold text-zinc-900">
                        ${orderTotal.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Checkout & Shopping Actions */}
            <div className="space-y-3 pt-2">
                <button
                    type="button"
                    className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                    <i className="ri-shield-check-line text-lg"></i>
                    <span>Proceed to Checkout</span>
                </button>

                <div className="flex items-center justify-center gap-2 pt-1">
                    <span className="text-xs text-zinc-400">or</span>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                    >
                        <span>Continue Shopping</span>
                        <i className="ri-arrow-right-line text-sm"></i>
                    </Link>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-zinc-100 grid grid-cols-2 gap-2 text-center text-[11px] text-zinc-500 font-medium">
                <div className="flex items-center justify-center gap-1 bg-zinc-50 py-2 rounded-xl border border-zinc-100">
                    <i className="ri-lock-line text-xs text-emerald-600"></i>
                    <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center justify-center gap-1 bg-zinc-50 py-2 rounded-xl border border-zinc-100">
                    <i className="ri-refund-2-line text-xs text-indigo-600"></i>
                    <span>30-Day Returns</span>
                </div>
            </div>
        </div>
    );
};

export default memo(CartSummaryTemplate);
