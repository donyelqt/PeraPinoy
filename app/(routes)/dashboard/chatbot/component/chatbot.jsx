"use client"
import { useChat } from 'ai/react'
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowUp, BotMessageSquare, SparklesIcon } from "lucide-react";



export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/dashboard/chat/api",
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-[80vh] max-h-[800px] w-full p-3 bg-background rounded-2xl shadow-lg overflow-hidden">
      <header
        className="bg-slate-300 w-full rounded-md text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 border bg-slate-900 rounded-full">
            <BotMessageSquare className="size-6 text-blue-600" />
          </div>
          <h2 className="text-lg text-dark font-medium">PeraPinoyGPT</h2>
        </div>
      </header>

      {
        messages.length === 0 && (
          <div className='flex flex-col justify-center items-center h-full'>
            <div className="p-4 border bg-slate-900 rounded-full max-w-xs mx-auto">
              <BotMessageSquare className="text-blue-600"
                height={70}
                width={70}
              />
            </div>
            <p className='text-md text-slate-500 mt-4 text-center'>
              Welcome to PeraPinoyGPT! Ask me anything about your financial concerns.
            </p>
          </div>
        )
      }

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) =>
          message.role === "assistant" ? (
            <div
              key={message.id}
              className="flex items-start gap-4">
              <div className="p-2 border bg-slate-900 rounded-full">
                <BotMessageSquare className="size-5 text-blue-600" />
              </div>
              <div className="bg-red-800  text-primary-foreground rounded-2xl p-4 max-w-[70%]">
                <p>{message.content}</p>
              </div>
            </div>
          ) : (
            <div
              key={message.id}
              className="flex items-start gap-4 justify-end">
              <div className="bg-blue-800 text-primary-foreground rounded-2xl p-4 max-w-[70%]">
                <p>{message.content}</p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="p-4 flex items-center gap-2 bg-transparent">
        <input
          placeholder="Type your message..."
          className="flex h-12 w-full rounded-lg border border-input bg-slate-300 px-3 py-2 text-sm ring-offset-blue-600 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                  disabled:cursor-not-allowed disabled:opacity-50"
          value={input}
          rows={1}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-primary rounded-full text-primary-foreground px-6 py-5 text-md font-medium shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!input}
        >
          <ArrowUp className="w-6 h-6" />
          <span className="sr-only">Send</span>
        </button>
      </div>
    </form>
  );
}