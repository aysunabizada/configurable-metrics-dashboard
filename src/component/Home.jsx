import { useContext, useState } from "react";
import { ThmCntx } from "../data/ThemeContext";
import { Cntx } from "../data/DataContext";
import Card from "./Card";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function Home() {
    const { theme } = useContext(ThmCntx);
    const { data, setData } = useContext(Cntx);
    const [open, setOpen] = useState(false);

    function onRemove(id) {
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        toast.success('Deleted successfully!');
        console.log(updatedData);
    }

    function onAdd(newCard) {
        setData(prev => [...prev, newCard]);
    }

    function addCard() {
        setOpen(true)
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
            <Modal open={open} setOpen={setOpen} onAdd={onAdd} data={data} setData={setData} />
            <div className={`${theme ? "dark:bg-white text-black" : "bg-[#2C2C2C] text-white"} min-h-screen`}>
                <div className="mx-auto max-w-7xl py-6 px-4 flex sm:flex-row flex-col gap-2 items-center justify-between">
                    <div className="flex gap-2">
                        {/* <button onClick={saveChanges} className={`dark:bg-[#ed7e2a] text-white hover:bg-amber-500 transition-all duration-200 rounded-md py-2.5 px-3.5 cursor-pointer font-semibold`}>Save changes</button> */}
                        <button onClick={addCard} className={`dark:bg-[#ed7e2a] text-white hover:bg-amber-500 transition-all duration-200 rounded-md py-2.5 px-3.5 cursor-pointer font-semibold`}>＋ Add Card</button>
                    </div>
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
                                    {data.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`transition-all duration-300 ${snapshot.isDragging
                                                            ? "z-50 scale-105 shadow-2xl rotate-2 opacity-90"
                                                            : "scale-100 shadow-md"
                                                        }`}
                                                    style={{...provided.draggableProps.style}}
                                                >
                                                    <Card item={item} onRemove={onRemove} isDragging={snapshot.isDragging} />
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