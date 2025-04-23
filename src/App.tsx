import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StartPage from "./pages/StartPage";
import ImportPage from "./pages/ImportPage";
import MainPage from "./pages/MainPage";
import { WalletProvider } from "./contexts/WalletContext";

function App() {
  return (
    <div className="App">
      <WalletProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </div>
  );
}

export default App;
