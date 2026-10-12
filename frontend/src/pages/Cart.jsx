import { useSelector } from "react-redux";
import CartTemplate from "../components/CartTemplate";
import CartSummaryTemplate from "../components/CartSummaryTemplate";

const Cart = () => {

    const carts = useSelector((state) => state.cartReducer.carts);

    console.log('Cart rendering...');
    return (
        <div className="bg-gray-900 pt-25 pb-6 px-4 min-h-screen">
            {carts.length > 0 ? (
                <div className="border border-gray-600 px-4 py-6 rounded-xl md:px-6 lg:px-8">
                    <h1 className="text-white text-2xl font-medium lg:text-3xl">Shopping Cart</h1>
                    <div className="mt-6 lg:flex gap-10 lg:items-start">
                        <div className="min-w-0 flex-1 space-y-4">
                            {carts.map((cart) => <CartTemplate key={cart.id} cart={cart} />)}
                        </div>
                        <CartSummaryTemplate carts={carts} />
                    </div>
                </div>
            ) : (
                <h1 className="text-red-400/90 absolute top-1/2 left-1/2 -translate-x-1/2 -transalte-y-1/2 text-2xl sm:text-3xl">No items in cart!</h1>
            )}

            {/* <div className="bg-black w-full h-[50vh] text-white">
               <span>Static component</span>
               {
                 Array.from({ length: 1000000 }).map((item)=> {
                     return <></>
                 })
               }
            </div> */}
        </div>
    )
}

export default Cart