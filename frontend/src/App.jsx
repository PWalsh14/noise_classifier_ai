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
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
