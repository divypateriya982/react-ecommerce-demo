import { Routes, Route } from 'react-router-dom';
import Products from '../pages/Products';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreateProduct from '../pages/admin/CreateProduct';
import ProductDetails from '../pages/admin/ProductDetails';
import UserProfile from '../pages/user/UserProfile';
import PageNotFound from '../pages/PageNotFound';
import Cart from '../pages/Cart';
// import AuthWrapper from './AuthWrapper';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Products />} />

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* <Route path='/settings' element={<AuthWrapper><UserProfile /></AuthWrapper>} />
            <Route path='/admin/create-product' element={<AuthWrapper><CreateProduct /></AuthWrapper>} />
            <Route path='/product/:id' element={<AuthWrapper><ProductDetails /></AuthWrapper>} />
            <Route path='/cart' element={<AuthWrapper><Cart /></AuthWrapper>} /> */}
            <Route path='/settings' element={<UserProfile />} />
            <Route path='/admin/create-product' element={<CreateProduct />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />

            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default MainRoutes