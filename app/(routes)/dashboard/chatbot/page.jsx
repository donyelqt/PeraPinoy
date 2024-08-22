"use client"
import React from 'react'
import { Chatbot } from "./component/chatbot";

function PeraPinoyGptPage() {
  return (
    <section>
    <div className='font-bold text-tertiary text-6xl p-8'>PeraPinoy - GPT</div>
    <div>
        <Chatbot />
    </div>
    </section>
  )
}

export default PeraPinoyGptPage