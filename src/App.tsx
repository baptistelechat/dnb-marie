import EuropTab from "./components/EuropTab";

const App = () => {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50">
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-violet-100 px-4 py-3 flex items-center gap-3 shadow-sm">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center text-xl shadow-sm">
          📚
        </div>
        <div>
          <h1 className="text-base font-bold text-violet-700 leading-tight">
            DNB Marie
          </h1>
          <p className="text-xs text-slate-400">
            Révise comme une championne !
          </p>
        </div>
      </header>

      <nav className="flex px-4 pt-4 gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500 text-white text-sm font-semibold shadow-md whitespace-nowrap"
        >
          <span>🌍</span>
          <span>Érurop</span>
        </button>
      </nav>

      <main className="max-w-2xl mx-auto pb-10">
        <EuropTab />
      </main>
    </div>
  );
};

export default App;
