import {motion} from "framer-motion";
import { toast } from "react-hot-toast";
import api from "../Helpers/apiConfig";
import { useContext, useState } from "react";
import { authContext } from "../../Context/authContext";
import {Input, Button} from "@material-tailwind/react";

const Add = () => {
    const {state} = useContext(authContext);
    const [productData, setProductData] = useState({
        products_name: "",
        products_category: "",
        products_description: "",
        products_price: 0,
        products_brand: "",
        products_image: "",
        products_size: "",
        products_color: ""
    });

    const handleChange = (e) => {
        setProductData({...productData, [e.target.name]: e.target.value});
    }
    const handleAddProduct = async() => {
        try {
            const response = await api.post("/addProduct", {
                userId: state?.user?._id,
                products_name: productData.products_name,
                products_category: productData.products_category,
                products_description: productData.products_description,
                products_price: productData.products_price,
                products_brand: productData.products_brand,
                products_image: productData.products_image,
                products_size: productData.products_size,
                products_color: productData.products_color
            });

            const axiosResponse = response?.data;
            if(axiosResponse?.success){
                toast.success(axiosResponse?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
    const AddVariants = {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1
        }
    }

    const transition= {
        type: 'spring',
        stiffness: 260,
        damping: 30,
        delay: 0.5
    }
    return (
        <>
            <motion.section variants={AddVariants} initial="initial" animate="animate" transition={transition} className="w-full h-screen flex items-center justify-center">
                <section className="shadow-shadow1 rounded w-[25%] h-[85%] border flex flex-col items-center justify-center">
                    <section className="w-[80%] h-[70%] flex flex-col gap-y-5">
                        <Input onChange={handleChange} name="products_name" label="Product Name" />
                        <Input onChange={handleChange} name="products_category" label="Product Category" />
                        <Input onChange={handleChange} name="products_description" label="Product Description" />
                        <Input onChange={handleChange} name="products_price" label="Product Price" />
                        <Input onChange={handleChange} name="products_brand" label="Product Brand" />
                        <Input onChange={handleChange} name="products_image" label="Product Image" />
                        <Input onChange={handleChange} name="products_size" label="Product Size" />
                        <Input onChange={handleChange} name="products_color" label="Product Color" />
                        <Button className="rounded" onClick={handleAddProduct}>Add Product</Button>
                    </section>
                </section>
            </motion.section>
        </>
    )
}

export default Add;