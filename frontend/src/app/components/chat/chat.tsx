"use client";
import PromptArea from "../prompt-area/promp_area";
import { UseModelAPI } from "@/app/contexts/ApiContext";
import { useState } from "react";
import { Message, ModelResponse } from "@/app/types/api";

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const { processPrompt } = UseModelAPI();

    const handleSend = async (prompt: string) => {
        const userMessage: Message = { role: "user", content: prompt };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await processPrompt(prompt);
            if (response?.model_response) {
                const modelMessage: Message = {
                    role: "system",
                    content: response.model_response
                };
                setMessages(prev => [...prev, modelMessage]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-3 rounded-2xl max-w-xs ${msg.role === "user"
                            ? "bg-blue-500 text-white ml-auto"
                            : "bg-gray-200 text-gray-900"
                            }`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>

            <PromptArea onSend={handleSend} />
        </div>
    );
}