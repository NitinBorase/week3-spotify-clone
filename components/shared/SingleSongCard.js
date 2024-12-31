import { useContext } from "react";
import songContext from "../../contexts/songContext";

const SingleSongCard = ({info, playSound}) => {
    const {currentSong, setCurrentSong} = useContext(songContext);
    
    return(
        <div className="flex hover:bg-gray-400 p-2 cursor-pointer hover:bg-opacity-30"
        onClick={() => {
            setCurrentSong(info);
            }}>
            <div className="w-12 h-12 bg-cover bg-center" 
            style={{backgroundImage:`url(${info.thumbnail})`}}>

            </div>
            <div className="flex w-full justify-between items-center">
                <div className="pl-4 flex flex-col justify-center items-start">
                    <div className="text-white font-bold cursor-pointer hover:underline">{info.name}</div>
                    <div className="text-gray-400 text-xs cursor-pointer hover:underline">{info.artist.firstName+" "+info.artist.lastName}</div>
                </div>
                <div className="w-1/6 flex justify-end items-center text-gray-400 text-sm">
                    <div>3:44</div>
                </div>
            </div>
        </div>
    );
};

export default SingleSongCard;