"use client";
import { UseModelAPI } from "@/app/contexts/ApiContext";
import { useEffect, useRef } from "react";
import CodeBlock from "@/app/utils/codeblock";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chat() {
    const { messages } = UseModelAPI();
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 flex flex-col mt-[70px]">
            {messages?.map((msg, idx) => (
                <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                    <div
                        className={`p-3 rounded-2xl whitespace-pre-wrap break-words`}
                        style={{
                            maxWidth: "65%",
                            wordBreak: "break-word",
                            overflowWrap: "anywhere",
                            backgroundColor: msg.role === "user" ? "#3B82F6" : "#E5E7EB",
                            color: msg.role === "user" ? "white" : "#1F2937",
                        }}
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code: CodeBlock,
                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                strong: ({ node, ...props }) => <strong className="font-extrabold" {...props} />,
                            }}
                        >
                            {msg.content}
                        </ReactMarkdown>
                    </div>
                </div>
            ))}

            <div ref={endOfMessagesRef} />
        </div>
    );
}