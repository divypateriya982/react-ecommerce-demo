import { useNavigate } from "react-router-dom";
import { asyncDeleteProduct, asyncUpdateProduct } from "../store/actions/productActions";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const UpdateProductFormTemplate = ({ product, id }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentPage = useSelector((state) => state.productReducer.currentPage);
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

    console.log('UpdateProductForm template rendering...');
    return (
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
                await dispatch(asyncDeleteProduct(id, currentPage));
                navigate('/');
            }} className=" bg-red-600/70 py-1 lg:py-2 rounded-full font-medium px-10"><i className="ri-delete-bin-6-line mr-4"></i>Delete This Product</button>
        </div>
    )
}

export default UpdateProductFormTemplate