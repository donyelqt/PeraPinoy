"use client";
import React, { useState } from "react";
import { Dialog, DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { CrossIcon, XIcon } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../../../../utils/dbConfig";
import { Budgets } from "../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import Budget from "../page";
import Image from "next/image";
import { adddocs } from "../../../../../public";





function CreateBudget({ refreshData }) {

  const [emojiIcon, setEmojiIcon] = useState('😊');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();

  // used to creat a new budget
  const onCreateBudget = async () => {
    const result = await db.insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon
      }).returning({ insertedId: Budgets.id })

    if (result) {
      refreshData()
      toast.success('New Budget Created!')
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="rounded-3xl p-24 hover:bg-slate-900 hover:text-blue-500 bg-transparent" asChild>
          <div className='bg-slate-200 p-24 rounded-3xl items-center 
            flex flex-col border-2 border-dotted h-[275px] cursor-pointer hover:slate-900 hover:text-black'>
            <h2 className='text-3xl text-black-600'><Image className="w-10 h-10 object-contain"
              src={adddocs}
              alt="adddocs" /></h2>
            <h2 className="text-yellow-400">Create New</h2>
          </div>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/50">
            <DialogContent className="fixed left-1/2 top-1/2 w-full -translate-x-1/2 p-4 -translate-y-1/2 rounded-3xl shadow max-w-lg bg-dark2">
              <DialogTitle className="fixed text-lg font-bold text-tertiary bg-dark2 mb-2 max-w-lg">Create New Budget</DialogTitle>
              <DialogDescription>
                <div className="flex justify-end mb-2">
                  <button className="text-gray-500 hover:text-red-700" onClick={() => setIsOpen(false)}>
                    <XIcon className="w-6 h-6" />
                  </button>
                </div>
                <div className="mt-5">
                  <button
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-lg font-medium border border-blue-600 w-[20%] p-6 h-11 px-8 transition-colors duration-300 ${openEmojiPicker
                        ? 'bg-blue-300 text-white'
                        : 'bg-transparent text-gray-700'
                      } hover:bg-blue-400 hover:text-white`}
                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  >
                    {emojiIcon}
                  </button>
                  <div className="absolute z-10 flex justify-center items-center inset-x-10 md:inset-x-28 lg:inset-28">
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
                    <input className="flex h-10 w-full rounded-lg border border-input bg-slate-300 px-3 py-2 text-sm ring-offset-blue-600 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                  disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="e.g. Emergency Funds"
                      onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="mt-2 text-blue-600">
                    <h2 className="text-blue-600 font-medium my-1">Allocated Funds</h2>
                    <input className="flex h-10 w-full rounded-lg border border-input bg-slate-300 px-3 py-2 text-sm ring-offset-blue-600 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
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
                  onClick={() => onCreateBudget()}
                  className="rounded-lg cursor-pointer bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring w-full mt-5">Create Budget</button>
              </DialogClose>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </div>
  );
}

export default CreateBudget;