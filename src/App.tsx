import "./App.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center bg-gray-800 text-white px-4 py-2">
        <div className="mr-2 h-8 w-8 rounded bg-gray-600" />
        <h1 className="text-xl font-semibold">Daggerheart Character Creator</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r border-gray-200 p-4" />
        <main className="flex-1 p-4">
          <p className="text-lg">
            Welcome to the Daggerheart Character Creator.
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;
