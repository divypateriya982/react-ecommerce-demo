import { useState, memo } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    const user = useSelector((state) => state.userReducer.user);
    const carts = useSelector((state) => state.cartReducer.carts);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Calculate total quantity of items in cart
    const cartCount = carts?.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0) || 0;

    console.log("Navbar rendering...");

    const navLinkClass = ({ isActive }) =>
        `inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            isActive
                ? "text-indigo-600 bg-indigo-50/90 font-semibold shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80"
        }`;

    const mobileNavLinkClass = ({ isActive }) =>
        `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
            isActive
                ? "text-indigo-600 bg-indigo-50/90 font-semibold"
                : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100"
        }`;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-zinc-200/80 shadow-xs transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-18">
                    {/* Brand / Logo Area */}
                    <Link
                        to="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 group cursor-pointer"
                    >
                        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
                            <i className="ri-store-2-line text-lg leading-none"></i>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold tracking-tight text-zinc-900 leading-none group-hover:text-indigo-600 transition-colors">
                                NovaStore
                            </span>
                            <span className="text-[10px] font-medium text-zinc-400 tracking-wider uppercase">
                                E-Commerce
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1.5">
                        <NavLink to="/" className={navLinkClass}>
                            <i className="ri-home-4-line text-base"></i>
                            <span>Home</span>
                        </NavLink>

                        {user ? (
                            <>
                                {user?.isAdmin ? (
                                    <NavLink to="/admin/create-product" className={navLinkClass}>
                                        <i className="ri-add-circle-line text-base text-indigo-500"></i>
                                        <span>Create Product</span>
                                        <span className="ml-1 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                                            Admin
                                        </span>
                                    </NavLink>
                                ) : (
                                    <NavLink to="/cart" className={navLinkClass}>
                                        <div className="relative flex items-center">
                                            <i className="ri-shopping-cart-2-line text-base"></i>
                                            {cartCount > 0 && (
                                                <span className="absolute -top-1.5 -right-2 min-w-4.5 h-4.5 px-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                                    {cartCount}
                                                </span>
                                            )}
                                        </div>
                                        <span>Cart</span>
                                    </NavLink>
                                )}

                                <NavLink to="/settings" className={navLinkClass}>
                                    <i className="ri-settings-3-line text-base"></i>
                                    <span>Settings</span>
                                </NavLink>
                            </>
                        ) : null}
                    </nav>

                    {/* Desktop User / Auth Area */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <Link
                                to="/profile"
                                className="flex items-center gap-2.5 pl-3 py-1.5 pr-2 rounded-full border border-zinc-200 bg-zinc-50/80 hover:bg-zinc-100 transition-all text-xs text-zinc-700 group cursor-pointer"
                                title="View & Edit Profile"
                            >
                                <span className="font-medium text-zinc-800 max-w-28 truncate group-hover:text-indigo-600 transition-colors">
                                    {user?.fullName || "Profile"}
                                </span>
                                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center text-xs uppercase shadow-xs">
                                    {user?.fullName ? user.fullName[0] : <i className="ri-user-line"></i>}
                                </div>
                            </Link>
                        ) : (
                            <NavLink
                                to="/login"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] shadow-xs hover:shadow-md transition-all duration-200"
                            >
                                <i className="ri-login-box-line text-base"></i>
                                <span>Sign In</span>
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Hamburger / Cart Button */}
                    <div className="flex md:hidden items-center gap-2">
                        {user && !user?.isAdmin && (
                            <NavLink
                                to="/cart"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 transition-colors"
                                aria-label="Cart"
                            >
                                <i className="ri-shopping-cart-2-line text-xl"></i>
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                        {cartCount}
                                    </span>
                                )}
                            </NavLink>
                        )}

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 focus:outline-none transition-colors cursor-pointer"
                            aria-label="Toggle navigation menu"
                        >
                            <i className={isMobileMenuOpen ? "ri-close-line text-2xl" : "ri-menu-4-line text-2xl"}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-zinc-200/80 bg-white/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-1.5 shadow-lg animate-in slide-in-from-top duration-200">
                    <NavLink
                        to="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={mobileNavLinkClass}
                    >
                        <div className="flex items-center gap-3">
                            <i className="ri-home-4-line text-lg text-zinc-500"></i>
                            <span>Home</span>
                        </div>
                        <i className="ri-arrow-right-s-line text-zinc-400"></i>
                    </NavLink>

                    {user ? (
                        <>
                            {user?.isAdmin ? (
                                <NavLink
                                    to="/admin/create-product"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={mobileNavLinkClass}
                                >
                                    <div className="flex items-center gap-3">
                                        <i className="ri-add-circle-line text-lg text-indigo-600"></i>
                                        <span>Create Product</span>
                                    </div>
                                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                                        Admin
                                    </span>
                                </NavLink>
                            ) : (
                                <NavLink
                                    to="/cart"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={mobileNavLinkClass}
                                >
                                    <div className="flex items-center gap-3">
                                        <i className="ri-shopping-cart-2-line text-lg text-zinc-500"></i>
                                        <span>Cart</span>
                                    </div>
                                    {cartCount > 0 && (
                                        <span className="min-w-5 h-5 px-1.5 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </NavLink>
                            )}

                            <NavLink
                                to="/settings"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={mobileNavLinkClass}
                            >
                                <div className="flex items-center gap-3">
                                    <i className="ri-settings-3-line text-lg text-zinc-500"></i>
                                    <span>Settings</span>
                                </div>
                                <i className="ri-arrow-right-s-line text-zinc-400"></i>
                            </NavLink>

                            {/* User details strip in mobile menu -> links to /profile */}
                            <Link
                                to="/profile"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="pt-3 mt-2 border-t border-zinc-100 flex items-center justify-between px-3 py-2 rounded-xl hover:bg-zinc-50 transition-colors"
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center text-xs uppercase">
                                        {user?.fullName ? user.fullName[0] : <i className="ri-user-line"></i>}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-zinc-800 leading-tight">
                                            {user?.fullName}
                                        </p>
                                        <p className="text-xs text-zinc-400">
                                            {user?.isAdmin ? "Administrator" : "View Profile"}
                                        </p>
                                    </div>
                                </div>
                                <i className="ri-arrow-right-s-line text-zinc-400 text-lg"></i>
                            </Link>
                        </>
                    ) : (
                        <div className="pt-3 mt-2 border-t border-zinc-100">
                            <NavLink
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
                            >
                                <i className="ri-login-box-line text-base"></i>
                                <span>Sign In</span>
                            </NavLink>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default memo(Navbar);
