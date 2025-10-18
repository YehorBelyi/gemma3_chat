"use client";
import { createContext, ReactNode, useContext, useState, useMemo } from "react";
import { ApiContextType } from "../types/api";
import axios from "axios";
import { ModelResponse } from "../types/api";
import { Message } from "../types/api";

const ApiContext = createContext<ApiContextType | undefined>(undefined);

const API = "https://carmelita-nonprofit-earl.ngrok-free.dev/api/generate";

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    const processPrompt = async (userPrompt: string): Promise<ModelResponse | null> => {
        if (userPrompt === "") return null;

        try {
            const response = await axios.post(API, { prompt: userPrompt });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const handleSend = async (prompt: string) => {
        setLoading(true);
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
            } else {
                throw new Error("Empty response received from server.");
            }
        } catch (err) {
            console.error("API Error:", err);

            let errorMessage = "Connection error! Server does not respond";

            if (axios.isAxiosError(err)) {
                if (err.response) {
                    errorMessage = `Server error: ${err.response.status}`;
                } else if (err.request) {
                    errorMessage = "Network error: server is not available right now!";
                }
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            const errorNotification: Message = {
                role: "error",
                content: `🚨 ${errorMessage}`
            };
            setMessages(prev => [...prev, errorNotification]);

        } finally {
            setLoading(false);
        }
    };

    const value = useMemo(() => ({
        processPrompt,
        messages,
        handleSend,
        isLoading
    }), [messages, isLoading]);

    return (
        <>
            <ApiContext.Provider value={value}>
                {children}
            </ApiContext.Provider>
        </>
    )
}

export const UseModelAPI = () => {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error("An error occured related to model api!");
    }
    return context;
} 