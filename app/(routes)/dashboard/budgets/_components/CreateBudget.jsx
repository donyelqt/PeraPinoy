"use client";
import React, { useState } from "react";
import { Dialog, DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { CrossIcon, XIcon } from "lucide-react";
import EmojiPicker from "emoji-picker-react";



function CreateBudget() {

  const [emojiIcon,setEmojiIcon]=useState('😊');
  const [openEmojiPicker,setOpenEmojiPicker]=useState(false)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="rounded p-10 hover:bg-blue-500 hover:text-black bg-slate-300" asChild>
          <div className='bg-slate-200 p-10 rounded-md items-center 
            flex flex-col border-2 cursor-pointer hover:bg-blue-500 hover:text-black'>
            <h2 className='text-3xl text-black-600'>+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/50">
            <DialogContent className="fixed left-1/2 top-1/2 w-full -translate-x-1/2 p-4 -translate-y-1/2 rounded-md text-gray-900 shadow max-w-lg bg-white">
              <DialogTitle className="fixed text-lg font-bold text-blue-600 bg-white mb-2 max-w-lg">Create New Budget</DialogTitle>
              <DialogDescription>
                <div className="flex justify-end mb-2">
                  <button className="text-gray-500 hover:text-gray-800" onClick={() => setIsOpen(false)}>
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-5">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium bg-transparent border-2 border-input text-* hover:bg-accent hover:text-accent-foreground p-2 h-11 px-8"
                onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
                >{emojiIcon}</button>
                <div className="absolute">
                  <EmojiPicker 
                  open={openEmojiPicker}
                  onEmojiClick={(e)=>{
                    setEmojiIcon(e.emoji)
                    setOpenEmojiPicker(false)
                  }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-blue-600 font-medium my-1">Budget Category</h2>
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                  disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g. Allowance"/>
                </div>
                <div className="mt-2">
                  <h2 className="text-blue-600 font-medium my-1">Budget Amount</h2>
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                  disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g. PHP1,000"/>
                </div>
                </div>
              </DialogDescription>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </div>
  );
}

export default CreateBudget;