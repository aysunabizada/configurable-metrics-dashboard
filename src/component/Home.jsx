import { useContext, useEffect, useState } from "react";
import { ThmCntx } from "../data/ThemeContext";
import { Cntx } from "../data/DataContext";
import Card from "./Card";
import toast from "react-hot-toast";
import Modal from "./Modal";
import SideBar from "./SideBar";
import { CiSquarePlus } from "react-icons/ci";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";

function Home() {
    const { theme } = useContext(ThmCntx);
    const { data, setData } = useContext(Cntx);
    const [open, setOpen] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false)

    useEffect(() => {
        const visible = data.filter(item => item.visible);
        setItems(visible);
    }, [data]);

    function onRemove(id) {
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        toast.success('Deleted successfully!');
        console.log(updatedData);
    }

    function handleVisiblity(id) {
        setData(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, visible: !item.visible }
                    : item
            )
        )
        toast.success("Visibilty changed!");
    }

    function onAdd(newCard) {
        setData(prev => [...prev, newCard]);
    }

    const visibleData = data.filter(item => item.visible);
    const [parent, items, setItems] = useDragAndDrop(
        visibleData,
        {
            plugins: [animations()],
            onSort: (newList) => {
                const hidden = data.filter(item => !item.visible);
                setData([...newList, ...hidden])
            }
        }
    );

    return (
        <>
            <SideBar
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
                handleVisiblity={handleVisiblity}
            />
            <Modal
                open={open}
                setOpen={setOpen}
                onAdd={onAdd}
            />
            <div className={`${theme ? "dark:bg-white text-black" : "bg-[#222831] text-white"} min-h-screen`}>
                <div className="mx-auto max-w-7xl py-6 px-4 flex sm:flex-row flex-col gap-2 items-center justify-between">
                    <div className="relative">
                        <button
                            onClick={() => { setOpenSideBar(true) }}
                            className={`dark:bg-[#5E7AC4] text-white hover:bg-blue-400 transition-all duration-200 rounded-md py-2.5 px-3.5 cursor-pointer font-semibold`}>
                            Show Hidden Cards List
                        </button>
                        <span className="bg-[#ed7e2a] absolute -top-2.5 -right-2.5 flex justify-center items-center text-white min-h-7 min-w-7 rounded-full">
                            {data.filter(item => !item.visible).length}
                        </span>
                    </div>
                    <button
                        onClick={() => { setOpen(true) }}
                        className={`dark:bg-[#ed7e2a] text-white hover:bg-amber-500 transition-all duration-200 rounded-md py-2.5 px-3.5 cursor-pointer font-semibold`}>
                        ＋ Add a New Card
                    </button>
                </div>
                <div className="mx-auto max-w-7xl py-3 px-4">
                    <div ref={parent} className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-1">
                        {items.length != 0 ?
                            items.map((item) =>
                                <div key={item.id} className={`p-3 min-h-50 rounded-md border-2 border-dashed ${theme ? 'dark:border-gray-200' : 'border-gray-700'} flex items-center justify-center`}>
                                    <Card
                                        item={item}
                                        handleVisiblity={handleVisiblity}
                                        onRemove={onRemove}
                                    />
                                </div>) :
                            <div
                                onClick={() => setOpen(true)}
                                className={`min-h-50 cursor-pointer border-2 rounded-md border-dashed 
                                ${theme ? 'dark:border-gray-200 text-gray-200' : 'border-gray-700 text-gray-700'} flex items-center justify-center`}>
                                <CiSquarePlus className="text-5xl " />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home