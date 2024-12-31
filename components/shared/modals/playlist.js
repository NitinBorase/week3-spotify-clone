import TextInput from "../TextInput";
import { useState } from "react";
import { makeauthenticatedPOSTRequest } from "../../../utils/serverHelpers";

const PlaylistComponent = ({closeModel}) => {
    const [playlistName,setplaylistName] = useState("");
    const [playlistThumbnail,setplaylistThumbnail] = useState("");

    const craetePlaylist = async () => {
        const response = await makeauthenticatedPOSTRequest(
            "/playlist/create", 
            {name: playlistName, thumbnail: playlistThumbnail, songs: [] }
        ); 
        if(response._id){
            closeModel();
        }
    };

    return (
        <div className="absolute bg-black w-screen h-screen bg-opacity-30 flex justify-center items-center" 
        onClick={closeModel}>
            <div className="bg-green-500 w-1/3 rounded-md p-4" onClick={(e) => e.stopPropagation()}>
                <div className="text-xl font-bold pb-2 text-white">
                    Create Playlist
                </div>
                <div className="space-y-2 flex flex-col justify-center items-center">
                    <TextInput label="Playlist Name" placeholder="Enter Playlist Name" value={playlistName} setValue={setplaylistName}/>
                    <TextInput label="Thumbnail" placeholder="Enter Thumbnail" value={playlistThumbnail} setValue={setplaylistThumbnail}/>
                    <div className="text-white bg-black w-1/6 rounded-md font-bold flex justify-center items-center p-1 text-md mt-5 cursor-pointer"
                        onClick={craetePlaylist}
                    >
                        Create
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistComponent;