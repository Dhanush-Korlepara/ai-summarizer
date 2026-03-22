import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/summarize", {
        text,
      });

      setResult(res.data);
    } catch (err) {
      alert("Error summarizing text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">AI Text Summarizer</h1>

      <div className="card">
        <textarea
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Character Counter */}
        <div className="counter">{text.length} characters</div>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "⏳ Analyzing..." : "Summarize"}
        </button>

        {loading && <div className="loading">Processing your text...</div>}
      </div>

      {result && (
        <div className="result">
          <div className="result-card">
            <h3>Summary</h3>
            <p>{result.summary}</p>

            <button
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(result.summary)}
            >
              Copy
            </button>
          </div>

          <div className="result-card">
            <h3>Key Points</h3>
            <ul>
              {result.keyPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="result-card">
            <h3>Sentiment</h3>
            <p className={`sentiment ${result.sentiment}`}>
              {result.sentiment}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;