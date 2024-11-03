"use client"
import { EditIcon, UserPen, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog, DialogOverlay,
    DialogPortal, DialogTrigger,
    DialogContent, DialogTitle,
    DialogDescription, DialogClose
} from "@radix-ui/react-dialog";
import EmojiPicker from 'emoji-picker-react';
import { useUser } from '@clerk/nextjs';
import { db } from '../../../../../../utils/dbConfig';
import { Budgets } from '../../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import Select from 'react-select';

function EditBudget({ budgetInfo, refreshData }) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    const { user } = useUser();

    // select budget category
    const options = [
        { value: 'Emergency Funds', label: 'Emergency Funds' },
        { value: 'Groceries', label: 'Groceries' },
        { value: 'Utilities', label: 'Utilities' },
        { value: 'Rent', label: 'Rent' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Savings', label: 'Savings' },
        { value: 'Transport', label: 'Transport' },
        { value: 'Healthcare', label: 'Healthcare' },
        { value: 'Education', label: 'Education' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Technology', label: 'Technology' },
        { value: 'Other', label: 'Other' },
    ];

    // select budget category styles
    const customStyles = {
        placeholder: (provided) => ({
            ...provided,
            color: '#4b5563', // Set placeholder color
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: '#cbd5e1', // Tailwind's bg-slate-300 equivalent in hex
            height: '2.5rem', // h-10 equivalent
            width: '100%', // w-full equivalent
            borderRadius: '0.5rem', // rounded-lg
            borderColor: '#e2e8f0', // Adjusting the border color if needed
        }),
        menu: (provided) => ({
            ...provided,
            width: '100%', // Ensures the dropdown menu is full width
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#4b5563', // Matching arrow color with the placeholder
            padding: '0.25rem', // Adjust padding if necessary
        }),
        indicatorSeparator: () => ({
            display: 'none', // Hides the default separator
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#2563eb', // Set color for selected value (text-blue-600)
        }),
    };

    useEffect(() => {
        setEmojiIcon(budgetInfo?.icon)
        setAmount(budgetInfo?.amount);
        setName(budgetInfo?.name)

    }, [budgetInfo])

    const onUpdateBudget = async () => {
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon,
        }).where(eq(Budgets.id, budgetInfo.id))
            .returning();

        if (result) {
            refreshData()
            toast.success('Budget Updated!')
        }

    }

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="rounded p-8 bg-primary" asChild>
                    <button className='rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring active:bg-red-500 md:px-8 md:py-4 lg:px-10 lg:py-5 flex gap-1'>Edit<EditIcon /></button>
                </DialogTrigger>
                <DialogPortal>
                    <DialogOverlay className="fixed inset-0 bg-black/50">
                        <DialogContent className="fixed left-1/2 top-1/2 w-full -translate-x-1/2 p-4 -translate-y-1/2 rounded-3xl text-gray-900 shadow max-w-lg bg-dark2">
                            <DialogTitle className="fixed text-lg font-bold text-blue-600 bg-dark2 mb-2 max-w-lg">Edit Budget</DialogTitle>
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
                                    <div className="mt-2 text-blue-900">
                                        <h2 className="text-blue-600 font-medium my-1">Budget Category</h2>
                                        <Select
                                            options={options}
                                            placeholder="Select Budget Category"
                                            styles={customStyles}
                                            onChange={(selectedOption) => setName(selectedOption.value)}
                                        />
                                        {/*<input className="flex h-10 w-full rounded-lg border border-input bg-slate-300 px-3 py-2 text-sm ring-offset-blue-600 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                  disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="e.g. Emergency Funds"
                                            defaultValue={budgetInfo?.name}
                                            onChange={(e) => setName(e.target.value)} />*/}
                                    </div>
                                    <div className="mt-2 text-blue-900">
                                        <h2 className="text-blue-600 font-medium my-1">Allocated Funds</h2>
                                        <input className="flex h-10 w-full rounded-lg border border-input bg-slate-300 px-3 py-2 text-sm ring-offset-blue-600 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                  disabled:cursor-not-allowed disabled:opacity-50"
                                            type="number"
                                            placeholder="e.g. PHP1,000"
                                            defaultValue={budgetInfo?.amount}
                                            onChange={(e) => setAmount(e.target.value)} />
                                    </div>


                                </div>
                            </DialogDescription>
                            <DialogClose asChild>
                                <button
                                    disabled={!(name && amount)}
                                    onClick={() => onUpdateBudget()}
                                    className="rounded-lg cursor-pointer bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring w-full mt-5">Update Budget</button>
                            </DialogClose>
                        </DialogContent>
                    </DialogOverlay>
                </DialogPortal>
            </Dialog>
        </div>
    )
}

export default EditBudget;