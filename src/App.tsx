import { useState } from "react";
import { Globe, Landmark, Link2, Map, Sparkles } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import EuropTab from "./components/EuropTab";
import MapQuizTab from "./components/MapQuizTab";
import CapitalsQuizTab from "./components/CapitalsQuizTab";
import FranceTab from "./components/FranceTab";
import FranceMapQuizTab from "./components/FranceMapQuizTab";
import FranceCapitalsQuizTab from "./components/FranceCapitalsQuizTab";
import AssociationTab from "./components/AssociationTab";
import FranceAssociationTab from "./components/FranceAssociationTab";

type Tab = "checklist" | "map-quiz" | "capitals-quiz" | "association";
type Subject = "eu" | "france";

const TABS: { value: Tab; label: string; icon: React.ReactNode }[] = [
  { value: "checklist", label: "Liste", icon: <Globe size={14} /> },
  { value: "map-quiz", label: "Carte Quiz", icon: <Map size={14} /> },
  {
    value: "capitals-quiz",
    label: "Flashcards",
    icon: <Landmark size={14} />,
  },
  {
    value: "association",
    label: "Association",
    icon: <Link2 size={14} />,
  },
];

const SUBJECTS: { value: Subject; label: string; countryCode: string }[] = [
  { value: "eu", label: "Union Européenne", countryCode: "EU" },
  { value: "france", label: "France", countryCode: "FR" },
];

const App = () => {
  const [activeTab, setActiveTab] = useState<Tab>("checklist");
  const [subject, setSubject] = useState<Subject>("eu");

  return (
    <div
      className={activeTab === "map-quiz" ? "h-dvh flex flex-col" : "min-h-dvh"}
      style={{
        background:
          "linear-gradient(160deg, #fdf2f8 0%, #f5f0fb 40%, #f0f8ff 80%, #f1fbf2 100%)",
      }}
    >
      <header
        className="sticky top-0 z-20 px-4 py-3 shrink-0"
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

      <div className="w-full max-w-2xl mx-auto px-4 pt-4 shrink-0">
        <div
          className="flex rounded-full p-1 gap-1"
          style={{ background: "#f0e6ff" }}
          role="group"
          aria-label="Sélection du sujet"
        >
          {SUBJECTS.map(({ value, label, countryCode }) => {
            const isActive = subject === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setSubject(value)}
                className="flex-1 flex items-center justify-center gap-2 text-sm font-bold rounded-full px-4 py-2 border-2 transition-all duration-200 active:scale-95"
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg, #ede7f6, #e3f2fd)",
                        borderColor: "#9575cd",
                        color: "#6a1b9a",
                        boxShadow: "0 2px 8px #9575cd30",
                        fontFamily: "'Fredoka', system-ui, sans-serif",
                      }
                    : {
                        background: "transparent",
                        borderColor: "transparent",
                        color: "#9575cd",
                        fontFamily: "'Fredoka', system-ui, sans-serif",
                      }
                }
                aria-pressed={isActive}
              >
                <ReactCountryFlag
                  countryCode={countryCode}
                  svg
                  style={{ width: "1.4em", height: "1.4em" }}
                  aria-hidden="true"
                />
                <span className="whitespace-nowrap">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <nav
        className="w-full max-w-2xl mx-auto flex flex-wrap justify-center px-4 pt-3 gap-2 pb-1 shrink-0"
        aria-label="Navigation principale"
      >
        {TABS.map(({ value, label, icon }) => {
          const isActive = activeTab === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setActiveTab(value)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border-2 active:scale-95 transition-transform"
              style={
                isActive
                  ? {
                      background: "linear-gradient(135deg, #ede7f6, #e3f2fd)",
                      borderColor: "#9575cd",
                      color: "#6a1b9a",
                      boxShadow: "0 2px 8px #9575cd30",
                    }
                  : {
                      background: "transparent",
                      borderColor: "#e0d4f5",
                      color: "#9575cd",
                    }
              }
              aria-pressed={isActive}
            >
              {icon}
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <main
        className={
          activeTab === "map-quiz"
            ? "flex-1 min-h-0 overflow-hidden"
            : "max-w-2xl mx-auto pb-20"
        }
      >
        {subject === "eu" && activeTab === "checklist" && <EuropTab />}
        {subject === "eu" && activeTab === "map-quiz" && <MapQuizTab />}
        {subject === "eu" && activeTab === "capitals-quiz" && (
          <CapitalsQuizTab />
        )}
        {subject === "eu" && activeTab === "association" && <AssociationTab />}
        {subject === "france" && activeTab === "association" && (
          <FranceAssociationTab />
        )}
        {subject === "france" && activeTab === "checklist" && <FranceTab />}
        {subject === "france" && activeTab === "map-quiz" && (
          <FranceMapQuizTab />
        )}
        {subject === "france" && activeTab === "capitals-quiz" && (
          <FranceCapitalsQuizTab />
        )}
      </main>
    </div>
  );
};

export default App;
