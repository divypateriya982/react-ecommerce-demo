import { useNavigate } from "react-router-dom";
import { asyncDeleteProduct, asyncUpdateProduct } from "../store/actions/productActions";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, memo } from "react";

const UpdateProductFormTemplate = ({ product, id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentPage } = useSelector((state) => state.productReducer.products);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            url: product?.url,
            category: product?.category,
            title: product?.title,
            description: product?.description,
            price: product?.price,
        },
    });

    useEffect(() => {
        if (product) {
            reset({
                url: product.url,
                category: product.category,
                title: product.title,
                description: product.description,
                price: product.price,
            });
        }
    }, [product]);

    console.log("UpdateProductForm template rendering...");

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Update Card */}
            <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs p-6 sm:p-8 lg:p-10">
                <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
                            Edit Product Information
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                            Modify product attributes and sync changes with the store catalog.
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <i className="ri-edit-box-line text-lg"></i>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(async (updatedProduct) => {
                        await dispatch(asyncUpdateProduct(updatedProduct, id, currentPage));
                        navigate("/");
                    })}
                    className="mt-6 space-y-5"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Title Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">
                                Product Title
                            </label>
                            <input
                                {...register("title", {
                                    required: "Title is required",
                                })}
                                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                                type="text"
                                placeholder="e.g. Wireless Noise-Cancelling Headphones"
                            />
                            {errors?.title && (
                                <small className="text-rose-600 text-xs mt-1 block font-medium">
                                    {errors.title.message}
                                </small>
                            )}
                        </div>

                        {/* Category Select */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    {...register("category", {
                                        required: "Category is required",
                                    })}
                                    className="w-full appearance-none px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
                                >
                                    <option value="Category">Choose a category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="groceries">Groceries</option>
                                    <option value="beauty">Beauty</option>
                                    <option value="fragrances">Fragrances</option>
                                    <option value="furniture">Furniture</option>
                                    <option value="men's clothing">Men's Clothing</option>
                                </select>
                                <i className="ri-arrow-down-s-line absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"></i>
                            </div>
                            {errors?.category && (
                                <small className="text-rose-600 text-xs mt-1 block font-medium">
                                    {errors.category.message}
                                </small>
                            )}
                        </div>

                        {/* Price Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">
                                Price ($ USD)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-semibold text-sm">
                                    $
                                </span>
                                <input
                                    {...register("price", {
                                        required: "Price is required",
                                        min: {
                                            value: 0.01,
                                            message: "Price must be greater than 0",
                                        },
                                    })}
                                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                                    type="number"
                                    step="0.01"
                                    placeholder="29.99"
                                />
                            </div>
                            {errors?.price && (
                                <small className="text-rose-600 text-xs mt-1 block font-medium">
                                    {errors.price.message}
                                </small>
                            )}
                        </div>

                        {/* Image URL Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">
                                Image URL
                            </label>
                            <input
                                {...register("url", {
                                    required: "Image URL is required",
                                    pattern: {
                                        value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i,
                                        message: "Please enter a valid image URL",
                                    },
                                })}
                                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                            />
                            {errors?.url && (
                                <small className="text-rose-600 text-xs mt-1 block font-medium">
                                    {errors.url.message}
                                </small>
                            )}
                        </div>
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">
                            Description (Minimum 20 words)
                        </label>
                        <textarea
                            {...register("description", {
                                required: "Description is required",
                                validate: (value) =>
                                    value.trim().split(/\s+/).length >= 20 ||
                                    "Description must contain atleast 20 words",
                            })}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all leading-relaxed"
                            placeholder="Enter detailed specifications and features of the product..."
                        ></textarea>
                        {errors?.description && (
                            <small className="text-rose-600 text-xs mt-1 block font-medium">
                                {errors.description.message}
                            </small>
                        )}
                    </div>

                    {/* Action Submit Button */}
                    <div className="pt-3">
                        <button
                            type="submit"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-[0.98] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                        >
                            <i className="ri-save-line text-base"></i>
                            <span>Save Changes</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Danger Zone: Delete Product Card */}
            <div className="bg-rose-50/50 rounded-3xl border border-rose-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700">
                        <i className="ri-alarm-warning-line"></i>
                        Danger Zone
                    </div>
                    <h4 className="text-base font-bold text-zinc-900 mt-1">
                        Delete this product
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-0.5 max-w-lg">
                        Once deleted, this product will be permanently removed from the catalog and cannot be recovered.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={async () => {
                        await dispatch(asyncDeleteProduct(id, currentPage));
                        navigate("/");
                    }}
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-rose-300 text-rose-600 hover:bg-rose-600 hover:text-white font-semibold text-xs sm:text-sm shadow-xs active:scale-95 transition-all duration-200 cursor-pointer"
                >
                    <i className="ri-delete-bin-line text-base"></i>
                    <span>Delete Product</span>
                </button>
            </div>
        </div>
    );
};

export default memo(UpdateProductFormTemplate);
