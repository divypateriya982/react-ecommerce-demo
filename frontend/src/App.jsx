import { useEffect } from 'react';
import MainRoutes from './routes/MainRoutes';
import Navbar from './components/Navbar';
import { asyncCurrentUser } from './store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLoadProduct } from './store/actions/productActions';
import { asyncLoadCart } from './store/actions/cartActions';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const { currentPage } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(asyncCurrentUser());
  }, []);
  
  useEffect(() => {
    dispatch(asyncLoadCart());
  }, [user]);

  useEffect(() => {
    dispatch(asyncLoadProduct(currentPage));
  }, [currentPage])

  return (
    <>
      <Navbar />
      <MainRoutes />
    </>
  )
}

export default App