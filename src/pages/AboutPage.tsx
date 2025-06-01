/*** Codex prompt: create src/pages/AboutPage.tsx ***

Goal
Static info page with license & credits.

Requirements
1. React FC `AboutPage`.
2. Content sections:
   • <h2>About This App</h2> – brief paragraph.
   • <h3>Version</h3> – read from package.json's version via `import meta` trick:
        import pkg from '../../../package.json' assert { type: 'json' };
        <p>{pkg.version}</p>
   • <h3>Technology</h3> – bullet list of stack (React, Vite, TS).
   • <h3>License & Legal</h3> – paragraph citing Daggerheart SRD + OGL; link to official SRD.
   • <h3>Credits</h3> – acknowledgements + GitHub repo link.
   • <Link to="/">← Back home</Link>
3. Export default AboutPage.

Styling: max-width 46rem; margin-inline:auto; line-height:1.6.

***/

import { Link } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: package.json import via assert
import pkg from '../../package.json' assert { type: 'json' }

const AboutPage: React.FC = () => {
  return (
    <div className="p-4" style={{ maxWidth: '46rem', marginInline: 'auto', lineHeight: 1.6 }}>
      <h2 className="text-2xl font-bold">About This App</h2>
      <p>
        This project is an unofficial character builder for Daggerheart, aiming to
        provide a simple, web-based tool for creating heroes.
      </p>

      <h3 className="text-xl font-semibold mt-4">Version</h3>
      <p>{pkg.version}</p>

      <h3 className="text-xl font-semibold mt-4">Technology</h3>
      <ul className="list-disc list-inside">
        <li>React 18</li>
        <li>Vite</li>
        <li>TypeScript</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">License & Legal</h3>
      <p>
        Uses material from the Daggerheart SRD under the Open Gaming License.
        See the{' '}
        <a
          href="https://www.daggerheart.com/srd"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          official SRD
        </a>
        .
      </p>

      <h3 className="text-xl font-semibold mt-4">Credits</h3>
      <p>
        Created by fans of the game. Source code available on{' '}
        <a
          href="https://github.com/yourname/daggerheart-char-creator"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          GitHub
        </a>
        .
      </p>

      <div className="mt-8">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back home
        </Link>
      </div>
    </div>
  )
}

export default AboutPage
