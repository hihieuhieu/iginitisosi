// useState: memory for a function
import { useState } from "react";

// start component
function App() {
  // state variables:
  // uploaded file. useState for memory. | for "or"
  const [file, setFile] = useState<File | null>(null);
  // hold gain slider value
  const [gainDb, setGainDb] = useState(0);
  // url (uniform resource locator) pointing to processed audio file returned by backend
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  // track if app is waiting on the server
  const [loading, setLoading] = useState(false);

  // action function
  async function handleProcess() {
    // return if no file
    if (!file) return;

    // immediate ui updates
    setLoading(true);
    setProcessedUrl(null);

    // create new multipart request (FormData())
    const formData = new FormData();
    // append whatever there is to append to formData
    formData.append("file", file);
    formData.append("gain_db", String(gainDb));

    // > HERE: send FormData() object to backend at localhost:8000 via fetch(..)
    // > backend returns response as resp
    const resp = await fetch("http://localhost:8000/process", {
      method: "POST",
      body: formData,
    });

    // if server refuses, error message and return
    if (!resp.ok) {
      setLoading(false);
      alert("processing failed, reality remains unfiltered.");
      return;
    }

    // backend sends raw audio. convert raw audio to playable browser url
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);

    // state updates
    setProcessedUrl(url);
    setLoading(false);
  }

  // returning web interface html
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>IGINITISOSI</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            const f = e.target.files?.[0] || null;
            setFile(f);
            setProcessedUrl(null);
          }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Gain (dB): {gainDb}
          <input
            type="range"
            min={-24}
            max={24}
            value={gainDb}
            onChange={(e) => setGainDb(Number(e.target.value))}
          />
        </label>
      </div>

      <button onClick={handleProcess} disabled={!file || loading}>
        {loading ? "processing..." : "Process"}
      </button>

      {processedUrl && (
        <div style={{ marginTop: "2rem" }}>
          <h2>processed output</h2>
          <audio controls src={processedUrl} />
        </div>
      )}
    </div>
  );
}

export default App;
