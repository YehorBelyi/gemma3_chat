"use client";
import { useState } from "react";
import { UseModelAPI } from "@/app/contexts/ApiContext";
import { FormEvent } from "react";

type PromptAreaProps = {
    onSend: (prompt: string) => Promise<void>;
};

export default function PromptArea({ onSend }: PromptAreaProps) {
    const [prompt, setPrompt] = useState("");

    const sendPrompt = async (e: FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        console.log(prompt);
        await onSend(prompt);
        setPrompt("");
    };

    return (
        <div className="w-full mt-auto bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 shadow-inner">
            <form
                id="chat-form"
                className="flex items-center gap-3 max-w-screen-lg mx-auto p-4"
                onSubmit={sendPrompt}
            >
                <textarea
                    className="flex-grow border border-gray-300 rounded-2xl px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Type your message..."
                    rows={1}
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                    required
                />
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-medium shadow-sm hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                >
                    Send
                </button>
            </form>
        </div>
    );
}