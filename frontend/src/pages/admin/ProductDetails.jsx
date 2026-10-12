import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import UpdateProductFormTemplate from "../../components/UpdateProductFormTemplate";
import ProductDetailsTemplate from "../../components/ProductDetailsTemplate";

const ProductDetails = () => {
    console.log('ProductDetails rendering...');

    const { id } = useParams();
    const user = useSelector((state) => state.userReducer.user);
    const [product, setProduct] = useState(null);
    const fetchProduct = async () => {
        const { data } = await axios.get(`/products/${id}`);
        setProduct(data);
    }
    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        user && product && (
            <div className="min-h-screen bg-[#ECEDBF] pt-25 px-6 pb-6 space-y-6">
                <ProductDetailsTemplate product={product} id={id} user={user} />
                {user?.isAdmin && <>
                    <hr className="border" />
                    <UpdateProductFormTemplate product={product} id={id} />
                </>}
            </div>
        )
    )
}

export default ProductDetails