import { BrowserRouter, Routes, Route } from 'react-router'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Hello Vite!</h1>} />
        <Route path='/editor' element={<h1>Editor</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
