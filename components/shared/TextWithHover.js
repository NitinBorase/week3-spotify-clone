const TextWithHover = ({text}) => {
    return (
        <div className="flex items-center justify-start p-5 cursor-pointer">
            <div className="text-white font-bold hover:text-gray-400 text-lg">
                {text}
            </div>
        </div>
    );
};

export default TextWithHover;