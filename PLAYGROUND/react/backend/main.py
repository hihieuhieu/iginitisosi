# backend/main.py
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import io
import soundfile as sf
import numpy as np

app = FastAPI()

# CORS so frontend can talk to backend in dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React/Vite defaults
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/process")
async def process_audio(
    file: UploadFile = File(...),
    gain_db: float = Form(0.0),
):
    # 1. Read audio file
    data, samplerate = sf.read(file.file)
    # Ensure float
    data = data.astype(np.float32)

    # 2. Very dumb DSP: just gain
    gain = 10 ** (gain_db / 20.0)
    processed = data * gain

    # 3. Write back to WAV in memory
    buf = io.BytesIO()
    sf.write(buf, processed, samplerate, format="WAV")
    buf.seek(0)

    return StreamingResponse(
        buf,
        media_type="audio/wav",
        headers={"Content-Disposition": 'attachment; filename="processed.wav"'},
    )

