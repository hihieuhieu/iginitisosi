import { useState } from "react";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [gainDb, setGainDb] = useState(0);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleProcess() {
    if (!file) return;

    setLoading(true);
    setProcessedUrl(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("gain_db", String(gainDb));

    const resp = await fetch("http://localhost:8000/process", {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) {
      setLoading(false);
      alert("processing failed, reality remains unfiltered.");
      return;
    }

    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    setProcessedUrl(url);
    setLoading(false);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>tiny sound lab</h1>

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
