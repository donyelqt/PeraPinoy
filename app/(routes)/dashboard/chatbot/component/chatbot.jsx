import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { SparklesIcon } from "lucide-react";



export function Chatbot() {
  return (
    (<div
      className="flex flex-col h-[80vh] border max-h-[800px] w-full mx-auto bg-background rounded-3xl shadow-lg overflow-hidden">
      <header
        className="bg-slate-900 w-full text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 border bg-slate-900 rounded-full">
            <SparklesIcon className="size-6 text-blue-600" />
          </div>
          <h2 className="text-lg font-medium">PeraPinoy - GPT</h2>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-2 border bg-slate-900 rounded-full">
            <SparklesIcon className="size-5 text-blue-600" />
          </div>
          <div className="bg-tertiary text-white rounded-2xl p-4 max-w-[70%]">
            <p>Hello, how can I assist you today?</p>
          </div>
        </div>
        <div className="flex items-start gap-4 justify-end">
          <div
            className="bg-primary text-primary-foreground rounded-2xl p-4 max-w-[70%]">
            <p>I am seeking your financial advice and hope you can help me.</p>
          </div>
        </div>
      </div>
      <div className="p-4 flex items-center gap-2 bg-slate-900">
        <input
          placeholder="Type your message..."
          className="flex-1 resize-none rounded-lg border border-input bg-white px-4 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
        <button
          type="submit"
          className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-md font-medium shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          Send
        </button>
      </div>
    </div>)
  );
}

function XIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}
