import { Routes, Route } from 'react-router-dom';
import Products from '../pages/Products';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreateProduct from '../pages/admin/CreateProduct';
import ProductDetails from '../pages/admin/ProductDetails';
import UserProfile from '../pages/user/UserProfile';
import PageNotFound from '../pages/PageNotFound';
import Cart from '../pages/Cart';
import AuthWrapper from './AuthWrapper';
import UnauthWrapper from './UnauthWrapper';
import RoleWrapper from './RoleWrapper';
import { useSelector } from 'react-redux';

const MainRoutes = () => {
    const user = useSelector((state) => state.userReducer.user);
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