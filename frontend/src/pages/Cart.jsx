import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTemplate from "../components/CartTemplate";
import CartSummaryTemplate from "../components/CartSummaryTemplate";
import { memo } from "react";

const Cart = () => {
    const carts = useSelector((state) => state.cartReducer.carts);

    console.log("Cart rendering...");

    // Calculate total quantity of items
    const totalItems = carts?.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0) || 0;

    return (
        <main className="min-h-screen bg-zinc-50/70 pt-22 sm:pt-24 pb-16 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {carts.length > 0 ? (
                    <div>
                        {/* Page Header */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 pb-8 border-b border-zinc-200/80 mb-8">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-2">
                                    <i className="ri-shopping-cart-2-line text-indigo-600"></i>
                                    Customer Checkout
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                                    Shopping Cart
                                </h1>
                                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                                    Review your selected products and proceed to checkout when ready.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 self-start sm:self-auto bg-white px-3.5 py-1.5 rounded-full border border-zinc-200 shadow-xs">
                                <span>{totalItems} {totalItems === 1 ? "item" : "items"} in cart</span>
                            </div>
                        </div>

                        {/* Cart Layout: Items List & Order Summary */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Items List */}
                            <div className="lg:col-span-8 space-y-4">
                                {carts.map((cart) => (
                                    <CartTemplate key={cart.id} cart={cart} />
                                ))}
                            </div>

                            {/* Order Summary Sidebar */}
                            <div className="lg:col-span-4 lg:sticky lg:top-24">
                                <CartSummaryTemplate carts={carts} />
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Empty State View */
                    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center py-20 px-4">
                        <div className="w-20 h-20 rounded-3xl bg-white border border-zinc-200/90 shadow-xs flex items-center justify-center text-zinc-400 mb-6">
                            <i className="ri-shopping-bag-3-line text-4xl text-zinc-400"></i>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                            Your cart is empty
                        </h2>
                        <p className="text-sm text-zinc-500 max-w-md mt-2 leading-relaxed">
                            Looks like you haven't added anything to your cart yet. Explore our latest arrivals to find something you love.
                        </p>
                        <div className="mt-8">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-xs hover:shadow-md active:scale-[0.98] transition-all duration-200"
                            >
                                <i className="ri-arrow-left-line text-base"></i>
                                <span>Start Shopping</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default memo(Cart);
