import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const IconText = ({ iconName, text, active, targetLink, onClick}) => {
    return (
        <Link to={targetLink} className="block">
            <div className="flex items-center justify-start p-5 cursor-pointer hover:bg-gray-600" onClick={onClick}>
                <div className="px-4 py-0.8">
                    <Icon icon={iconName} color={active ? "white" : "gray"} fontSize={35} />
                </div>
                <div className={`${active ? "text-white" : "text-gray-400"} font-bold`}>
                    {text}
                </div>
            </div>
        </Link>
    );
};

export default IconText;