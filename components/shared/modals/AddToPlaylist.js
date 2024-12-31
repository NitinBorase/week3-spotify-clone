import { useState, useEffect } from "react";
import { makeauthenticatedGETRequest } from "../../../utils/serverHelpers";

const AddToPlaylist = ({closeModel, addSongToPlaylist}) => {
    const [playlistData, setplaylistData] = useState([]);
    
    useEffect(() => {
            const getData = async () => {
                const response = await makeauthenticatedGETRequest("/playlist/get/me");
                console.log(response.data);
                setplaylistData(response.data);
            };
            getData();
    }, []);

    return (
        <div className="absolute bg-black w-screen h-screen bg-opacity-30 flex justify-center items-center" 
        onClick={closeModel}>
            <div className="bg-green-500 w-1/3 rounded-md p-4" onClick={(e) => e.stopPropagation()}>
                <div className="text-xl font-bold pb-2 text-white">
                    Select Playlist
                </div>
                <div className="space-y-2 flex flex-col justify-center items-center">
                {playlistData.map((items) => (
                        <PlaylistComponent key={JSON.stringify(items)} 
                        info={items}
                        addSongToPlaylist={addSongToPlaylist}
                        />))}
                </div>
            </div>
        </div>
    );
};

const PlaylistComponent = ({info, addSongToPlaylist}) => {
    return <div className="bg-green-500 w-full flex justify-start items-center space-x-2 p-1 cursor-pointer hover:bg-gray-800"
    onClick={ () => addSongToPlaylist(info._id)}>
        <div>
            <img src={info.thumbnail} className="h-12 w-12 rounded"/>
        </div>
        <div className="text-white text-lg font-semibold">
            <div>{info.name}</div>
        </div>
    </div>
};

export default AddToPlaylist;