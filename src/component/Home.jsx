import { useContext, useState } from "react";
import { ThmCntx } from "../data/ThemeContext";
import { Cntx } from "../data/DataContext";
import Card from "./Card";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import SideBar from "./SideBar";

function Home() {
    const { theme } = useContext(ThmCntx);
    const { data, setData } = useContext(Cntx);
    const [open, setOpen] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false)

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

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setData(items);
    };

    return (
        <>
            <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} handleVisiblity={handleVisiblity} onRemove={onRemove}/>
            <Modal open={open} setOpen={setOpen} onAdd={onAdd} />
            <div className={`${theme ? "dark:bg-white text-black" : "bg-[#2C2C2C] text-white"} min-h-screen`}>
                <div className="mx-auto max-w-7xl py-6 px-4 flex sm:flex-row flex-col gap-2 items-center justify-between">
                    <button onClick={() => { setOpenSideBar(true) }} className={`dark:bg-[#5E7AC4] text-white hover:bg-blue-400 transition-all duration-200 rounded-md py-2.5 px-3.5 cursor-pointer font-semibold`}>Show Hidden Cards</button>
                    <button onClick={() => { setOpen(true) }} className={`dark:bg-[#ed7e2a] text-white hover:bg-amber-500 transition-all duration-200 rounded-md py-2.5 px-3.5 cursor-pointer font-semibold`}>＋ Add a New Card</button>
                </div>

                <div className="mx-auto max-w-7xl py-2 px-4">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="metrics-grid" direction="horizontal" type="column">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="p-8 grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 border-2 border-dashed border-gray-300 overflow-hidden"
                                >
                                    {data
                                        .filter(item => item.visible)
                                        .map((item) => (
                                            <Draggable key={item.id} draggableId={item.id.toString()}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`transition-all duration-300 ${snapshot.isDragging
                                                            ? "z-50 scale-105 shadow-2xl rotate-2 opacity-90"
                                                            : "scale-100 shadow-md"
                                                            }`}
                                                        style={{ ...provided.draggableProps.style }}
                                                    >
                                                        <Card item={item} handleVisiblity={handleVisiblity} onRemove={onRemove} isDragging={snapshot.isDragging} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </>
    );
}

export default Home