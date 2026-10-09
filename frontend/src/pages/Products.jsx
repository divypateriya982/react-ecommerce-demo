import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { asyncCreateCart, asyncDeleteCart } from "../store/actions/cartActions";
import { loadProduct } from "../store/reducers/productSlice";

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products, totalPages, currentPage } = useSelector((state) => state.productReducer);

    const renderPages = Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => <button key={page} onClick={() => dispatch(loadProduct({ currentPage: page }))} className={`hover:underline cursor-pointer px-3 py-1 rounded-full ${currentPage === page && 'bg-white/70'}`}>{page}</button>);

    const user = useSelector((state) => state.userReducer.user);
    const { carts } = useSelector((state) => state.cartReducer);

    const renderProducts = products.map((product) => {
        const cart = carts.find((cart) => cart.productId === product.id && cart.userId === user?.id);
        return (
            <div onClick={() => {
                if (user) navigate(`/product/${product.id}`);
                else {
                    toast.error('Please login first');
                    navigate('/login');
                };
            }} key={product.id} className="bg-white h-115 rounded-3xl p-4 cursor-pointer [&:active:not(:has(button:active))]:scale-[0.97] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <img className="rounded-3xl w-full h-70 object-center bg-black/10" src={product.url} alt="" />
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
                        !user.isAdmin ? (
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
    });

    return (
        <>
            {products.length > 0 ? (
                <div className="min-h-screen bg-[#FEE3C8]">
                    <div className="pt-25 px-6 py-4 grid gap-6 sm:grid-cols-2 min-[430px]:max-[500px]:px-10 min-[500px]:max-[640px]:px-20 min-[500px]:max-[640px]:gap-7 sm:px-6 md:px-15 md:gap-10 lg:grid-cols-3 lg:px-8 lg:gap-5 xl:grid-cols-4 xl:px-8 xl:gap-8">{renderProducts}</div>
                    <div className="flex justify-center items-center gap-6 py-5 text-blue-800/70 font-medium">
                        <button onClick={() => {
                            if (currentPage !== 1) {
                                dispatch(loadProduct({ currentPage: currentPage - 1 }))
                            }
                        }} className="hover:underline cursor-pointer">Prev.</button>
                        {renderPages}
                        <button onClick={() => {
                            if (currentPage < totalPages) dispatch(loadProduct({ currentPage: currentPage + 1 }));
                        }} className="hover:underline cursor-pointer">Next</button>
                    </div>
                </div>
            ) : (
                <div className="bg-[#FEE3C8] h-screen">
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">Loading...</p>
                </div>
            )}
        </>
    )
}

export default Products