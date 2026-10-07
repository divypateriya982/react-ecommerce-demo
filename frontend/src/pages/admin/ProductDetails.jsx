import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { asyncDeleteProduct, asyncUpdateProduct } from "../../store/actions/productActions";
import { asyncCreateCart, asyncDeleteCart } from "../../store/actions/cartActions";
import { useEffect } from "react";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { id } = useParams();
    const user = useSelector((state) => state.userReducer.user);
    // const { products, currentPage } = useSelector((state) => state.productReducer);
    // const product = products?.find((product) => product.id === id);
    const { product, currentPage } = location.state;


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            url: product?.url,
            category: product?.category,
            title: product?.title,
            description: product?.description,
            price: product?.price
        }
    });

    useEffect(() => {
        if (product) {
            reset({
                url: product.url,
                category: product.category,
                title: product.title,
                description: product.description,
                price: product.price
            })
        }
    }, [product]);

    const { carts } = useSelector((state) => state.cartReducer);
    const cart = carts.find((cart) => cart.productId === id);

    return (
        user && product && (
            <div className="min-h-screen bg-[#ECEDBF] pt-25 px-6 pb-6 space-y-6">
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
                {user?.isAdmin && <>
                    <hr className="border" />
                    <div className="flex flex-col items-center space-y-5">
                        <div className="w-full min-[480px]:max-[640px]:w-[85%] sm:w-[75%] md:w-[70%] lg:w-[50%] xl:w-[40%] bg-black/40 px-6 py-5 rounded-2xl text-sm shadow-xl md:shadow-2xl">
                            <h1 className="text-center text-xl font-medium lg:text-2xl">Update Product</h1>
                            <form onSubmit={handleSubmit(async (product) => {
                                await dispatch(asyncUpdateProduct(product, id, currentPage));
                                navigate('/');
                            })} className="mt-4">
                                <div className="h-15">
                                    <input {...register('url', {
                                        required: 'Image-url is required',
                                        pattern: {
                                            value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i,
                                            message: "Please enter a valid image URL",
                                        }
                                    })} className="w-full px-3 py-2 rounded-xl bg-gray-100 outline-none text-[#8B96A0]" type="url" />
                                    <small className="text-red-800 ml-3 block">{errors?.url?.message}</small>
                                </div>
                                <div className="h-15">
                                    <input {...register('title', {
                                        required: 'Title is required'
                                    })} className="w-full px-3 py-2 rounded-xl bg-gray-100 outline-none text-[#8B96A0]" type="text" />
                                    <small className="text-red-800 ml-3 block">{errors?.title?.message}</small>
                                </div>
                                <div className="h-15">
                                    <input {...register('price', {
                                        required: 'Price is required',
                                        min: {
                                            value: 0.01,
                                            message: "Price must be greater than 0"
                                        }
                                    })} className="w-full px-3 py-2 rounded-xl bg-gray-100 outline-none text-[#8B96A0]" type="number" step="0.01" />
                                    <small className="text-red-800 rounded-full ml-3 block">{errors?.price?.message}</small>
                                </div>
                                <div className="h-30">
                                    <textarea {...register('description', {
                                        required: 'Description is required',
                                        validate: (value) => value.trim().split(/\s+/).length >= 20 || "Description must contain atleast 20 words"
                                    })} className="w-full h-25 px-3 py-2 rounded-xl bg-gray-100 outline-none text-[#8B96A0]"></textarea>
                                    <small className="text-red-800 ml-3 block -mt-1">{errors?.description?.message}</small>
                                </div>
                                <div className="h-15">
                                    <select {...register('category', {
                                        required: 'category is required'
                                    })} className="w-full px-3 py-2 rounded-xl bg-gray-100 outline-none text-[#8B96A0]">
                                        <option value="Category">Category</option>
                                        <option value="electronics">Electronic items</option>
                                        <option value="groceries">Grocery products</option>
                                        <option value="beauty">Beauty products</option>
                                        <option value="fragrances">Fragrances</option>
                                        <option value="furniture">Furnitures</option>
                                        <option value="men's clothing">Men's Clothing</option>
                                    </select>
                                    <small className="text-red-800 ml-3 block">{errors?.category?.message}</small>
                                </div>
                                <button className="bg-green-700 font-medium text-gray-200 w-full py-2 rounded-full mt-2 active:scale-[0.97] transition duration-200">Update Product</button>
                            </form>
                        </div>
                        <button onClick={async () => {
                            await dispatch(asyncDeleteProduct(id));
                            navigate('/');
                        }} className=" bg-red-600/70 py-1 lg:py-2 rounded-full font-medium px-10"><i className="ri-delete-bin-6-line mr-4"></i>Delete This Product</button>
                    </div>
                </>}
            </div>
        )
    )
}

export default ProductDetails