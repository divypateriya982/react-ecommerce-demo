import { Link } from 'react-router-dom';

const CartSummaryTemplate = ({ carts }) => {

    const totalPrice = carts.reduce((acc, cart) => {
        return acc + Number(cart.price * cart.quantity);
    }, 0);

    console.log('CartSummary template rendering...');
    return (
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
    )
}

export default CartSummaryTemplate