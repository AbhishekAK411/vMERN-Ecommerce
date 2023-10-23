import { useParams } from "react-router-dom";
import {Button} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import api from "../Helpers/apiConfig";
import {toast} from "react-hot-toast";

const Single = () => {

    const [singleProduct, setSingleProduct] = useState();
    const {id} = useParams();
    useEffect(() => {
        if(id){
            const getSingleProduct = async() => {
                try {
                    const response = await api.post("/getSingleProduct", {
                        productId: id,
                    });
                    const axiosResponse = response?.data;
                    if(axiosResponse?.success){
                        setSingleProduct(axiosResponse?.singleProduct);
                    }
                } catch (error) {
                    toast.error(error?.response?.data?.message);
                }
            }
            getSingleProduct();
        }
    }, [id]);

    console.log(singleProduct);
    return (
        <>
            <main className="w-full min-h-screen mt-28 flex items-center justify-center">
                <section className="w-[90%] flex justify-evenly min-h-screen">
                    <section className="w-[48%] min-h-screen flex justify-evenly">
                        <section className="w-[25%] h-[600px] flex items-center justify-center">
                            <section className="w-[95%] h-[95%] flex flex-col items-center justify-between">
                                <section className="w-[80%] h-[30%] rounded-xl overflow-hidden">
                                    <img className="w-full h-full" src={singleProduct?.products_image} alt="" />
                                </section>
                                <section className="w-[80%] h-[30%] rounded-xl overflow-hidden">
                                    <img className="w-full h-full" src={singleProduct?.products_image} alt="" />
                                </section>
                                <section className="w-[80%] h-[30%] rounded-xl overflow-hidden">
                                    <img className="w-full h-full" src={singleProduct?.products_image} alt="" />
                                </section>
                            </section>
                        </section>
                        <section className="w-[70%] h-[600px] flex items-center justify-center">
                            <section className="w-[95%] h-[95%] rounded-xl overflow-hidden">
                                <img className="w-full h-full" src={singleProduct?.products_image} alt="" />
                            </section>
                        </section>
                    </section>
                    <section className="w-[48%] h-[750px] pt-4">
                        <p className="font-bold text-3xl">{singleProduct?.products_name}</p>
                        <p className="font-semibold pt-2 text-xl">₹ {singleProduct?.products_price}</p>
                        <p className="font-light pt-10 text-base">{singleProduct?.products_description}</p>
                        <p className="font-light pt-5 text-base">{singleProduct?.products_category}</p>
                        <p className="font-light pt-5 text-base">{singleProduct?.products_brand}</p>
                        <p className="font-light pt-5 text-base">{singleProduct?.products_size}</p>
                        <p className="font-light pt-5 text-base">{singleProduct?.products_color}</p>
                        <Button className="w-[300px] mt-20">Add To Cart</Button>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Single;