import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Products from '../pages/Products';
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const CreateProduct = lazy(() => import('../pages/admin/CreateProduct'));
const ProductDetails = lazy(() => import('../pages/admin/ProductDetails'));
const UserProfile = lazy(() => import('../pages/user/UserProfile'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const Cart = lazy(() => import('../pages/Cart'));
const AuthWrapper = lazy(() => import('./AuthWrapper'));
const UnauthWrapper = lazy(() => import('./UnauthWrapper'));
const RoleWrapper = lazy(() => import('./RoleWrapper'));

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Products />} />

            <Route path='/login' element={<UnauthWrapper><Login /></UnauthWrapper>} />
            <Route path='/register' element={<UnauthWrapper><Register /></UnauthWrapper>} />

            <Route path='/settings' element={<AuthWrapper><UserProfile /></AuthWrapper>} />
            <Route path='/admin/create-product' element={<RoleWrapper role="admin"><CreateProduct /></RoleWrapper>} />
            <Route path='/product/:id' element={<AuthWrapper><ProductDetails /></AuthWrapper>} />
            <Route path='/cart' element={<RoleWrapper role="customer"><Cart /></RoleWrapper>} />

            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default MainRoutes