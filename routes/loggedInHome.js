import LoggedInContainer from "../containers/LoggedInContainer";

const focusCardData = [{title:"Focus",description:"Music to help you concentrate.",imageurl:"https://static.vecteezy.com/system/resources/thumbnails/047/918/672/small_2x/music-abstract-with-headphones-horizontal-wallpaper-photo.jpg"},
    {title:"Focus",description:"Music to help you concentrate.",imageurl:"https://static.vecteezy.com/system/resources/thumbnails/047/918/672/small_2x/music-abstract-with-headphones-horizontal-wallpaper-photo.jpg"},
    {title:"Focus",description:"Music to help you concentrate.",imageurl:"https://static.vecteezy.com/system/resources/thumbnails/047/918/672/small_2x/music-abstract-with-headphones-horizontal-wallpaper-photo.jpg"},
    {title:"Focus",description:"Music to help you concentrate.",imageurl:"https://static.vecteezy.com/system/resources/thumbnails/047/918/672/small_2x/music-abstract-with-headphones-horizontal-wallpaper-photo.jpg"},
    {title:"Focus",description:"Music to help you concentrate.",imageurl:"https://static.vecteezy.com/system/resources/thumbnails/047/918/672/small_2x/music-abstract-with-headphones-horizontal-wallpaper-photo.jpg"},
];

const LoggedInHomeComponent = () =>{
    return(
        <LoggedInContainer>
            <PlaylistView titleText={"Focus"} carddata={focusCardData}/>
            <PlaylistView titleText={"Spotify Playlist"} carddata={focusCardData}/>
            <PlaylistView titleText={"Sound of India"} carddata={focusCardData}/>
        </LoggedInContainer>
    );
};

const PlaylistView = ({titleText, carddata}) => {
    return (
    <div className="text-white m-3">
        <div className="text-2xl font-bold mb-5 mt-8">{titleText}</div>
        <div className="w-full flex justify-between space-x-4">
            {
                carddata.map((item) => (
                    <Card 
                        title={item.title} 
                        description={item.description} 
                        imageurl={item.imageurl} 
                    />
                ))
            }
        </div>
    </div>
    );
};

const Card = ({title, description, imageurl}) => {
    return (
        <div className="bg-black bg-opacity-60 p-5 w-1/5">
            <div className="py-4 rounded-md">
                <img src={imageurl} alt="Label" className="rounded-md"></img>
            </div>
            <div className="text-white font-bold py-3">{title}</div>
            <div className="text-gray-500">{description}</div>
        </div>
    );
};

export default LoggedInHomeComponent;