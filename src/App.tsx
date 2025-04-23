import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StartPage from "./view/StartPage";
import ImportPage from "./view/ImportPage";
import MainPage from "./view/MainPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/import" element={<ImportPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
