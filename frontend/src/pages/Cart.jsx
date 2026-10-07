import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { asyncDeleteCart, asyncUpdateCart } from "../store/actions/cartActions";

const Cart = () => {
    const dispatch = useDispatch();
    const carts = useSelector((state) => state.cartReducer.carts);
    const totalPrice = carts.reduce((acc, cart) => {
        return acc + Number(cart.price * cart.quantity);
    }, 0);
    const renderCarts = carts.map((cart) => (
        <div key={cart.id} className="border border-gray-600 rounded-xl p-4 bg-gray-800 flex flex-col  gap-4 md:gap-8 lg:gap-4 xl:gap-10 md:flex-row md:items-center">
            <img className="h-25 w-25 border border-gray-300 rounded-xl p-1 bg-white/80" src={cart.url} alt="" />
            <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row-reverse md:items-center md:justify-between">
                <div className="flex items-center justify-between md:gap-8 xl:gap-15">
                    <div className="flex border rounded-xl border-gray-300 items-center text-white">
                        <i onClick={() => {
                            if (cart.quantity > 1) {
                                const copyCart = { ...cart };
                                copyCart.quantity -= 1;
                                dispatch(asyncUpdateCart(cart.id, copyCart));
                            }
                            else dispatch(asyncDeleteCart(cart.id));
                        }} className="ri-subtract-line cursor-pointer px-2"></i>
                        <hr className="h-6 border-l border-gray-300" />
                        <h2 className="px-2">{cart.quantity}</h2>
                        <hr className="h-6 border-l border-gray-300" />
                        <i onClick={() => {
                            const copyCart = { ...cart };
                            copyCart.quantity += 1;
                            dispatch(asyncUpdateCart(cart.id, copyCart));
                        }} className="ri-add-line px-2 cursor-pointer"></i>
                    </div>
                    <h3 className="text-white text-lg font-medium">${(cart.quantity * cart.price).toFixed(2)}</h3>
                </div>
                <div>
                    <h2 className="text-white text-lg leading-6 wrap-break-word">{cart.title}</h2>
                    <button onClick={() => dispatch(asyncDeleteCart(cart.id))} className="text-red-400 rounded-lg font-medium mt-3 cursor-pointer transition active:scale-[0.98] duration-200"><i className="ri-close-large-fill font-semibold mr-1"></i>Remove</button>
                </div>
            </div>
        </div >
    ))
    return (
        <div className="bg-gray-900 pt-25 pb-6 px-4 min-h-screen">
            {carts.length > 0 ? (
                <div className="border border-gray-600 px-4 py-6 rounded-xl md:px-6 lg:px-8">
                    <h1 className="text-white text-2xl font-medium lg:text-3xl">Shopping Cart</h1>
                    <div className="mt-6 lg:flex gap-10 lg:items-start">
                        <div className="min-w-0 flex-1 space-y-4">{renderCarts}</div>
                        <div className="w-full shrink-0 border border-gray-600 bg-gray-800 p-4 rounded-xl mt-6 lg:mt-0 text-white lg:w-80">
                            <h1 className="text-xl font-medium">Order summary :</h1>
                            <div className="mt-4 space-y-2 text-lg">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-gray-400">Original price</h2>
                                    <h2 className="font-medium">${totalPrice.toFixed(2)}</h2>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-gray-400">Tax (18%)</h2>
                                    <h2 className="font-medium">${(totalPrice * 0.18).toFixed(2)}</h2>
                                </div>
                                <hr className="text-gray-400 mt-4" />
                                <div className="flex items-center justify-between">
                                    <h2 className="font-medium ">Total</h2>
                                    <h2 className="font-medium">${(totalPrice + (totalPrice * 0.18)).toFixed(2)}</h2>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button className="w-full py-2 text-white bg-[#2563EB] rounded-lg active:scale-[0.97] transition duration-200">Proceed to Checkout</button>
                                <div className="flex gap-4 justify-center items-center mt-2">
                                    <p className="text-gray-400">or</p>
                                    <Link to={'/'} className="text-[#4180EE]"><span className="underline hover:no-underline mr-1">Continue Shopping</span> <i className="ri-arrow-right-long-line"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className="text-red-400/90 absolute top-1/2 left-1/2 -translate-x-1/2 -transalte-y-1/2 text-2xl sm:text-3xl">No items in cart!</h1>
            )}
        </div>
    )
}

export default Cart