# backend/main.py

from fastapi import FastAPI, UploadFile, File, Form # kinda webbrain
from fastapi.middleware.cors import CORSMiddleware #required for communication between browser and server
from fastapi.responses import StreamingResponse # raw audios
import io # in-memory fake file
import soundfile as sf # read and write audio
import numpy as np

app = FastAPI() # creates server

# CORS so frontend can talk to backend in dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React/Vite defaults
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# health check, i.e. browser checks if backend (server) is alive
@app.get("/health")
def health():
    return {"status": "ok"}

# core:
@app.post("/process")
async def process_audio(
    file: UploadFile = File(...),
    gain_db: float = Form(0.0),
):
    # 1. Read audio file
    data, samplerate = sf.read(file.file)

    print(samplerate)
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

