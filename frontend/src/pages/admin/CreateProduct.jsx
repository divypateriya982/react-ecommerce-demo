import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncCreateProduct } from "../../store/actions/productActions";
import { memo } from "react";

const CreateProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    console.log("CreateProduct rendering...");

    return (
        <main className="min-h-screen bg-zinc-50/70 pt-22 sm:pt-24 pb-16 transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Navigation Bar */}
                <div className="py-4 flex items-center justify-between gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 shadow-xs transition duration-200 cursor-pointer text-sm font-semibold active:scale-95"
                    >
                        <i className="ri-arrow-left-line text-base"></i>
                        <span>Back</span>
                    </button>

                    <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-zinc-400">
                        <span>Admin</span>
                        <i className="ri-arrow-right-s-line text-zinc-300"></i>
                        <span className="text-zinc-600">Create Product</span>
                    </div>
                </div>

                {/* Main Form Card */}
                <div className="mt-2 bg-white rounded-3xl border border-zinc-200/90 shadow-xs p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-2">
                                <i className="ri-sparkling-fill text-indigo-600"></i>
                                Admin Portal
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
                                Create New Product
                            </h1>
                            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                                Fill in the details below to publish a new product to the catalog.
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <i className="ri-add-circle-line text-2xl"></i>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit(async (product) => {
                            await dispatch(asyncCreateProduct(product));
                            reset();
                            navigate("/");
                        })}
                        className="mt-6 space-y-6"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
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
                                        <option value="electronics">Electronic items</option>
                                        <option value="groceries">Grocery products</option>
                                        <option value="beauty">Beauty products</option>
                                        <option value="fragrances">Fragrances</option>
                                        <option value="furniture">Furnitures</option>
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
                                        required: "Image-url is required",
                                        pattern: {
                                            value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i,
                                            message: "Please enter a valid image URL",
                                        },
                                    })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                                    type="url"
                                    placeholder="https://example.com/product-image.jpg"
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
                                Description (Minimum 10 words)
                            </label>
                            <textarea
                                {...register("description", {
                                    required: "Description is required",
                                    validate: (value) =>
                                        value.trim().split(/\s+/).length >= 10 ||
                                        "Description must contain atleast 10 words",
                                })}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all leading-relaxed"
                                placeholder="Describe the product features, specifications, and materials..."
                            ></textarea>
                            {errors?.description && (
                                <small className="text-rose-600 text-xs mt-1 block font-medium">
                                    {errors.description.message}
                                </small>
                            )}
                        </div>

                        {/* Form Buttons */}
                        <div className="pt-4 border-t border-zinc-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 font-semibold text-sm transition-all duration-200 cursor-pointer text-center"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-[0.98] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                            >
                                <i className="ri-check-line text-base"></i>
                                <span>Create Product</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default memo(CreateProduct);
