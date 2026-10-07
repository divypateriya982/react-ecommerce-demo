import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncCreateProduct } from '../../store/actions/productActions';

const CreateProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    return (
        <div className='min-h-screen bg-amber-50'>
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] min-[480px]:max-[640px]:w-[65%] sm:w-[50%] md:w-[40%] lg:w-[30%] bg-black/40 px-6 py-5 rounded-2xl text-sm shadow-xl md:shadow-2xl">
                <h1 className="text-center text-xl font-medium">Create Products</h1>
                <form onSubmit={handleSubmit( async(product) => {
                    await dispatch(asyncCreateProduct(product));
                    reset();
                    navigate('/');
                })} className="mt-4">
                    <div className="h-15">
                        <input {...register('url', {
                            required: 'Image-url is required',
                            pattern: {
                                value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i,
                                message: "Please enter a valid image URL",
                            }
                        })} className="w-full px-3 py-2 rounded-xl bg-gray-100 outline-none text-[#8B96A0] placeholder:text-[#8B96A0]" type="url" placeholder="image-url" />
                        <small className="text-red-600 ml-3 block">{errors?.url?.message}</small>
                    </div>
                    <div className="h-15">
                        <input {...register('title', {
                            required: 'Title is required'
                        })} className="w-full px-3 py-2 rounded-xl bg-gray-100 outline-none text-[#8B96A0] placeholder:text-[#8B96A0]" type="text" placeholder="title" />
                        <small className="text-red-600 ml-3 block">{errors?.title?.message}</small>
                    </div>
                    <div className="h-15">
                        <input {...register('price', {
                            required: 'Price is required',
                            min: {
                                value: 0.01,
                                message: "Price must be greater than 0"
                            }
                        })} className="w-full px-3 py-2 rounded-xl bg-gray-100 outline-none text-[#8B96A0] placeholder:text-[#8B96A0]" type="number" step="0.01" placeholder="price" />
                        <small className="text-red-600 ml-3 block">{errors?.price?.message}</small>
                    </div>
                    <div className="h-30">
                        <textarea {...register('description', {
                            required: 'Description is required',
                            validate: (value) => value.trim().split(/\s+/).length >= 20 || "Description must contain atleast 10 words"
                        })} className="w-full h-25 px-3 py-2 rounded-xl bg-gray-100 outline-none text-[#8B96A0] placeholder:text-[#8B96A0]" placeholder="description"></textarea>
                        <small className="text-red-600 ml-3 block -mt-1">{errors?.description?.message}</small>
                    </div>
                    <div className="h-15">
                        <select {...register('category', {
                            required: 'category is required'
                        })} className="w-full px-3 py-2 rounded-xl bg-gray-100 outline-none text-[#8B96A0] placeholder:text-[#8B96A0]">
                            <option value="Category">Category</option>
                            <option value="electronics">Electronic items</option>
                            <option value="groceries">Grocery products</option>
                            <option value="beauty">Beauty products</option>
                            <option value="fragrances">Fragrances</option>
                            <option value="furniture">Furnitures</option>
                            <option value="men's clothing">Men's Clothing</option>
                        </select>
                        <small className="text-red-600 ml-3 block">{errors?.category?.message}</small>
                    </div>
                    <button className="bg-green-700 font-medium text-gray-200 w-full py-2 rounded-full mt-2 active:scale-[0.97] transition duration-200 cursor-pointer">Create Product</button>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct