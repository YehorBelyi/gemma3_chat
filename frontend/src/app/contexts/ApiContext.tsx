"use client";
import { createContext, ReactNode, useContext, useState, useMemo } from "react";
import { ApiContextType } from "../types/api";
import axios from "axios";
import { ModelResponse } from "../types/api";
import { Message } from "../types/api";

const ApiContext = createContext<ApiContextType | undefined>(undefined);

const API = "https://carmelita-nonprofit-earl.ngrok-free.dev/api/generate";

const test_string: Message = { role: "system", content: "Okay, here’s a very basic Django app that creates a simple view and renders a template: **1. `views.py`:** ```python from django.shortcuts import render def hello(request): context = {'message': 'Hello from Django!'} return render(request, context) ``` **2. `templates/hello.html`:** ```html <h1>{{ message }}</h1> ``` **3. `urls.py` (in your project's root directory):** ```python from django.urls import path from . import views urlpatterns = [ path('hello/', views.hello, name='hello'), ] ``` **Explanation:** * **`views.py`:** This file contains the view function `hello`. It takes a `request` object as input and returns an HTTP response. It passes a dictionary `context` to the `render` function. * **`templates/hello.html`:** This is the HTML template that will be rendered. The `{{ message }}` part is a Django template tag that will be replaced with the value of the `message` variable from the `context` dictionary. * **`urls.py`:** This file defines the URL patterns for your application. The `path('hello/', views.hello, name='hello')` line tells Django to map the URL `/hello/` to the `hello` view function. The `name='hello'` part gives this URL pattern a name, which you can use to reference it from other parts of your code. **To run this:** 1. Make sure you have Django installed (`pip install django`). 2. Create a new Django project (`django-admin startproject myproject`). 3. Navigate into the project directory (`cd myproject`). 4. Create an app within your project (e.g., `python manage.py startapp myapp`). 5. Put the `views.py`, `templates/hello.html`, and `urls.py` files into your app directory. 6. Run the development server: `python manage.py runserver`. 7. Open your web browser and go to `http://127.0.0.1:8000/hello/` (or the URL that the server tells you it's running on). You should see the text 'Hello from Django!' Do you want me to: * Explain any of these files in more detail? * Show you how to add a database connection? * Help you with a specific problem you’re encountering while setting this up?" };


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
            }
        } catch (err) {
            console.error(err);
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