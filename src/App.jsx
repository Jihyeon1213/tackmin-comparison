import LandingPage from "./pages/landingpage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ServiceComparison from "./pages/serviceComparison";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/comparison" element={<ServiceComparison />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
