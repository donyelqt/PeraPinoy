"use client";
import { useChat } from "ai/react";
import { BotMessageSquare, ArrowUp, SquareIcon } from "lucide-react";
import Markdown from "react-markdown";
import { useState } from "react";
import Image from "next/image";


export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: "/dashboard/chat/api",
  });

  // Predefined prompts
  const prompts = [
    "💰 How do I start saving money?",
    "📝 What are some budgeting tips?",
    "🔍 Explain credit score and how to improve it.",
    "📈 How can I invest in the stock market?",
    "🏦 How do I start saving for retirement?",
    // "🏡 What are the current trends in the real estate market?",
    "🧾 What deductions can I claim on my tax return?",
  ];


  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [showPrompts, setShowPrompts] = useState(true); // State to toggle pre-prompts

  // Function to handle prompt selection
  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt);
    handleInputChange({ target: { value: prompt } });
    setShowPrompts(false); // Hide prompts after a prompt is selected
  };

  // Function to toggle the visibility of prompts
  const togglePrompts = () => {
    setShowPrompts(!showPrompts);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-screen w-full p-3 rounded-2xl shadow-lg overflow-hidden">
      <header className="bg-tertiary w-full rounded-lg text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 border bg-orange-400 rounded-full">
            <BotMessageSquare className="size-6 text-white" />
          </div>
          <h2 className="text-lg text-white font-medium">PeraPinoyGPT</h2>
        </div>
      </header>

      {messages.length === 0 && (
        <div className="flex flex-col w-full justify-center items-center h-full">
          <div className="border p-4 bg-white rounded-full w-44 h-44 flex items-center justify-center mx-auto">
            <Image
              src={'/NewLogo.png'}
              alt='logo'
              width={170}
              height={170}
            />
          </div>
          <p className="text-xs lg:text-sm px-4 py-2 font-semibold bg-orange shadow-lg rounded-3xl text-white mt-4 text-center">
            Your personalized AI financial advisor!
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) =>
          message.role === "assistant" ? (
            <div key={message.id} className="flex items-start gap-4">
              <div className="p-2 border bg-orange rounded-full">
                <BotMessageSquare className="size-5 text-white" />
              </div>
              <div className="bg-red-950 text-primary-foreground rounded-2xl p-4 max-w-[70%]">
                <Markdown className="text-sm text-slate-300">{message.content}</Markdown>
              </div>
            </div>
          ) : (
            <div key={message.id} className="flex items-start gap-4 justify-end">
              <div className="bg-blue-900 text-yellow-500 rounded-2xl p-4 max-w-[70%]">
                <p>{message.content}</p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Toggle button to show or hide pre-prompts */}
      <div className="p-4">
        <button
          onClick={togglePrompts}
          className="bg-yellow-600 text-black rounded-full px-4 py-2 text-sm hover:bg-yellow-700"
        >
          {showPrompts ? "📝" : "🔐"}
        </button>
      </div>

      {/* Prompt selection buttons */}
      {showPrompts && (
        <div className="p-4 flex justify-center flex-wrap gap-2">
          {prompts.map((prompt, index) => (
            <button
              key={index}
              className="bg-white shadow-lg text-orange-700 hover:text-orange rounded-full px-4 py-2 text-xs md:text-sm lg:text-sm hover:bg-blue-950"
              onClick={() => handlePromptSelect(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div className="p-4 flex items-center gap-2 bg-transparent">
        <input
          placeholder="Type your financial questions..."
          className="flex h-12 w-full rounded-2xl border border-input shadow-lg bg-white px-3 py-2 text-sm ring-offset-yellow-600 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                  disabled:cursor-not-allowed disabled:opacity-50"
          value={input}
          onChange={handleInputChange}
        />

        {!isLoading ? (
          <button
            type="submit"
            className="bg-tertiary rounded-full text-primary-foreground px-6 py-5 text-md font-medium shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!input || isLoading}
          >
            <ArrowUp className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </button>
        ) : (
          <button
            type="button"
            disabled={!isLoading}
            onClick={stop}
            className="bg-primary rounded-full text-primary-foreground px-6 py-5 text-md font-medium shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SquareIcon className="w-5 h-5" fill="white" />
            <span className="sr-only">Stop</span>
          </button>
        )}
      </div>
    </form>
  );
}

