"use client"
import { UserPen, XIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Dialog, DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import EmojiPicker from 'emoji-picker-react';
import { useUser } from '@clerk/nextjs';

function EditBudget() {
    const [emojiIcon, setEmojiIcon] = useState('😊');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    const { user } = useUser();

    const onUpdateBudget=()=>{

    }


    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="rounded p-10 bg-primary" asChild>
                    <button className='rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring active:bg-red-500 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 flex gap-1'><UserPen />Edit</button>
                </DialogTrigger>
                <DialogPortal>
                    <DialogOverlay className="fixed inset-0 bg-black/50">
                        <DialogContent className="fixed left-1/2 top-1/2 w-full -translate-x-1/2 p-4 -translate-y-1/2 rounded-md text-gray-900 shadow max-w-lg bg-dark2">
                            <DialogTitle className="fixed text-lg font-bold text-blue-600 bg-dark2 mb-2 max-w-lg">Create New Budget</DialogTitle>
                            <DialogDescription>
                                <div className="flex justify-end mb-2">
                                    <button className="text-gray-500 hover:text-red-700" onClick={() => setIsOpen(false)}>
                                        <XIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium bg-transparent border-2 border-input text-* hover:bg-blue-400 hover:text-accent-foreground p-2 h-11 px-8"
                                        onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                    >{emojiIcon}</button>
                                    <div className="absolute z-10">
                                        <EmojiPicker
                                            theme="dark"
                                            open={openEmojiPicker}
                                            onEmojiClick={(e) => {
                                                setEmojiIcon(e.emoji)
                                                setOpenEmojiPicker(false)
                                            }}
                                            style={{
                                                width: '65vw'
                                            }}
                                        />
                                    </div>
                                    <div className="mt-2 text-blue-600">
                                        <h2 className="text-blue-600 font-medium my-1">Budget Category</h2>
                                        <input className="flex h-10 w-full rounded-md border border-input bg-slate-300 px-3 py-2 text-sm ring-offset-blue-600 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                  disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="e.g. Emergency Funds"
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mt-2 text-blue-600">
                                        <h2 className="text-blue-600 font-medium my-1">Allocated Funds</h2>
                                        <input className="flex h-10 w-full rounded-md border border-input bg-slate-300 px-3 py-2 text-sm ring-offset-blue-600 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                  disabled:cursor-not-allowed disabled:opacity-50"
                                            type="number"
                                            placeholder="e.g. PHP1,000"
                                            onChange={(e) => setAmount(e.target.value)} />
                                    </div>


                                </div>
                            </DialogDescription>
                            <DialogClose asChild>
                                <button
                                    disabled={!(name && amount)}
                                    onClick={() => onUpdateBudget()}
                                    className="rounded-lg bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring w-full mt-5">Create Budget</button>
                            </DialogClose>
                        </DialogContent>
                    </DialogOverlay>
                </DialogPortal>
            </Dialog>
        </div>
    )
}

export default EditBudget