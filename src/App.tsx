import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
            <Route path="/" element={<StartPage />}></Route>
            <Route path="/import" element={<ImportPage />}></Route>
            <Route path="/main" element={<MainPage />}></Route>
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </div>
  );
}

export default App;
