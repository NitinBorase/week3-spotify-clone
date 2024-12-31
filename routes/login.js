import { Icon } from "@iconify/react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { makeUnauthenticatePOSTRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/PasswordInput";
import { Link } from "react-router-dom";

const LoginComponent = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const login = async () => {
            const data = {email, password};
            const response = makeUnauthenticatePOSTRequest("/auth/login", data);
            if(response && !response.err){
                console.log(response);
                const token = response.token;
                const date = new Date();
                date.setDate(date.getDate() + 30);
                setCookie("token", token, {path: "/", expires: date});
                alert("Sucessfully logged in");
                navigate("/home");
            }else{
                alert("Failed to log in");
            }
        };

    return <div className="w-full h-full flex flex-col items-center">
        <div className="logo p-10 border-b border-solid border-gray-400 w-full flex justify-center">
            <Icon icon="logos:spotify" width="165" />
        </div>
        <div className="inputRegion w-1/5 py-10 flex items-center flex-col">
            <div className="font-bold mb-10">Login to Spotify</div>
            <TextInput label="Email ID or Username" placeholder="Email ID or Username" className="my-5" value={email} setValue={setEmail} />
            <PasswordInput label="Password" placeholder="Password" value={password} setValue={setPassword} />
            <div className="w-full flex items-center justify-end my-5">
                <button className="bg-green-500 font-semibold text-white rounded-md px-8 p-2"
                onClick = {(e)=>{
                    e.preventDefault();
                    login();
                }}
                >LOG IN</button>
            </div>
            <div className="w-full border border-solid border-gray-400"></div>
            <div className="my-5 font-semibold text-xl">
                Don't have an account?
            </div>
            <div className="border border-solid bg-green-500 rounded-full p-3 text-white font-bold px-10">
                <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
            </div>
        </div>
    </div>;
};

export default LoginComponent;