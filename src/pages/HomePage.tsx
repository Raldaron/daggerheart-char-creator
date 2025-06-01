/*** Codex prompt: create src/pages/HomePage.tsx ***

Goal
Landing page that routes to character creation or loading.

Requirements
1. React FC named `HomePage`.
2. Import `useNavigate` from 'react-router-dom'.
3. Layout:
   • Centered container (max-width 48rem).
   • <h1>Daggerheart Character Builder</h1>
   • <p>tagline</p>
   • Two primary buttons:
        - “Create New Character” → navigate('/create')
        - “Load Existing Character” → navigate('/load')
   • Footer with small “About” link (<Link to="/about">).
4. Add minimal CSS via `HomePage.module.css`:
       .hero { display:flex; flex-direction:column; align-items:center; gap:1rem; }
5. Export default HomePage.

Styling: className="hero" on wrapper.

***/

import { Link, useNavigate } from 'react-router-dom'
import styles from './HomePage.module.css'

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={`${styles.hero} max-w-3xl mx-auto py-8`}>    
      <h1>Daggerheart Character Builder</h1>
      <p>tagline</p>
      <div className="flex gap-4">
        <button
          type="button"
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={() => navigate('/create')}
        >
          Create New Character
        </button>
        <button
          type="button"
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={() => navigate('/load')}
        >
          Load Existing Character
        </button>
      </div>
      <footer className="mt-8 text-sm">
        <Link to="/about" className="text-blue-600 hover:underline">
          About
        </Link>
      </footer>
    </div>
  )
}

export default HomePage
