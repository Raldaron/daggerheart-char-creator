import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import LoadPage from './pages/LoadPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <>
      <header className="p-4 bg-gray-100">
        <nav className="space-x-4">
          <NavLink to="/" className="text-blue-600" end>
            Home
          </NavLink>
          <NavLink to="/create" className="text-blue-600">
            Create
          </NavLink>
          <NavLink to="/load" className="text-blue-600">
            Load
          </NavLink>
          <NavLink to="/about" className="text-blue-600">
            About
          </NavLink>
        </nav>
      </header>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/load" element={<LoadPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </>
  )
}
