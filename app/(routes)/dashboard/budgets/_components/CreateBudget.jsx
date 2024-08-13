"use client";
import React, { useState } from "react";
import { Dialog, DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { CrossIcon, XIcon } from "lucide-react";

function CreateBudget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="rounded p-10 hover:bg-blue-500 hover:text-black bg-slate-300" asChild>
          <div className='bg-slate-300 p-10 rounded-md items-center 
            flex flex-col border-2 border-dashed cursor-pointer hover:bg-blue-500 hover:text-black'>
            <h2 className='text-3xl text-black-600'>+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/50">
            <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 p-4 -translate-y-1/2 rounded-md text-gray-900 shadow max-w-lg bg-white">
              <DialogTitle className="fixed text-lg font-bold text-black bg-white mb-2">Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                <div className="flex justify-end mb-2">
                  <button className="text-gray-500 hover:text-gray-600" onClick={() => setIsOpen(false)}>
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-md text-gray-600">
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </h2>
              </DialogDescription>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </div>
  );
}

export default CreateBudget;