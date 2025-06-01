import { FC, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useCharacter } from '../store/useCharacter';

const stepLabels = [
  'Class',
  'Heritage',
  'Traits',
  'Attributes',
  'Abilities',
  'Background',
  'Equipment',
  'Connections',
];

const ProgressBar: FC = () => {
  const location = useLocation();
  const current = location.pathname.split('/').pop();

  return (
    <ol className="flex gap-4 overflow-x-auto">
      {stepLabels.map((label) => {
        const active = current === label.toLowerCase();
        return (
          <li key={label} className={active ? 'font-bold' : ''}>
            {label}
          </li>
        );
      })}
    </ol>
  );
};

const CreatePage: FC = () => {
  const navigate = useNavigate();
  const { sheet, resetSheet } = useCharacter();

  useEffect(() => {
    if (sheet.id == null) {
      resetSheet();
    }
  }, [sheet.id, resetSheet]);

  const onCancel = () => {
    if (window.confirm('Discard this character and return home?')) {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="flex flex-col gap-6">
        <button type="button" onClick={onCancel} className="text-left">
          ← Home
        </button>
        <h2 className="text-2xl font-bold">Create Character</h2>
        <ProgressBar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default CreatePage;
