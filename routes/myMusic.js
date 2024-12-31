import {Howl, Howler} from 'howler';
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeauthenticatedGETRequest } from "../utils/serverHelpers";
import { useState , useEffect } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";

const UploadSongComponent = () => {
    const [songdata, setSongData] = useState([]);
    const [soundPlayed, setSoundPlayed] = useState(null);

    const playSound = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true
        });
        setSoundPlayed(sound);
        sound.play();
    };

    useEffect(() => {
        const getData = async () => {
            const response = await makeauthenticatedGETRequest("/song/get/mysongs");
            console.log(response.data);
            setSongData(response.data);
        };
        getData();
    }, []);

    return (
        <LoggedInContainer>
             <div className="content p-8 pt-5 ovrflow-y-auto text-white">
                    <div className="text-2xl font-bold pb-5">My Songs</div>
                    <div className="space-y-2 overflow-y-auto">
                            {songdata.map((items) => (
                            <SingleSongCard info={items} playSound={playSound} />
                        ))}
                    </div>
                </div>
        </LoggedInContainer>
    );
};

export default UploadSongComponent;