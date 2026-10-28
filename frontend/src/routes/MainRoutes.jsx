import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, memo } from "react";
import AuthWrapper from "./AuthWrapper";
import UnauthWrapper from "./UnauthWrapper";
import RoleWrapper from "./RoleWrapper";

const Products = lazy(() => import("../pages/Products"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const ProductDetails = lazy(() => import("../pages/admin/ProductDetails"));
const UpdateProduct = lazy(() => import("../pages/admin/UpdateProduct"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const Cart = lazy(() => import("../pages/Cart"));

const MainRoutes = () => {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        <p className="text-sm font-medium text-zinc-500">Loading...</p>
                    </div>
                </div>
            }
        >
            <Routes>
                <Route path="/" element={<Products />} />

                <Route path="/login" element={<UnauthWrapper><Login /></UnauthWrapper>} />
                <Route path="/register" element={<UnauthWrapper><Register /></UnauthWrapper>} />

                <Route path="/settings" element={<AuthWrapper><UserProfile /></AuthWrapper>} />
                <Route path="/admin/create-product" element={<RoleWrapper role="admin"><CreateProduct /></RoleWrapper>} />
                <Route path="/admin/update-product/:id" element={<RoleWrapper role="admin"><UpdateProduct /></RoleWrapper>} />
                <Route path="/product/:id" element={<AuthWrapper><ProductDetails /></AuthWrapper>} />
                <Route path="/cart" element={<RoleWrapper role="customer"><Cart /></RoleWrapper>} />

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    );
};

export default memo(MainRoutes);
