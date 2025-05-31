import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import LoadPage from './pages/LoadPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <div className="p-4">
      <nav className="mb-4 flex gap-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <Link to="/create" className="text-blue-600 hover:underline">
          Create
        </Link>
        <Link to="/load" className="text-blue-600 hover:underline">
          Load
        </Link>
        <Link to="/about" className="text-blue-600 hover:underline">
          About
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/load" element={<LoadPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}

export default App;
