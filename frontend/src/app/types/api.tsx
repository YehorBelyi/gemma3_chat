export type ApiContextType = {
    processPrompt: (userPrompt: string) => Promise<ModelResponse | null>;
    messages: Array<Message>;
    handleSend: (prompt: string) => Promise<void>;
    isLoading: boolean;
};
export type Message = {
    role: "user" | "system" | "error";
    content: string;
};

export type ModelResponse = {
    model_response: string;
};