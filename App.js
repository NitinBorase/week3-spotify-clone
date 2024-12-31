// import "./App.css";
import "./output.css";
import {BroeserRouter, Routes, Route, BrowserRouter} from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginComponent from './routes/login';
import SignupComponent from './routes/signup';
import HomeComponent from './routes/home';
import LoggedInHomeComponent from './routes/loggedInHome';
import UploadSongComponent from './routes/uploadSong';
import MyMusicComponent from './routes/myMusic';
import songContext from "./contexts/songContext";
import SearchComponent from './routes/search';
import Library from "./routes/library";
import SinglePlaylistView from "./routes/playlistView";
import LikedSongsComponent from "./routes/likedSongs";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  const [cookie, setCookie] = useCookies(["token"]);
  console.log(cookie.token);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
      {cookie.token ? (
            <songContext.Provider value={{ currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused }}>
                <Routes>
                // logged in routes
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<LoggedInHomeComponent />} />
                <Route path="/uploadSong" element={<UploadSongComponent />} />
                <Route path="/myMusic" element={<MyMusicComponent />} />
                <Route path="/search" element={<SearchComponent />} />
                <Route path="/library" element={<Library />} />
                <Route path="/playlist/:playlistId" element={<SinglePlaylistView />} />
                <Route path="/likedSongs" element={<LikedSongsComponent />} />
                <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
              </songContext.Provider>
            ) : (
              <Routes>
                // logged out routes
                <Route path="/home" element={<HomeComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/signup" element={<SignupComponent />} />
                <Route path="*" element={<Navigate to="/login" />} />
                <></>
              </Routes>
            )}
      </BrowserRouter>
    </div>
  );
}

const Home = () => {
  return <div className="w-full h-full">
    <h1 className="text-4xl font-bold text-center">Welcome to Spotify</h1>
  </div>
}

export default App;
