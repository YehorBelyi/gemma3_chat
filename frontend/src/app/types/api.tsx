export type ApiContextType = {
    processPrompt: (userPrompt: string) => Promise<ModelResponse | null>;
    messages: Array<Message>;
    handleSend: (prompt: string) => any;
    isLoading: boolean;
};
export type Message = {
    role: "user" | "system";
    content: string;
};

export type ModelResponse = {
    model_response: string;
};