import { useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react";
import { makeauthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const SearchComponent = () => {
    const [isInput, setIsInput] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [songdata, setSongData] = useState([]);
    
    const searchSong = async () => {
        console.log(searchText);
        console.log("Request URL:", `/song/get/songname/${searchText}`);
        const response = await makeauthenticatedGETRequest(`/song/get/songname/${searchText}`);
        console.log(response.data);
        setSongData(response.data);
        // setSearchText("");
    };

    return(
        <LoggedInContainer>
                <div className="content p-8 pt-0 ovrflow-y-auto text-white">
                    <div className="text-2xl font-bold mb-5 mt-8">
                        Search
                    </div>
                    <div className={`w-1/3 p-4 text-white rounded-full bg-black flex space-x-3 ${isInput ? "border border-white" : " "}`}>
                        <Icon icon="tabler:search" fontSize={26} />
                        <input
                            type="text"
                            placeholder="What do you want to listen?"
                            className="w-full bg-black focus:outline-none"
                            onFocus={() => setIsInput(true)}
                            onBlur={() => setIsInput(false)}
                            onChange={(e) => setSearchText(e.target.value)} // This updates the state
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    searchSong(); // Call searchSong when Enter is pressed
                                }
                            }}
                        />
                    </div>
                    { songdata.length > 0 ?(
                        <div className="space-y-2 overflow-y-auto pt-5 space-y-3">
                            <div>Search results for : <span className="font-bold">{searchText}</span> </div>
                                {songdata.map((items) => (
                                    <SingleSongCard info={items} key={JSON.stringify(items)} playSound={() => {}} />
                                ))}
                        </div>
                    ):(<div className="flex justify-center item-center space-x-5">
                        <Icon icon="f7:exclamationmark-bubble-fill" fontSize={30}/>
                          Nothing to show here, enter a song name to search
                    </div>)}
                    </div>
        </LoggedInContainer>
    );
};

export default SearchComponent;