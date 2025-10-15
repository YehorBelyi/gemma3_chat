export type ApiContextType = {
    processPrompt: (userPrompt: string) => Promise<void>;
}