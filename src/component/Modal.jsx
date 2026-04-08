import { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast';
import { ThmCntx } from '../data/ThemeContext';

export default function Modal({ open, setOpen, onAdd, setData, data }) {
    const { theme } = useContext(ThmCntx);

    function onAdd(newCard) {
        setData(prev => [...prev, newCard]);
    }
    const [form, setForm] = useState({
        title: "",
        date: "",
        count: "",
        visible: false
    });

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newCard = {
            id: Date.now(),
            ...form
        };

        onAdd(newCard);
        setOpen(false);
        toast.success('New card added!')
        console.log(data);

        setForm({
            title: "",
            date: "",
            count: "",
            visible: false
        });
    }
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className={`fixed inset-0 ${theme ? 'dark:bg-[#000000b1]' : 'bg-[#050505ac]'}`} />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className={`${theme ? 'dark:bg-white' : "bg-mist-900 text-white"} shadoww relative transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6`}>
                                    <div className="absolute top-0 right-0 pt-4 pr-4">
                                        <button
                                            type="button"
                                            className="rounded-md cursor-pointer text-gray-400 hover:text-gray-500"
                                            onClick={() => setOpen(false)}
                                        >
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="p-2.5">
                                        <div className="mt-3">
                                            <p className="text-xl pb-3 font-medium leading-6">
                                                Add a new card
                                            </p>
                                            <form onSubmit={handleSubmit} className="mt-2">
                                                <label htmlFor="text" className="block text-xs">
                                                    Title<span className="text-red-600">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        name="title"
                                                        value={form.title}
                                                        onChange={handleChange}
                                                        required
                                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                                <label htmlFor="text" className="block mt-2 text-xs">
                                                    Date<span className="text-red-600">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        name="date"
                                                        value={form.date}
                                                        onChange={handleChange}
                                                        required
                                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                                <label htmlFor="text" className="block mt-2 text-xs">
                                                    Count<span className="text-red-600">*</span>
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        name="count"
                                                        value={form.count}
                                                        onChange={handleChange}
                                                        required
                                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div className="mt-4 flex items-center gap-2">
                                                    <label htmlFor="" className="text-sm">
                                                        Visibilty<span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        name="visible"
                                                        checked={form.visible}
                                                        onChange={handleChange}
                                                        className="block w-4 h-4"
                                                    />
                                                </div>
                                                <div className="mt-4 flex flex-row-reverse gap-3 ">
                                                    <button
                                                        type="submit"
                                                        className="inline-flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 sm:text-sm"
                                                    >
                                                        Add
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="cursor-pointer inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 sm:text-sm"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
