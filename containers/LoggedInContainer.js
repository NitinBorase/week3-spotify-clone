import { useContext, useLayoutEffect, useState, useEffect } from "react";
import {Howl, Howler} from 'howler';
import { Icon } from "@iconify/react";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import songContext from "../contexts/songContext";
import { useRef } from "react";
import { Link } from "react-router-dom";
import PlaylistComponent from "../components/shared/modals/playlist";
import AddToPlaylist from "../components/shared/modals/AddToPlaylist";
import { makeauthenticatedPOSTRequest, makeauthenticatedGETRequest } from "../utils/serverHelpers";

const LoggedInContainer = ({children}) =>{

    const [playlistModeOpen, setPlaylistModeOpen] = useState(false);
    const [addplaylistModeOpen, setaddPlaylistModeOpen] = useState(false);

    const {currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused} = useContext(songContext);
    
    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if(firstUpdate.current){
            firstUpdate.current = false;
            return;
        }
        if (!currentSong) {
            return
        }
        changeSong(currentSong.track);
    },[currentSong && currentSong.track]);

    const addSongToPlaylist = async (playlistId) => {
        const songId = currentSong._id;
        const payload = {playlistId, songId};
        const response = await makeauthenticatedPOSTRequest ("/playlist/add/song", payload);
        console.log(response);
        if(response._id){
            setaddPlaylistModeOpen(false);
        }
    };

    const playSound = () => {
        if(!soundPlayed) {
            return;
        }
        soundPlayed.play();
    };

    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        soundPlayed.pause();
    };

    const tooglePlayPause = () => {
        if(isPaused){
            playSound();
            setIsPaused(false);
        } else {
            pauseSound();
            setIsPaused(true);
        }
    };

    return (
    <div className="w-full h-full bg-app-black">
        {playlistModeOpen && <PlaylistComponent 
        closeModel={()=>{setPlaylistModeOpen(false);}} 
        />}
        {addplaylistModeOpen && <AddToPlaylist 
        closeModel={()=>{setaddPlaylistModeOpen(false);}} 
        addSongToPlaylist={addSongToPlaylist}
        />}
        <div className={`${currentSong ? "h-9/10" : "h-full"} w-full h-9/10 flex`}>
            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-5">
            <div>
            <div className="logo p-5 w-full flex justify-start">
                        <Icon icon="logos:spotify" width="150" />
                </div>
                <div className="py-4">
                    <IconText iconName={"typcn:home"} text="Home" active={true} targetLink={"/home"}/>
                    <IconText iconName={"tabler:search"} text="Search" active={true} targetLink={"/search"}/>
                    <IconText iconName={"fluent:library-20-filled"} text="Library" active={true} targetLink={"/library"}/>
                    <IconText iconName={"iconamoon:music-2-fill"} text="My Music" active={true} targetLink={"/myMusic"}/>
                </div>
                <div className="pt-3">
                    <IconText iconName={"icon-park-solid:add"} text="Create Playlist" active={true} 
                    onClick={()=> setPlaylistModeOpen(true)}
                    />
                    <IconText iconName={"solar:chat-round-like-linear"} text="Liked Songs" active={true} targetLink={"/likedSongs"}/>
                </div>
            </div>
            <div className="px-5 flex items-center justify-start cursor-pointer">
                <div className="border border-grey-1000 text-white w-2/5 flex px-2 py-1 rounded-full hover:border-white">
                    <Icon icon="flowbite:globe-solid" width="30" height="30" />
                    <div className="ml-2 text-l font-semibold">English</div>
                </div>
            </div>
            </div>

            <div className="h-full w-4/5 bg-app-black overflow-y-auto">
                <div className="navbar w-full h-1/10 bg-black bg-opacity-50 flex justify-end items-center">
                    <div className="w-1/2 flex h-full items-center">
                        <div className="w-3/5 flex justify-around">
                            <TextWithHover text={"Premium"} />
                            <TextWithHover text={"Support"} />
                            <TextWithHover text={"Download"} />
                            <div className="border-r border-white"></div>
                        </div>
                        <div className="w-2/5 flex items-center justify-around">
                            <Link to="/uploadsong"><TextWithHover text={"Upload Songs"} /></Link>
                            <div className="bg-white text-black h-14 w-14 rounded-full font-bold text-lg flex items-center justify-center curosr-pointer hover:bg-gray-300"> 
                                NB
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
       {
        currentSong &&(
        <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center p-5">
            <div className="w-1/3 flex justify-start items-center">
                <img src={currentSong.thumbnail} className="h-12 w-12"/>
                <div className="pl-5">
                    <div className="text-white font-bold cursor-pointer hover:underline">{currentSong.name}</div>
                    <div className="text-gray-400 text-xs cursor-pointer hover:underline">{currentSong.artist.firstName+" "+currentSong.artist.lastName}</div>
                </div>
            </div>
            
            <div className="w-1/3 flex justify-center h-full">
                <div className="flex justify-around items-between w-1/2">
                    <Icon icon="ri:shuffle-line" fontSize={26} className="cursor-pointer hover:text-gray-400"/>
                    <Icon icon="mage:previous-fill" fontSize={26} className="cursor-pointer hover:text-gray-400"/>
                    <Icon icon={isPaused ? "icon-park-solid:play":"gridicons:pause"} fontSize={26} className="cursor-pointer hover:text-gray-400"
                    onClick={() => tooglePlayPause()}
                    />
                    <Icon icon="mage:next-fill" fontSize={26} className="cursor-pointer hover:text-gray-400"/>
                    <Icon icon="oi:loop" fontSize={26} className="cursor-pointer hover:text-gray-400"/>
                </div>
                <div>

                </div>
            </div>
            <div className="w-1/3 flex justify-end items-center space-x-5">
                <Icon icon="mynaui:heart" width="26" height="26" 
                className="cursor-pointer hover:text-gray-400"
                />

                <Icon icon="qlementine-icons:playlist-16" width="26" height="26" 
                className="cursor-pointer hover:text-gray-400"
                onClick={() => setaddPlaylistModeOpen(true)}
                />
                <Icon icon="logos:spotify" width="100" />
            </div>
        </div>
    )}
    </div>
    );
};

export default LoggedInContainer;