import { useNavigate } from "react-router-dom";
import { asyncCreateCart, asyncDeleteCart } from "../store/actions/cartActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductTemplate = ({product, cart, user}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log('Product template rendering...');
    return (
        <div onClick={() => {
            if (user) navigate(`/product/${product.id}`);
            else {
                toast.error('Please login first');
                navigate('/login');
            };
        }} className="bg-white h-115 rounded-3xl p-4 cursor-pointer [&:active:not(:has(button:active))]:scale-[0.97] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <img className="rounded-3xl w-full h-70 object-center bg-black/10" src={product.url} alt="No image found" loading="lazy" />
            <p className="text-xs mt-2"><span className="underline">Category</span> :- {product.category}</p>
            <h2 className="font-medium mt-1 leading-5 line-clamp-1">{product.title}</h2>
            <p className="h-10 mt-2 text-sm text-[#7D7D7D]">{product.description.split(/\s+/).slice(0, 12).join(" ") + " ...more"}</p>
            <div className="flex items-center justify-between mt-3">
                <h5 className="font-bold text-lg">${product.price}</h5>
                {cart ? (user ? (
                    <button onClick={(event) => {
                        event.stopPropagation();
                        dispatch(asyncDeleteCart(cart.id));
                    }} className="bg-red-700/80 rounded-full px-4 py-2 cursor-pointer text-white hover:bg-red-800 font-medium active:scale-[0.96] transition duration-200"><i className="ri-shopping-cart-2-line mr-3"></i>Remove from cart</button>
                ) : (
                    <button className="bg-[#F07E5A] rounded-full px-6 py-2 cursor-pointer text-[#482416] hover:bg-[#dd633d] active:scale-[0.96] font-medium transition duration-200"><i className="ri-shopping-cart-2-line mr-4"></i>Add to cart</button>
                )) : (
                    !user?.isAdmin ? (
                        <button onClick={(event) => {
                            event.stopPropagation();
                            if (user) {
                                dispatch(asyncCreateCart({
                                    userId: user.id,
                                    productId: product.id,
                                    url: product.url,
                                    title: product.title,
                                    price: product.price,
                                    quantity: 1
                                }));
                            }
                            else {
                                toast.error('Please login first!');
                                navigate('/login');
                            }
                        }} className="bg-[#F07E5A] rounded-full px-6 py-2 cursor-pointer text-[#482416] hover:bg-[#dd633d] active:scale-[0.96] font-medium transition duration-200"><i className="ri-shopping-cart-2-line mr-4"></i>Add to cart</button>
                    ) : null
                )}
            </div>
        </div>
    )
}

export default ProductTemplate