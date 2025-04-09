// Chatbot.jsx — with guided prompt suggestions
import React, { useState } from "react";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const suggestedQuestions = [
  "What is a spectrogram?",
  "How does the model learn from sound?",
  "Explain a CNN in simple terms",
  "Why do we use spectrograms instead of raw audio?",
  "What does a pooling layer do?",
  "How can I understand a model's prediction?"
];

const Chatbot = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setChat((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a friendly AI tutor helping beginners understand how sound classification with deep learning works. Be clear, simple, and guide them using real-world examples. If they ask about CNNs, spectrograms, or waveforms, give strong analogies and avoid jargon.",
            },
            ...chat.map((m) => ({ role: m.role, content: m.text })),
            { role: "user", content: userMessage },
          ],
        }),
      });

      const data = await response.json();
      console.log("🧠 OpenAI raw response:", data);

      if (response.status !== 200) {
        throw new Error(data?.error?.message || "Unexpected error from OpenAI.");
      }

      const aiResponse = data.choices?.[0]?.message?.content || "Hmm, no response.";
      setChat((prev) => [...prev, { role: "assistant", text: aiResponse }]);
    } catch (err) {
      console.error("❌ OpenAI Error:", err.message);
      setChat((prev) => [
        ...prev,
        { role: "assistant", text: `⚠️ Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (question) => {
    setInput(question);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">💬 Ask the AI Tutor</h1>
      <p className="text-gray-600 mb-4">Ask a question about sound, spectrograms, CNNs, or AI in general. Or choose one below to get started:</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSuggestionClick(q)}
            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm px-3 py-1 rounded-full"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="bg-white border rounded-lg p-4 shadow min-h-[200px] mb-6 space-y-3 max-h-[400px] overflow-y-auto">
        {chat.length === 0 && <p className="text-gray-400">Your chat will appear here...</p>}
        {chat.map((entry, idx) => (
          <div key={idx} className={entry.role === "user" ? "text-right" : "text-left"}>
            <p className={`inline-block px-4 py-2 rounded-xl text-sm whitespace-pre-wrap ${entry.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"}`}>
              {entry.text}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
