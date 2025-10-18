"use client";
import Chat from "../components/chat/chat";
import { UseModelAPI } from "../contexts/ApiContext";
import PromptArea from "../components/prompt-area/promp_area";

export default function Home() {
    const { handleSend } = UseModelAPI();

    return (
        <div className="flex flex-col flex-1 bg-gray-50">
            <div className="flex-1 flex flex-col mx-auto w-full max-w-6xl">
                <Chat />
            </div>

            <PromptArea onSend={handleSend} />
        </div>
    );
}