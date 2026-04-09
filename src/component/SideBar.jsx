import { Fragment, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ThmCntx } from '../data/ThemeContext'
import { Cntx } from '../data/DataContext'

function SideBar({ openSideBar, setOpenSideBar, handleVisiblity }) {
    const { theme } = useContext(ThmCntx)
    const { data } = useContext(Cntx);

    return (
        <>
            <Transition.Root show={openSideBar} as={Fragment}>
                <Dialog as="div" className="relative z-10000" onClose={setOpenSideBar}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-[#00000096]" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto max-w-sm">
                                        <div className={`${theme ? 'bg-white' : 'bg-[#222831] text-white'} flex h-full flex-col overflow-y-scroll py-6 shadow-xl`}>
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <p className="text-xl font-medium tracking-wide text-amber-400">Hidden Cards</p>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md text-gray-400 hover:text-gray-300 cursor-pointer"
                                                            onClick={() => setOpenSideBar(false)}
                                                        >
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 px-6 flex gap-4 flex-col">
                                                <p className='italic'>Click the checkbox to change visibility!</p>
                                                <fieldset>
                                                    <div className={`mt-4 divide-y ${theme ? 'dark:divide-gray-200': 'divide-gray-700'} border-t border-b `}>
                                                        {data.map((item) => (
                                                            <div key={item.id} className="relative flex items-start py-4">
                                                                <div className="min-w-0 flex-1 text-sm">
                                                                    <label htmlFor={item.id} className="select-none font-medium">
                                                                        {item.title}
                                                                    </label>
                                                                </div>
                                                                <div className="ml-3 flex h-5 items-center">
                                                                    <input
                                                                        onChange={(e) => handleVisiblity(item.id, e.target.checked)}
                                                                        checked={item.visible}
                                                                        id={item.id}
                                                                        name={item.id}
                                                                        type="checkbox"
                                                                        className="h-4 w-4 rounded cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default SideBar