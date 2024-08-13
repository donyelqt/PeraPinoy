"use client";
import React, { useState } from "react";
import { Dialog, DialogPortal } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogDescription } from "@radix-ui/react-dialog";


function CreateBudget() {
  return (
    <div>
      <div className='bg-slate-300 p-10 rounded-md items-center 
      flex flex-col border-2 border-dashed cursor-pointer hover:bg-blue-500 hover:text-black'>
        <h2 className='text-3xl text-black-600'>+</h2>
        <h2>Create New Budget</h2>
      </div>
      <Dialog>
        <DialogTrigger className="rounded p-1 mt-2 hover:bg-blue-500 hover:text-black bg-slate-300">Open</DialogTrigger>
        <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
         <DialogPortal>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogPortal>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
