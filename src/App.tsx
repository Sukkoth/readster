import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { ReaderPage } from "./pages/ReaderPage";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/read" element={<ReaderPage />} />
      </Routes>
    </Router>
  );
}

export default App;