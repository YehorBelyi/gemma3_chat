from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import ollama

MODEL = "gemma3:4b"
client = ollama.AsyncClient()
messages = [
    {"role": "system", "content": "You are a helpful assistant."}
]

app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:8080",
    "https://gemma3-frontend.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api", summary="Test", tags=["Endpoints"])
def root() -> dict:
    return {"message": "Hello World"}

class PromptRequest(BaseModel):
    prompt: str

@app.post("/api/generate", summary="Generate", tags=["Endpoints"])
async def generate(request: PromptRequest) -> dict:
    global messages
    messages.append({"role": "user", "content": request.prompt})
    model_response = await client.chat(MODEL, messages=messages)
    messages.append({"role": "system", "content": model_response.message.content})
    return {"status_code": 201, "model_response": model_response.message.content}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
