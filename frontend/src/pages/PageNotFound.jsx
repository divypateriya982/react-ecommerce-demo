import { Link, useNavigate } from "react-router-dom";
import { memo } from "react";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-zinc-50/70 pt-22 sm:pt-24 pb-16 flex items-center justify-center px-4 sm:px-6 transition-colors">
            <div className="w-full max-w-lg text-center bg-white rounded-3xl border border-zinc-200/90 shadow-sm sm:shadow-lg p-8 sm:p-12">
                {/* 404 Graphic Badge */}
                <div className="relative inline-block mb-4">
                    <span className="text-8xl sm:text-9xl font-extrabold text-indigo-50 tracking-tighter select-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
                            <i className="ri-compass-discover-line text-3xl sm:text-4xl"></i>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                    Page Not Found
                </h1>
                <p className="mt-2 text-sm sm:text-base text-zinc-500 max-w-md mx-auto leading-relaxed">
                    Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or never existed.
                </p>

                {/* Navigation CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 font-semibold text-sm shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                    >
                        <i className="ri-arrow-left-line text-base"></i>
                        <span>Go Back</span>
                    </button>
                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-xs hover:shadow-md active:scale-[0.98] transition-all cursor-pointer"
                    >
                        <i className="ri-home-4-line text-base"></i>
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default memo(PageNotFound);
