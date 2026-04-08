import { useContext } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { ThmCntx } from "../data/ThemeContext";

function Card({ item, onRemove, handleVisiblity }) {
    const { theme } = useContext(ThmCntx);
    

    return (
        <div key={item.id} className={` min-h-48 cursor-move hover:shadow-xl transition-all duration-200 rounded border border-gray-300 bg-gray-100 
        ${theme ? "dark:bg-gray-100 text-black" : "bg-mist-900 border-gray-900 text-white"}`}>
            <div className="flex justify-between px-3 py-2 border-b border-b-gray-300">
                <p className="font-medium text-sm">{item.title}</p>
                <div className="flex gap-2">
                    <FaEye onClick={() => handleVisiblity(item.id)} className="text-xl text-gray-400 cursor-pointer transition-all duration-200 hover:text-gray-600 " />
                    <FaXmark onClick={() => onRemove(item.id)} className="text-xl text-gray-400 cursor-pointer transition-all duration-200 hover:text-gray-600 " />
                </div>
            </div>
            <p className=" text-3xl min-h-28 font-bold flex justify-center items-center text-[#e87f24] capitalize">{item.count}</p>
            <p className="text-xs px-3 py-2 text-gray-400 italic text-center border-t border-t-gray-300">Last uptade: {item.date}</p>
        </div>
    )
}

export default Card