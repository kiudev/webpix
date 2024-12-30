import { BrowserRouter, Routes, Route } from "react-router";
import Welcome from "./pages/Welcome";
import Editor from "./pages/Editor";
import ProtectedRoute from "./auth/ProtectedRoute";
import { FileProvider } from "./context/FileContext";

export default function App() {
  return (
    <BrowserRouter>
      <FileProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/editor" element={<Editor />} />
          </Route>
        </Routes>
      </FileProvider>
    </BrowserRouter>
  );
}
