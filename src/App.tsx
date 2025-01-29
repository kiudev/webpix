import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import ProtectedRoute from "./auth/ProtectedRoute";
import { FileProvider } from "./context/FileContext";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <FileProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/editor" element={<Editor />} />
            </Route>
          </Routes>
        </FileProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
