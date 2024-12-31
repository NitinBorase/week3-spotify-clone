import { useParams } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useEffect, useState } from "react";
import { makeauthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../../src/components/shared/SingleSongCard";

const SinglePlaylistView = () => {
    const {playlistId} = useParams();
    const [playlistDetails, setPlaylistDetails] =useState({});

    useEffect( () => {
        const getData = async () =>{
            const response = await makeauthenticatedGETRequest("/playlist/get/playlist/"+playlistId);
            setPlaylistDetails(response);
        }
        getData();
    }, []);

    return (
        <LoggedInContainer>
            { playlistDetails && playlistDetails._id && (
             <div className="content p-8 pt-5 ovrflow-y-auto text-white">
                <div className="text-2xl font-bold pb-5">{playlistDetails.name}</div>
                <div className="space-y-2 overflow-y-auto pt-5 space-y-3">
                        {playlistDetails.songs.map((items) => (
                            <SingleSongCard info={items} key={JSON.stringify(items)} playSound={() => {}} />
                        ))}
                    </div>
            </div>
            )}
        </LoggedInContainer>
    );
};

export default SinglePlaylistView;