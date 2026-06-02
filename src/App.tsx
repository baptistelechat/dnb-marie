import { Globe, Sparkles } from "lucide-react";
import EuropTab from "./components/EuropTab";

const App = () => {
  return (
    <div
      className="min-h-dvh"
      style={{
        background:
          "linear-gradient(160deg, #fdf2f8 0%, #f5f0fb 40%, #f0f8ff 80%, #f1fbf2 100%)",
      }}
    >
      <header
        className="sticky top-0 z-20 px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(12px)",
          borderBottom: "2px solid #f0e6ff",
        }}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #f9a8d4, #c084fc, #818cf8)",
            }}
          >
            <Sparkles size={20} className="text-white" />
          </div>

          <div className="flex-1">
            <h1
              className="text-xl leading-tight text-slate-800"
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif",
                fontWeight: 600,
                letterSpacing: "0.01em",
              }}
            >
              DNB · Marie
            </h1>
            <p className="text-xs text-slate-400 font-semibold leading-tight">
              Révise comme une pro ✨
            </p>
          </div>

          <div
            className="flex items-center px-3 py-1.5 rounded-full text-xs font-bold border-2"
            style={{
              background: "#f5f0fb",
              borderColor: "#c084fc",
              color: "#7c3aed",
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontSize: "14px",
            }}
          >
            3ème
          </div>
        </div>
      </header>

      <nav className="max-w-2xl mx-auto flex px-4 pt-4 gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border-2 active:scale-95 transition-transform"
          style={{
            background: "linear-gradient(135deg, #ede7f6, #e3f2fd)",
            borderColor: "#9575cd",
            color: "#6a1b9a",
            boxShadow: "0 2px 8px #9575cd30",
          }}
        >
          <Globe size={14} />
          <span>Union Européenne</span>
        </button>
      </nav>

      <main className="max-w-2xl mx-auto pb-20">
        <EuropTab />
      </main>
    </div>
  );
};

export default App;
