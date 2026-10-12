import { useSelector } from "react-redux";
import ProductTemplate from "../components/ProductTemplate";
import PaginationTemplate from "../components/PaginationTemplate";

const Products = () => {
    
    const products = useSelector((state) => state.productReducer.products);
    const user = useSelector((state) => state.userReducer.user);
    const { carts } = useSelector((state) => state.cartReducer);
    
    console.log("Products rendering...");
    return (
        <>
            {products.length > 0 ? (
                <div className="min-h-screen bg-[#FEE3C8]">
                    <div className="pt-25 px-6 py-4 grid gap-6 sm:grid-cols-2 min-[430px]:max-[500px]:px-10 min-[500px]:max-[640px]:px-20 min-[500px]:max-[640px]:gap-7 sm:px-6 md:px-15 md:gap-10 lg:grid-cols-3 lg:px-8 lg:gap-5 xl:grid-cols-4 xl:px-8 xl:gap-8">
                        {products.map((product) => {
                            const cart = carts.find((cart) => cart.productId === product.id && cart.userId === user?.id);
                            return (
                                <ProductTemplate key={product.id} product={product} cart={cart} user={user} />
                            )
                        })}
                    </div>
                    <PaginationTemplate />
                </div>
            ) : (
                <div className="bg-[#FEE3C8] h-screen flex justify-center items-end">
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">No products!</p>
                    <PaginationTemplate />
                </div>
            )}

        </>
    )
}

export default Products