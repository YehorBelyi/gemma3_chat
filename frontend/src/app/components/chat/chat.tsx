"use client";
import { UseModelAPI } from "@/app/contexts/ApiContext";
import { useEffect, useRef } from "react";
import CodeBlock from "@/app/utils/codeblock";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import copy_image from "../../../../public/content_copy.svg";
import Image from "next/image";
import "./style.css";

export default function Chat() {
    const { messages } = UseModelAPI();
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const getMessageStyles = (role: "user" | "system" | "error") => {
        if (role === "user") {
            return {
                alignmentClass: "justify-end",
                bgColor: "#3B82F6",
                textColor: "white"
            };
        } else if (role === "error") {
            return {
                alignmentClass: "justify-start",
                bgColor: "#FCA5A5",
                textColor: "#991B1B"
            };
        } else {
            return {
                alignmentClass: "justify-start",
                bgColor: "#E5E7EB",
                textColor: "#1F2937"
            };
        }
    };

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("Text was successfully copied!");
        } catch (err) {
            alert(`Couldn't copy the text: ${err}`);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col pt-[90px] w-full">
            {messages?.map((msg, idx) => {
                const styles = getMessageStyles(msg.role);
                const isModelMessage = msg.role === "system";

                return (
                    <div
                        key={idx}
                        className={`flex ${styles.alignmentClass}`}
                    >

                        <div
                            className={`flex flex-col max-w-[65%]`}
                            style={{ maxWidth: "65%" }}
                        >
                            <div
                                className={`p-3 rounded-2xl whitespace-pre-wrap break-words`}
                                style={{
                                    wordBreak: "break-word",
                                    overflowWrap: "anywhere",
                                    backgroundColor: styles.bgColor,
                                    color: styles.textColor,
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

                            {isModelMessage && (
                                <button
                                    className="flex self-end mt-1 anim-button"
                                    onClick={() => handleCopy(msg.content)}
                                    aria-label="Copy message to clipboard"
                                >
                                    <Image
                                        src={copy_image}
                                        alt="Copy"
                                        width={23}
                                        height={23}
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}

            <div ref={endOfMessagesRef} />
        </div>
    );
}