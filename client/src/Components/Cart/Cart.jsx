import {Button, IconButton} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../Context/authContext";
import api from "../Helpers/apiConfig";
import { toast } from "react-hot-toast";

const Cart = () => {

    const [cartProduct, setCartProduct] = useState([]);
    const [sum, setSum] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const {state} = useContext(authContext);
    useEffect(() => {
        const getCartProducts = async() => {
            try {
                const response = await api.post("/getCart", {
                    userId: state?.user?._id
                });
                const axiosResponse = response?.data;
                if(axiosResponse?.success){
                    setCartProduct(axiosResponse?.array1);
                }
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        }

        getCartProducts();
    }, [state?.user?._id]);

    useEffect(() => {
        if(cartProduct?.length > 0){
            async function calculatePrice(){
                let total = 0;
                let finalQty = 0;
                for (const item of cartProduct) {
                    const productPrice = item.product[0].products_price;
                    const quantity = item.qty;
                    const itemTotalPrice = productPrice * quantity;
                    total += itemTotalPrice;
                    const totalQty = item.qty;
                    finalQty += totalQty;
                }
                setSum(total);
                setQuantity(finalQty);
            }
            calculatePrice();
        }
    }, [cartProduct]);

    const checkout = async() => {
        try {
            const response = await api.post("/removeCart", {
                userId: state?.user?._id,
                products: cartProduct
            });

            const axiosResponse = response?.data;
            if(axiosResponse?.success){
                toast.success(axiosResponse?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data.message);
        }
    }
    return (
        <>
            <main className="w-full mt-28 min-h-screen flex items-center justify-center">
                <section className=" w-[90%] min-h-screen flex justify-evenly">
                    <section className="w-[70%] min-h-screen flex items-center justify-center">
                        <section className="w-[95%] min-h-screen flex flex-col gap-y-5">
                            {cartProduct?.length ? (<>
                                {cartProduct?.map((e,i) => (
                                    <section className="w-full h-[250px] border shadow-md flex justify-evenly">
                                        <section className="w-[20%] h-full overflow-hidden rounded-md">
                                            <img className="w-full h-full" src={e.product[0].products_image} alt="" />
                                        </section>
                                        <section className="w-[50%] h-full pt-5 pl-5">
                                            <p className="font-bold text-2xl">{e.product[0].products_name}</p>
                                            <p className="font-semibold text-xl mt-10">₹ {e.product[0].products_price}/-</p>
                                            <p className="font-semibold text-xl">{e.product[0].products_category}</p>
                                            <Button className="mt-3">Remove</Button>
                                        </section>
                                        <section className="w-[15%] h-full flex items-center justify-between">
                                            <IconButton className="rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f0f0f0" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path></svg></IconButton>
                                            <p>{e.qty}</p>
                                            <IconButton className="rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f0f0f0" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg></IconButton>
                                        </section>
                                    </section>
                                ))}
                            </>) : (<><p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Your cart is empty.</p></>)}
                        </section>
                    </section>
                    <section className="sticky w-[25%] min-h-screen flex">
                        <section className="w-[95%] h-[350px] rounded pt-10 border shadow-md flex flex-col items-center">
                            <u><p className="text-2xl">Cart</p></u>
                            <section className="w-[90%] mt-10 flex justify-between">
                                <p>Total Products</p>
                                <p>{quantity}<span className="text-white">--</span></p>
                            </section>
                            <section className="w-[90%] flex justify-between">
                                <p>Product Cost</p>
                                <p>₹ {sum}/-</p>
                            </section>
                            <section className="w-[90%] flex justify-between mt-10 border border-t-gray-500 border-dashed">
                                <p>Total Price</p>
                                <p>₹ {sum}/-</p>
                            </section>
                            <Button onClick={checkout} className="mt-10" color="pink">Checkout</Button>
                        </section>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Cart;