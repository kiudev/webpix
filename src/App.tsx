import { BrowserRouter, Routes, Route } from 'react-router'
import Welcome from './pages/Welcome'
import Editor from './pages/Editor'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path='/editor' element={<Editor />} />
      </Routes>
    </BrowserRouter>
  )
}
