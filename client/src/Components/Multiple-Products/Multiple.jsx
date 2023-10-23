import {Card, CardHeader, CardBody, CardFooter, Button, Typography} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import api from "../Helpers/apiConfig";
import {useNavigate} from "react-router-dom";

const Multiple = () => {

    const [defaultProduct, setDefaultProduct] = useState([]);
    const router = useNavigate();
    useEffect(() => {
        const getDefaultProducts = async() => {
            try {
                const response = await api.get("/getDefaultProducts");

                const axiosResponse = response.data;
                if(axiosResponse?.success){
                    setDefaultProduct(axiosResponse?.products);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getDefaultProducts();
    }, []);

    const redirectToSingle = (id) => {
        router(`/single/${id}`);
    }
    return (
        <>
            <main className="w-full min-h-screen mt-24 flex items-center justify-center">
                <section className="w-[95%] min-h-screen my-5 flex flex-wrap gap-x-10 gap-y-12">
                    {defaultProduct?.length ? (<>
                        {defaultProduct.map((product, i) => (
                            <section key={i} className="w-[300px] h-[400px] border rounded-md">
                                <Card className="h-full">
                                    <CardHeader color="blue-gray" className="h-56">
                                        <img className="w-full h-full object-cover" src={product.products_image} alt="" />
                                    </CardHeader>
                                    <CardBody>
                                        <Typography variant="h6">{product.products_name}</Typography>
                                        <Typography variant="paragraph"> ₹ {product.products_price}</Typography>
                                    </CardBody>
                                    <CardFooter>
                                        <Button onClick={() =>redirectToSingle(product._id)}>Learn More</Button>
                                    </CardFooter>
                                </Card>
                            </section>
                        ))}
                    </>) : (<><p className="text-center">No Products Found</p></>)}
                </section>
            </main>
        </>
    )
}

export default Multiple;