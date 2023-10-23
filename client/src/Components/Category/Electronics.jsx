import {Card, CardHeader, CardBody, CardFooter, Button, Typography} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import api from "../Helpers/apiConfig";
import {useNavigate} from "react-router-dom";
import { authContext } from "../../Context/authContext";

const Electronics = () => {

    const [defaultProduct, setDefaultProduct] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const {state} = useContext(authContext);
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

    useEffect(() => {
        if(state?.searchData === ''){
            setFilteredProduct(defaultProduct);
        }else{
            let lowercasesearch = state?.searchData.toLowerCase();
            const filter = defaultProduct.filter((product) => product.products_name.toLowerCase().includes(lowercasesearch));
            setFilteredProduct(filter);
        }
    }, [state?.searchData, defaultProduct]);

    const redirectToSingle = (id) => {
        router(`/single/${id}`);
    }
    return (
        <>
            <main className="w-full min-h-screen mt-24 flex items-center justify-center">
                <section className="w-[95%] min-h-screen my-5 flex flex-wrap gap-x-10 gap-y-12">
                    {filteredProduct?.length ? (<>
                        {filteredProduct.filter(product => product.products_category === 'electronics').map((product, i) => (
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
                    </>) : (<><p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Loading...</p></>)}
                </section>
            </main>
        </>
    )
}

export default Electronics;