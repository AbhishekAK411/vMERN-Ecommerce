import {Button, IconButton, Card, CardHeader, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import { useCallback, useContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast";
import api from "../Helpers/apiConfig";
import { authContext } from "../../Context/authContext";
import Form from "../HOC/Form";
import { useNavigate } from "react-router-dom";

const Get = () => {
    const [getSellerProduct, getSetSellerProduct] = useState([]);
    const [updateProduct, setUpdateProduct] = useState(false);
    const [singleProduct, setSingleProduct] = useState();
    const {state} = useContext(authContext);
    const router = useNavigate();

    const getSellerProducts = useCallback(async() => {
        try {
            const response = await api.post("/getProduct", {
                userId: state?.user?._id
            });
            console.log(response);
            const axiosResponse = response?.data;
            if(axiosResponse?.success){
                getSetSellerProduct(axiosResponse?.sellerProducts);
            }
        } catch (error) {
            toast.error(error?.response?.data.message);
        }
    }, [state]);

    useEffect(() => {
        if(state?.user?._id){
            getSellerProducts();
        }
    }, [getSellerProducts, state?.user?._id]);
    
    const updateProductState = (product) => {
        setUpdateProduct((prev) => !prev);
        setSingleProduct(product);
    }
    const deleteProduct = async(id) => {
        try {
            const response = await api.post("/deleteProduct", {
                productId: id
            });

            const axiosResponse = response?.data;
            if(axiosResponse?.success){
                toast.success(axiosResponse?.message);
                getSellerProducts();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
    const redirectToSingle = (id) => {
        router(`/single/${id}`);
    }
    return (
        <>
            <main className="w-full min-h-screen mt-20 flex items-center justify-center">
                <section className="w-[95%] min-h-screen my-5 flex flex-wrap gap-x-5 gap-y-12">
                    {getSellerProduct?.length ? (<>
                        {getSellerProduct.map((product, i) => (
                            <section key={i} className="w-[300px] h-[400px] border rounded-md">
                                <Card className="h-full">
                                    <CardHeader color="blue-gray" className="h-56">
                                        <img className="w-full h-full object-cover" src={product.products_image} alt="" />
                                    </CardHeader>
                                    <CardBody>
                                        <Typography variant="h6">{product.products_name}</Typography>
                                        <Typography variant="paragraph"> ₹ {product.products_price}</Typography>
                                    </CardBody>
                                    <CardFooter className="flex">
                                        <Button onClick={() => redirectToSingle(product._id)}>Learn More</Button>
                                        <IconButton onClick={() => updateProductState(product)} color="green" className="ml-8 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fffafa" viewBox="0 0 256 256"><path d="M221.66,90.34,192,120,136,64l29.66-29.66a8,8,0,0,1,11.31,0L221.66,79A8,8,0,0,1,221.66,90.34Z" opacity="0.2"></path><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path></svg></IconButton>
                                        <IconButton onClick={() => deleteProduct(product._id)} color="red" className="ml-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fffafa" viewBox="0 0 256 256"><path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56Z" opacity="0.2"></path><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg></IconButton>
                                    </CardFooter>
                                </Card>
                            </section>
                        ))}
                    </>) : (<><p className="text-center">No Products Found</p></>)}
                </section>
                {updateProduct && <Form onUpdateToggle={updateProductState} product={singleProduct} triggerUpdate={getSellerProducts} />}
            </main>
        </>
    )
}

export default Get;