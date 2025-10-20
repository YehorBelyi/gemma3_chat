"use client";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy_image from "../../../public/content_copy.svg";
import Image from "next/image";

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const codeToCopy = String(children).replace(/\n$/, '');

    const handleCodeCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeToCopy);
            alert("Code successfully copied!");
        } catch (err) {
            alert("Couldn't copy the code.");
        }
    };

    return !inline && match ? (
        <div className="relative group text-sm">

            <button
                onClick={handleCodeCopy}
                aria-label={`Copy ${match[1]} code`}
                className="absolute top-2 right-2 p-1 rounded transition-all duration-200 
                           text-gray-300 hover:text-white bg-black/50 hover:bg-black/70 
                           transform hover:scale-110 active:scale-90 active:opacity-70"
            >
                <Image
                    src={copy_image}
                    alt="Copy Code"
                    width={18}
                    height={18}
                />
            </button>

            <SyntaxHighlighter
                style={dark}
                language={match[1]}
                PreTag="div"
                {...props}
            >
                {codeToCopy}
            </SyntaxHighlighter>
        </div>
    ) : (
        <code className={className} {...props}>
            {children}
        </code>
    );
};

export default CodeBlock;