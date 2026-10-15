import { useDispatch, useSelector } from "react-redux";
import { asyncCreateCart, asyncDeleteCart } from '../store/actions/cartActions';

const ProductDetailsTemplate = ({ product, id, user }) => {

    const dispatch = useDispatch();

    const carts = useSelector((state) => state.cartReducer.carts);
    const cart = carts.find((cart) => cart.productId === id);

    console.log('ProductDetails template rendering...');
    return (
        <div className="sm:flex min-[440px]:max-[530px]:px-5 min-[530px]:max-[640px]:px-8 min-[530px]:max-[640px]:py-5 border-2 border-gray-400 py-4 px-4 rounded-lg sm:gap-4 lg:gap-8 lg:px-10 lg:py-5">
            <div className="sm:w-1/2 h-100 rounded-2xl overflow-hidden">
                <img className="w-full h-full" src={product.url} alt="" />
            </div>
            <div className="min-[530px]:max-[640px]:px-4 sm:w-1/2 sm:flex sm:flex-col sm:justify-around">
                <div className="mt-3 sm:mt-0">
                    <h2 className="hidden sm:block sm:text-blue-700 sm:text-lg sm:font-semibold lg:text-xl">Category :-</h2>
                    <p className="text-[clamp(0.75rem,0.9vw,0.875rem)] sm:text-sm sm:font-medium sm:-mt-0.5"><span className="sm:hidden">Category :- </span>{product.category}</p>
                </div>
                <div className="sm:mt-5">
                    <h2 className="hidden sm:block text-blue-700 font-semibold text-lg lg:text-xl">Product name :-</h2>
                    <h5 className="font-medium mt-2 text-[clamp(1.25rem,1.7vw,2rem)] sm:-mt-0.5 leading-6 sm:leading-5">{product.title}</h5>
                </div>
                <div className="sm:mt-5">
                    <h2 className="hidden sm:block text-blue-700 font-semibold text-lg lg:text-xl">Description :-</h2>
                    <p className="mt-2 text-[#7D7D7D] text-[clamp(0.875rem,1.1vw,1.125rem)] sm:-mt-0.5 sm:font-medium">{product.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2 sm:block sm:mt-5">
                    <div>
                        <h2 className="hidden sm:block text-blue-700 font-semibold text-lg lg:text-xl">Price -:</h2>
                        <h5 className="font-bold text-[clamp(1.25rem,1.7vw,2rem)] sm:-mt-1">${product.price}</h5>
                    </div>
                    {cart ? (
                        <button onClick={() => dispatch(asyncDeleteCart(cart.id))} className="bg-red-700/80 hover:bg-red-800 text-white rounded-full px-6 py-2 cursor-pointer active:scale-[0.97] transition duration-200 text-[clamp(0.875rem, 1.2vw, 1rem)] sm:w-full sm:mt-5 font-medium"><i className="ri-shopping-cart-2-line mr-3"></i>Remove from cart</button>
                    ) : (
                        <button onClick={() => {
                            dispatch(asyncCreateCart({
                                userId: user.id,
                                productId: product.id,
                                url: product.url,
                                title: product.title,
                                price: product.price,
                                quantity: 1
                            }));
                        }} className="bg-[#F07E5A] rounded-full px-6 py-2 cursor-pointer text-[#482416] hover:bg-[#dd633d] active:scale-[0.97] transition duration-200 text-[clamp(0.875rem, 1.2vw, 1rem)] sm:w-full sm:mt-5 font-medium"><i className="ri-shopping-cart-2-line mr-4"></i>Add to cart</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsTemplate