import { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ThmCntx } from '../data/ThemeContext'
import { Cntx } from '../data/DataContext'
import Card from './Card'

function SideBar({ openSideBar, setOpenSideBar, handleVisiblity, onRemove }) {
    const { theme } = useContext(ThmCntx)
    const { data, setData } = useContext(Cntx);

    return (
        <>
            <Transition.Root show={openSideBar} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpenSideBar}>
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
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className={`${theme ? 'bg-white' : 'bg-[#222222] text-white'} flex h-full flex-col overflow-y-scroll py-6 shadow-xl`}>
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-xl font-medium tracking-wide">Hidden Cards</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => setOpenSideBar(false)}
                                                        >
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 px-6 flex gap-4 flex-col">
                                                {data
                                                    .filter(item => !item.visible)
                                                    .map((item) => (
                                                        <Card item={item} handleVisiblity={handleVisiblity} onRemove={onRemove} />
                                                    ))}
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