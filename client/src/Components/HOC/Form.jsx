import {Input, Button} from "@material-tailwind/react";
import { useContext, useState } from "react";
import {motion} from "framer-motion";
import { toast } from "react-hot-toast";
import api from "../Helpers/apiConfig";
import { authContext } from "../../Context/authContext";

const Form = ({onUpdateToggle, product, triggerUpdate}) => {

    const {state} = useContext(authContext);
    const [productState, setProductState] = useState({
        products_name: product.products_name, 
        products_category: product.products_category,
        products_image: product.products_image,
        products_description: product.products_description,
        products_price: product.products_price,
        products_brand: product.products_brand,
        products_size: product.products_size,
        products_color: product.products_color,
    });
    const handleChange = (e) => {
        setProductState({...productState, [e.target.name]: e.target.value});
    }
    const handleUpdateProduct = async(e)=> {
        try {
            const response = await api.post("/updateProduct", {
                userId: state?.user?._id,
                productId: product._id,
                products_name: productState.products_name,
                products_category: productState.products_category,
                products_image: productState.products_image,
                products_description: productState.products_description,
                products_price: productState.products_price,
                products_brand: productState.products_brand,
                products_size: productState.products_size,
                products_color: productState.products_color
            });
            const axiosResponse = response?.data;
            if(axiosResponse?.success){
                toast.success(axiosResponse?.message);
                onUpdateToggle();
                triggerUpdate();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
    const FormVariants = {
        initial: {
            scale: 0,
        },
        animate: {
            scale: 1,
        }
    }
    const transition = {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5
    }
    return (
        <>
            <motion.section variants={FormVariants} initial="initial" animate="animate" transition={transition} className="absolute backdrop-blur-sm w-full h-screen flex items-center justify-center">
                <section className="shadow-shadow1 rounded w-[25%] h-[95%] border flex flex-col items-center justify-center">
                    <section className="w-[80%] h-[70%] flex flex-col gap-y-5">
                        <section className="relative"><svg onClick={onUpdateToggle} className="absolute right-[-10px] cursor-pointer bottom-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg></section>
                        <Input onChange={handleChange} name="products_name" label={product.products_name} />
                        <Input onChange={handleChange} name="products_category" label={product.products_category} />
                        <Input onChange={handleChange} name="products_description" label={product.products_description} />
                        <Input onChange={handleChange} name="products_price" label={product.products_price} />
                        <Input onChange={handleChange} name="products_brand" label={product.products_brand} />
                        <Input onChange={handleChange} name="products_image" label="New Image" />
                        <Input onChange={handleChange} name="products_size" label={product.products_size} />
                        <Input onChange={handleChange} name="products_color" label={product.products_color} />
                        <Button className="rounded" onClick={handleUpdateProduct}>Update Product</Button>
                    </section>
                </section>
            </motion.section>
        </>
    )
}

export default Form;