import { useContext } from "react";
import Navbar from "../Global/Navbar";
import { authContext } from "../../Context/authContext";

const Home = () => {
    const {state} = useContext(authContext);

    console.log(state);
    return (
        <>
            <Navbar />
            <main className="w-full min-h-screen border-black border">

            </main>
        </>
    )
}

export default Home;