import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { ReaderPage } from "./pages/ReaderPage";
import { LearnSciencePage } from "./pages/LearnSciencePage";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/read" element={<ReaderPage />} />
        <Route path="/learn-science" element={<LearnSciencePage />} />
      </Routes>
    </Router>
  );
}

export default App;