import { useDispatch } from "react-redux";
import { asyncDeleteCart, asyncUpdateCart } from "../store/actions/cartActions";

const CartTemplate = ({ cart }) => {

    const dispatch = useDispatch();

    console.log('Cart template rendering...');
    return (
        <div className="border border-gray-600 rounded-xl p-4 bg-gray-800 flex flex-col  gap-4 md:gap-8 lg:gap-4 xl:gap-10 md:flex-row md:items-center">
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
    )
}

export default CartTemplate