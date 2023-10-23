import { IconButton, Tooltip, Badge } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { authContext } from "../../Context/authContext";
import {toast} from "react-hot-toast";
import api from "../Helpers/apiConfig";
import { useNavigate } from "react-router-dom";

const Navigation = () => {

    const {state, logout, setSearchData} = useContext(authContext);
    const [search, setSearch] = useState(false);
    
    const router = useNavigate();
    const username = state?.user?.username;
    const role = state?.user?.role;

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully.");
        router("/");
    }
    const becomeASellerFunction = async() => {
        try {
            const response = await api.post("/becomeSeller", {
                userId: state?.user?._id
            });

            const axiosResponse = response?.data;
            if(axiosResponse?.success){
                toast.success(axiosResponse?.message);
                window.location.reload();
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    const redirectToSellerProducts = () => {
        router("/sellerproducts");
    }
    const redirectToAddProduct = () => {
        router("/addProducts");
    }
    const redirectToEditProducts = () => {
        router("/editProducts");
    }
    const redirectToCart = () => {
        router("/cart");
    }
    const searchState = () => {
        setSearch((prev) => !(prev));
    }
    const handleChange = (e) => {
        setSearchData(e.target.value);
    }
    const redirectToNewest = () => {
        router("/newest");
    }
    const animate = {
        mount: {
            scale: 1,
            x: 0
        },
        unmount: {
            scale: 0,
            x: 25
        }
    }
    const transition = {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.8
    }
    const buttonVariants = {
        initial: { 
            scale: 0
        },
        animate: { 
            rotate: 360,
            scale: 1,
        },
    };
    return (
        <>
            {search && <section className="w-[200px] h-[50px] absolute right-40 top-5 z-50 flex items-center justify-center"><input onChange={handleChange} className="border rounded p-5 h-[40px]" type="text" placeholder="search" /></section>}
            <motion.section initial={{x: 180}} animate={{x: 0}} transition={{delay: 1}} className="select-none w-[4%] h-[350px] border fixed right-5 top-52 backdrop-blur-md z-50 rounded-full shadow-2xl flex flex-col items-center justify-evenly">
                <motion.div variants={buttonVariants} initial="initial" animate="animate" transition={transition}>
                    <Tooltip content="Search" className="bg-gray-900 rounded-full text-white ml-[-10px]" placement="left" animate={animate}>
                        <IconButton onClick={searchState} className="rounded-full text-[#800000] text-base" variant="text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ad1f1f" viewBox="0 0 256 256"><path d="M192,112a80,80,0,1,1-80-80A80,80,0,0,1,192,112Z" opacity="0.2"></path><path d="M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
                        </IconButton>
                    </Tooltip>
                </motion.div>
                {role === 'Seller' ? (<>
                    <motion.div variants={buttonVariants} initial="initial" animate="animate" transition={transition}>
                        <Tooltip content="Add Products" className="bg-gray-900 rounded-full text-white ml-[-10px]" placement="left" animate={animate}>
                            <IconButton onClick={redirectToAddProduct} className="rounded-full text-[#800000] text-base" variant="text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ad1f1f" viewBox="0 0 256 256"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"></path><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path></svg>
                            </IconButton>
                        </Tooltip>
                    </motion.div>
                </>) : (<>
                    <motion.div variants={buttonVariants} initial="initial" animate="animate" transition={transition}>
                        <Tooltip content="Become a Seller" className="bg-gray-900 rounded-full text-white ml-[-10px]" placement="left" animate={animate}>
                            <IconButton onClick={becomeASellerFunction} className="rounded-full text-[#800000] text-base" variant="text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ad1f1f" viewBox="0 0 256 256"><path d="M240,132c0,19.88-35.82,36-80,36-19.6,0-37.56-3.17-51.47-8.44h0C146.76,156.85,176,142,176,124V96.72h0C212.52,100.06,240,114.58,240,132ZM176,84c0-19.88-35.82-36-80-36S16,64.12,16,84s35.82,36,80,36S176,103.88,176,84Z" opacity="0.2"></path><path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path></svg>
                            </IconButton>
                        </Tooltip>
                    </motion.div>
                </>)}
                {username ? (<>
                    {role === 'Seller' ? (<>
                        <motion.div variants={buttonVariants} initial="initial" animate="animate" transition={transition}>
                            <Tooltip content="Your Products" className="bg-gray-900 rounded-full text-white ml-[-10px]" placement="left" animate={animate}>
                                <IconButton onClick={redirectToSellerProducts} className="rounded-full text-[#800000] text-base" variant="text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ad1f1f" viewBox="0 0 256 256"><path d="M216,48V208a8,8,0,0,1-8,8H64L40,192V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z" opacity="0.2"></path><path d="M224,48V208a16,16,0,0,1-16,16H136a8,8,0,0,1,0-16h72V48H48v96a8,8,0,0,1-16,0V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM125.66,154.34a8,8,0,0,0-11.32,0L64,204.69,45.66,186.34a8,8,0,0,0-11.32,11.32l24,24a8,8,0,0,0,11.32,0l56-56A8,8,0,0,0,125.66,154.34Z"></path></svg>
                                </IconButton>
                            </Tooltip>
                        </motion.div>
                    </>) : (<>
                        <motion.div variants={buttonVariants} initial="initial" animate="animate" transition={transition}>
                            <Tooltip content="Cart" className="bg-gray-900 rounded-full text-white ml-[-10px]" placement="left" animate={animate}>
                                <IconButton onClick={redirectToCart} className="rounded-full text-[#800000] text-base" variant="text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ad1f1f" viewBox="0 0 256 256"><path d="M216,64l-12.16,66.86A16,16,0,0,1,188.1,144H62.55L48,64Z" opacity="0.2"></path><path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path></svg>
                                </IconButton>
                            </Tooltip>
                        </motion.div>
                    </>)}
                </>) : (<>
                    <motion.div variants={buttonVariants} initial="initial" animate="animate" transition={transition}>
                        <Tooltip content="Advertise" className="bg-gray-900 rounded-full text-white ml-[-10px]" placement="left" animate={animate}>
                            <IconButton className="rounded-full text-[#800000] text-base" variant="text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ad1f1f" viewBox="0 0 256 256"><path d="M160,128a32,32,0,1,1-32-32A32,32,0,0,1,160,128Z" opacity="0.2"></path><path d="M128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,152Zm73.71,7.14a80,80,0,0,1-14.08,22.2,8,8,0,0,1-11.92-10.67,63.95,63.95,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67,80.08,80.08,0,0,1,14.08,84.47ZM69,103.09a64,64,0,0,0,11.26,67.58,8,8,0,0,1-11.92,10.67,79.93,79.93,0,0,1,0-106.67A8,8,0,1,1,80.29,85.34,63.77,63.77,0,0,0,69,103.09ZM248,128a119.58,119.58,0,0,1-34.29,84,8,8,0,1,1-11.42-11.2,103.9,103.9,0,0,0,0-145.56A8,8,0,1,1,213.71,44,119.58,119.58,0,0,1,248,128ZM53.71,200.78A8,8,0,1,1,42.29,212a119.87,119.87,0,0,1,0-168,8,8,0,1,1,11.42,11.2,103.9,103.9,0,0,0,0,145.56Z"></path></svg>
                            </IconButton>
                        </Tooltip>
                    </motion.div>
                </>)}
                {role === 'Seller' ? (<>
                    <motion.div variants={buttonVariants} initial="initial" animate="animate" transition={transition}>
                        <Tooltip  content="Edit Products" className="bg-gray-900 rounded-full text-white ml-[-10px]" placement="left" animate={animate}>
                            <IconButton onClick={redirectToEditProducts} className="rounded-full text-[#800000] text-base" variant="text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ad1f1f" viewBox="0 0 256 256"><path d="M120,56,60.32,78.38a8,8,0,0,0-5.08,6.17L32,224l139.45-23.24a8,8,0,0,0,6.17-5.08L200,136Zm-4,104a20,20,0,1,1,20-20A20,20,0,0,1,116,160Z" opacity="0.2"></path><path d="M240,100.68a15.86,15.86,0,0,0-4.69-11.31L166.63,20.68a16,16,0,0,0-22.63,0L115.57,49.11l-58,21.77A16.06,16.06,0,0,0,47.35,83.23L24.11,222.68A8,8,0,0,0,32,232a8.4,8.4,0,0,0,1.32-.11l139.44-23.24a16,16,0,0,0,12.35-10.17l21.77-58L235.31,112A15.87,15.87,0,0,0,240,100.68Zm-69.87,92.19L55.32,212l47.37-47.37a28,28,0,1,0-11.32-11.32L44,200.7,63.13,85.86,118,65.29,190.7,138ZM104,140a12,12,0,1,1,12,12A12,12,0,0,1,104,140Zm96-15.32L131.31,56l24-24L224,100.68Z"></path></svg>
                            </IconButton>
                        </Tooltip>
                    </motion.div>
                </>) : (<>
                    <motion.div variants={buttonVariants} initial="initial" animate="animate" transition={transition}>
                        <Tooltip content="Newest" className="bg-gray-900 rounded-full text-white ml-[-10px]" placement="left" animate={animate}>
                            <IconButton onClick={redirectToNewest} className="rounded-full text-[#800000] text-base" variant="text">
                                <Badge className="text-[0.50rem] w-[0.125rem] h-[0.125rem] flex items-center justify-center" content="new"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ad1f1f" viewBox="0 0 256 256"><path d="M184.13,147.7a8.08,8.08,0,0,0-2.54,7.89l13.52,58.54a8,8,0,0,1-11.89,8.69l-51.1-31a7.93,7.93,0,0,0-8.24,0l-51.1,31a8,8,0,0,1-11.89-8.69l13.52-58.54a8.08,8.08,0,0,0-2.54-7.89L26.76,108.35A8,8,0,0,1,31.3,94.28l59.46-5.14a8,8,0,0,0,6.67-4.88L120.66,28.9a8,8,0,0,1,14.68,0l23.23,55.36a8,8,0,0,0,6.67,4.88l59.46,5.14a8,8,0,0,1,4.54,14.07Z" opacity="0.2"></path><path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path></svg></Badge>
                            </IconButton>
                        </Tooltip>
                    </motion.div>
                </>)}
                {username ? (<><motion.div onClick={handleLogout} variants={buttonVariants} initial="initial" animate="animate" transition={transition}>
                    <Tooltip content="Logout" className="bg-gray-900 rounded-full text-white ml-[-10px]" placement="left" animate={animate}>
                        <IconButton className="rounded-full text-[#800000] text-base" variant="text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ad1f1f" viewBox="0 0 256 256"><path d="M216,128l-40,40V88Z" opacity="0.2"></path><path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-82.34-40,40A8,8,0,0,1,168,168V136H104a8,8,0,0,1,0-16h64V88a8,8,0,0,1,13.66-5.66l40,40A8,8,0,0,1,221.66,133.66Zm-17-5.66L184,107.31v41.38Z"></path></svg>
                        </IconButton>
                    </Tooltip>
                </motion.div></>) :
                (<>
                    <motion.div variants={buttonVariants} initial="initial" animate="animate" transition={transition}>
                    <Tooltip content="Download App" className="bg-gray-900 rounded-full text-white ml-[-10px]" placement="left" animate={animate}>
                        <IconButton className="rounded-full text-[#800000] text-base" variant="text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ad1f1f" viewBox="0 0 256 256"><path d="M232,168v24a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V169.13C24,111.65,70.15,64.2,127.63,64A104,104,0,0,1,232,168Z" opacity="0.2"></path><path d="M176,156a12,12,0,1,1-12-12A12,12,0,0,1,176,156ZM92,144a12,12,0,1,0,12,12A12,12,0,0,0,92,144Zm148,24v24a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V169.13A113.38,113.38,0,0,1,51.4,86.72L26.34,61.66A8,8,0,0,1,37.66,50.34L63.82,76.5a111.4,111.4,0,0,1,128.55-.18l26-26a8,8,0,0,1,11.32,11.32L204.82,86.5c.75.71,1.5,1.43,2.24,2.17A111.25,111.25,0,0,1,240,168Zm-16,0a96,96,0,0,0-96-96h-.34C74.91,72.18,32,115.75,32,169.13V192H224Z"></path></svg>
                        </IconButton>
                    </Tooltip>
                </motion.div>
                </>)}
            </motion.section>
        </>
    )
}

export default Navigation;