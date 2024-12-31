import { useState } from "react";
import TextInput from "../components/shared/TextInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import {makeauthenticatedPOSTRequest} from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";

const focusCardData = [{title:"Focus",description:"Music to help you concentrate.",imageurl:"https://static.vecteezy.com/system/resources/thumbnails/047/918/672/small_2x/music-abstract-with-headphones-horizontal-wallpaper-photo.jpg"},
    {title:"Focus",description:"Music to help you concentrate.",imageurl:"https://static.vecteezy.com/system/resources/thumbnails/047/918/672/small_2x/music-abstract-with-headphones-horizontal-wallpaper-photo.jpg"},
    {title:"Focus",description:"Music to help you concentrate.",imageurl:"https://static.vecteezy.com/system/resources/thumbnails/047/918/672/small_2x/music-abstract-with-headphones-horizontal-wallpaper-photo.jpg"},
    {title:"Focus",description:"Music to help you concentrate.",imageurl:"https://static.vecteezy.com/system/resources/thumbnails/047/918/672/small_2x/music-abstract-with-headphones-horizontal-wallpaper-photo.jpg"},
    {title:"Focus",description:"Music to help you concentrate.",imageurl:"https://static.vecteezy.com/system/resources/thumbnails/047/918/672/small_2x/music-abstract-with-headphones-horizontal-wallpaper-photo.jpg"},
];

const UploadSongComponent = () => {
    const [name,setname] = useState("");
    const [thumbnail,setthumbnail] = useState("");
    const [playlistUrl,setplaylistUrl] = useState("");
    const [uploadedSongName,setUploadedSongName] = useState("");
    const navigate = useNavigate();

    const sumbitSong = async () => {
        const data = {name, thumbnail, track:playlistUrl};
        const response = await makeauthenticatedPOSTRequest("/song/create",data);
        console.log(response);
        if(response.err){
            alert("Failed to upload song");
        }
        alert("Song uploaded successfully");
        navigate("/home");
    }

    return (
        <LoggedInContainer>
            <div className="content p-8 pt-0 ovrflow-y-auto text-white">
                    <div className="text-2xl font-bold mb-5 mt-8">
                        Upload Your Music Here
                    </div>
                    <div className="w-full flex space-x-5 text-black">
                        <TextInput label="Song Name" placeholder="Enter Song Name" value={name} setValue={setname}/>
                        <TextInput label="Thumbnail" placeholder="Enter Thumbnail " value={thumbnail} setValue={setthumbnail}/>
                    </div>
                    <div className="py-5">
                        {
                            uploadedSongName ? (
                                <div className="rounded-md text-white text-lg font-semibold w-1/3">
                                {uploadedSongName.substring(0,26)}...
                            </div> 
                             ) :(
                                <CloudinaryUpload setUrl={setplaylistUrl} setName={setUploadedSongName}/>
                             )
                        }
                    </div>
                    <div className="bg-green-500 flex item-center justify-center font-semibold text-white rounded-md p-2 w-32 cursor-pointer"
                        onClick={sumbitSong}>
                        Sumbit Song
                    </div>
                </div>
        </LoggedInContainer>
    );
};

export default UploadSongComponent;