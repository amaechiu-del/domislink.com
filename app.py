from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

app = FastAPI()

MODEL_NAME = "openai/gpt-oss-20b"

print("Loading model, please wait…")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME, torch_dtype=torch.float16, device_map="auto"
)
print("Model ready!")


class Request(BaseModel):
    prompt: str
    max_tokens: int = 200


@app.post("/v1/completions")
def generate(request: Request):
    inputs = tokenizer(request.prompt, return_tensors="pt").to(model.device)
    output = model.generate(**inputs, max_new_tokens=request.max_tokens)
    text = tokenizer.decode(output[0], skip_special_tokens=True)
    return {"text": text}
