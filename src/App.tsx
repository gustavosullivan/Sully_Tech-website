import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { SitePage } from './pages/SitePage'

export default function App() {
  return (
    <BrowserRouter basename="/Sully_Tech-website">
      <div className="noise" aria-hidden />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/site" element={<SitePage />} />
      </Routes>
    </BrowserRouter>
  )
}
