import { Avatar, Input, Button } from "@material-tailwind/react";
import registerPng from "../../Resources/Images/register.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {toast} from "react-hot-toast";
import api from "../Helpers/apiConfig";

const Register = () => {
    const [userData, setUserData] = useState({username: "", email: "", contact: "", password: "", confirmPassword: ""});
    const router = useNavigate();

    const redirectToLogin = () => {
        router("/login");
    }

    const registerVariants = {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1
        }
    }

    const transition = {
        type: "spring",
        delay: 0.5,
        stiffness: 260,
        damping: 20,
    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    const handleRegisterClick = async() => {
        try {
            const response = await api.post("/register", {
                username: userData.username,
                email: userData.email,
                contact: userData.contact,
                password: userData.password,
                confirmPassword: userData.confirmPassword
            });

            const axiosResponse = response.data;
            if(axiosResponse?.success){
                toast.success(axiosResponse?.message);
                router("/login");
            }
        } catch (error) {
            toast.error("An Error Occured. Try again later.");
        }
    }
    
    return (
        <>
            <motion.section variants={registerVariants} initial="initial" animate="animate" transition={transition} className="w-full h-screen flex items-center justify-center">
                <section className="shadow-shadow1 rounded w-[25%] h-[85%] border flex flex-col items-center justify-center">
                    <Avatar src={registerPng} withBorder={true} className="p-0.5 mb-10" alt="avatar" size="xl" />
                    <section className="w-[80%] h-[70%] flex flex-col gap-y-5">
                        <Input onChange={handleChange} name="username" label="Username" />
                        <Input onChange={handleChange} name="email" label="Email" />
                        <Input onChange={handleChange} name="contact" label="Contact" />
                        <Input onChange={handleChange} name="password" label="Password" />
                        <Input onChange={handleChange} name="confirmPassword" label="ConfirmPassword" />
                        <Button className="rounded" onClick={handleRegisterClick}>Sign Up</Button>
                        <p>Already have an account? <u className="cursor-pointer" onClick={redirectToLogin}>Sign In</u></p>
                    </section>
                </section>
            </motion.section>
        </>    
    )
}

export default Register;