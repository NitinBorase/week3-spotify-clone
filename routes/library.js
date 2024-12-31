import { useState, useEffect } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeauthenticatedGETRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

const Library = () => {
    const [playlistData, setplaylistData] = useState([]);

    useEffect(() => {
            const getData = async () => {
                const response = await makeauthenticatedGETRequest("/playlist/get/me");
                console.log(response.data);
                setplaylistData(response.data);
            };
            getData();
    }, []);
    
    return(
        <LoggedInContainer>
            <div className="content p-8 pt-5 ovrflow-y-auto text-white">
                <div className="text-2xl font-bold pb-5">My Playlist</div>
                <div className="overflow-x-auto grid gap-5 grid-cols-5 cursor-pointer">
                    {playlistData.map((items) => (
                        <Card key={JSON.stringify(items)} title={items.name} description="" imageurl={items.thumbnail} 
                        playlistId={items._id}/>))}
                </div>
            </div>
        </LoggedInContainer>
    );
};

const Card = ({title, description, imageurl, playlistId}) => {
    const navigate = useNavigate();
    return (
        <div className="bg-black bg-opacity-60 p-5 w-full" onClick ={() => {navigate("/playlist/"+playlistId)}}>
            <div className="py-4 rounded-md">
                <img src={imageurl} alt="Label" className="rounded-md"></img>
            </div>
            <div className="text-white font-bold py-3 text-xl">{title}</div>
            <div className="text-gray-500">{description}</div>
        </div>
    );
};

export default Library;