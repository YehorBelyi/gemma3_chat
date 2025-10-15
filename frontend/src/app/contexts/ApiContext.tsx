"use client";
import { createContext, ReactNode, useContext, useState, useMemo } from "react";
import { ApiContextType } from "../types/api";
import axios from "axios";
import { ModelResponse } from "../types/api";

const ApiContext = createContext<ApiContextType | undefined>(undefined);

const API = "http://localhost:8000/api/generate";


export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const processPrompt = async (userPrompt: string): Promise<ModelResponse | null> => {
        if (userPrompt === "") return null;

        try {
            const response = await axios.post(API, { prompt: userPrompt });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const value = useMemo(() => ({
        processPrompt
    }), []);

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