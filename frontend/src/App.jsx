// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Explore from "./pages/Explore";
import TryIt from "./pages/TryIt";
import Glossary from "./pages/Glossary";
import Chatbot from "./pages/Chatbot";
import ModelInfo from "./pages/ModelInfo";
import SnapGame from "./pages/SnapGame";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/try-it" element={<TryIt />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/model-info" element={<ModelInfo />} />
          <Route path="/snap-game" element={<SnapGame />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
