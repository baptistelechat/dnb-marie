import { useState } from "react";
import {
  AlignCenter,
  ArrowUpDown,
  BookOpen,
  Calendar,
  Camera,
  Globe,
  HelpCircle,
  Landmark,
  Layers,
  Link2,
  List,
  Map,
  Sparkles,
  User,
} from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import EuropTab from "./components/EuropTab";
import MapQuizTab from "./components/MapQuizTab";
import CapitalsQuizTab from "./components/CapitalsQuizTab";
import FranceTab from "./components/FranceTab";
import FranceMapQuizTab from "./components/FranceMapQuizTab";
import FranceCapitalsQuizTab from "./components/FranceCapitalsQuizTab";
import AssociationTab from "./components/AssociationTab";
import FranceAssociationTab from "./components/FranceAssociationTab";
import FriseLectureTab from "./components/FriseLectureTab";
import FriseOrdonnnerTab from "./components/FriseOrdonnnerTab";
import HistoirePersonnagesTab from "./components/HistoirePersonnagesTab";
import HistoryDatesAssociationTab from "./components/HistoryDatesAssociationTab";
import HistoryDatesFlashcardTab from "./components/HistoryDatesFlashcardTab";
import HistoryPersonnagesAssociationTab from "./components/HistoryPersonnagesAssociationTab";
import PhotoFlashcardTab from "./components/PhotoFlashcardTab";
import QuiSuisJeTab from "./components/QuiSuisJeTab";

type Domain = "geo" | "histoire";
type GeoTab = "checklist" | "map-quiz" | "capitals-quiz" | "association";
type GeoSubject = "eu" | "france";
type HistorySubject = "dates" | "personnages";
type HistoryTabDates = "frise" | "ordonner" | "flashcards" | "association";
type HistoryTabPersonnages = "liste" | "association" | "photos" | "quiz";
type HistoryTab = HistoryTabDates | HistoryTabPersonnages;

const DOMAINS: { value: Domain; label: string; icon: React.ReactNode }[] = [
  { value: "geo", label: "Géographie", icon: <Globe size={13} /> },
  { value: "histoire", label: "Histoire", icon: <BookOpen size={13} /> },
];

const GEO_SUBJECTS: {
  value: GeoSubject;
  label: string;
  countryCode: string;
}[] = [
  { value: "eu", label: "Union Européenne", countryCode: "EU" },
  { value: "france", label: "France", countryCode: "FR" },
];

const HISTORY_SUBJECTS: {
  value: HistorySubject;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "dates", label: "Dates", icon: <Calendar size={14} /> },
  { value: "personnages", label: "Personnages", icon: <User size={14} /> },
];

const GEO_TABS: { value: GeoTab; label: string; icon: React.ReactNode }[] = [
  { value: "checklist", label: "Liste", icon: <Globe size={14} /> },
  { value: "map-quiz", label: "Carte Quiz", icon: <Map size={14} /> },
  { value: "capitals-quiz", label: "Flashcards", icon: <Landmark size={14} /> },
  { value: "association", label: "Association", icon: <Link2 size={14} /> },
];

const HISTORY_TABS_DATES: {
  value: HistoryTabDates;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "frise", label: "Frise", icon: <AlignCenter size={14} /> },
  { value: "ordonner", label: "Ordonner", icon: <ArrowUpDown size={14} /> },
  { value: "flashcards", label: "Flashcards", icon: <Layers size={14} /> },
  { value: "association", label: "Association", icon: <Link2 size={14} /> },
];

const HISTORY_TABS_PERSONNAGES: {
  value: HistoryTabPersonnages;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "liste", label: "Liste", icon: <List size={14} /> },
  { value: "association", label: "Association", icon: <Link2 size={14} /> },
  { value: "photos", label: "Photos", icon: <Camera size={14} /> },
  { value: "quiz", label: "Qui suis-je ?", icon: <HelpCircle size={14} /> },
];

const pillActiveStyle = {
  background: "linear-gradient(135deg, #ede7f6, #e3f2fd)",
  borderColor: "#9575cd",
  color: "#6a1b9a",
  boxShadow: "0 2px 8px #9575cd30",
  fontFamily: "'Fredoka', system-ui, sans-serif",
} as const;

const pillInactiveStyle = {
  background: "transparent",
  borderColor: "transparent",
  color: "#9575cd",
  fontFamily: "'Fredoka', system-ui, sans-serif",
} as const;

const App = () => {
  const [domain, setDomain] = useState<Domain>("geo");
  const [geoSubject, setGeoSubject] = useState<GeoSubject>("eu");
  const [geoTab, setGeoTab] = useState<GeoTab>("checklist");
  const [historySubject, setHistorySubject] = useState<HistorySubject>("dates");
  const [historyTab, setHistoryTab] = useState<HistoryTab>("frise");

  const handleHistorySubjectChange = (s: HistorySubject) => {
    setHistorySubject(s);
    setHistoryTab(s === "dates" ? "frise" : "liste");
  };

  const activeTabs =
    domain === "geo"
      ? GEO_TABS
      : historySubject === "dates"
        ? HISTORY_TABS_DATES
        : HISTORY_TABS_PERSONNAGES;

  const activeTab = domain === "geo" ? geoTab : historyTab;

  const handleTabChange = (value: string) => {
    if (domain === "geo") setGeoTab(value as GeoTab);
    else setHistoryTab(value as HistoryTab);
  };

  const isMapQuizActive = domain === "geo" && geoTab === "map-quiz";

  return (
    <div
      className={isMapQuizActive ? "h-dvh flex flex-col" : "min-h-dvh"}
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

          <div className="flex-1 min-w-0">
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
            className="flex rounded-full p-0.5 gap-0.5 shrink-0"
            style={{ background: "#f0e6ff" }}
            role="group"
            aria-label="Sélection du domaine"
          >
            {DOMAINS.map(({ value, label, icon }) => {
              const isActive = domain === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDomain(value)}
                  className="flex items-center gap-1.5 text-xs font-bold rounded-full px-2.5 py-1.5 border-2 transition-all duration-200 active:scale-95"
                  style={isActive ? pillActiveStyle : pillInactiveStyle}
                  aria-pressed={isActive}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="w-full max-w-2xl mx-auto px-4 pt-4 shrink-0">
        {domain === "geo" ? (
          <div
            className="flex rounded-full p-1 gap-1"
            style={{ background: "#f0e6ff" }}
            role="group"
            aria-label="Sélection du sujet"
          >
            {GEO_SUBJECTS.map(({ value, label, countryCode }) => {
              const isActive = geoSubject === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setGeoSubject(value)}
                  className="flex-1 flex items-center justify-center gap-2 text-sm font-bold rounded-full px-4 py-2 border-2 transition-all duration-200 active:scale-95"
                  style={isActive ? pillActiveStyle : pillInactiveStyle}
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
        ) : (
          <div
            className="flex rounded-full p-1 gap-1"
            style={{ background: "#f0e6ff" }}
            role="group"
            aria-label="Sélection du sous-domaine"
          >
            {HISTORY_SUBJECTS.map(({ value, label, icon }) => {
              const isActive = historySubject === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleHistorySubjectChange(value)}
                  className="flex-1 flex items-center justify-center gap-2 text-sm font-bold rounded-full px-4 py-2 border-2 transition-all duration-200 active:scale-95"
                  style={isActive ? pillActiveStyle : pillInactiveStyle}
                  aria-pressed={isActive}
                >
                  {icon}
                  <span className="whitespace-nowrap">{label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <nav
        className="w-full max-w-2xl mx-auto flex flex-wrap justify-center px-4 pt-3 gap-2 pb-1 shrink-0"
        aria-label="Navigation principale"
      >
        {activeTabs.map(({ value, label, icon }) => {
          const isActive = activeTab === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => handleTabChange(value)}
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
          isMapQuizActive
            ? "flex-1 min-h-0 overflow-hidden"
            : "max-w-2xl mx-auto pb-20"
        }
      >
        {domain === "geo" && geoSubject === "eu" && geoTab === "checklist" && (
          <EuropTab />
        )}
        {domain === "geo" && geoSubject === "eu" && geoTab === "map-quiz" && (
          <MapQuizTab />
        )}
        {domain === "geo" &&
          geoSubject === "eu" &&
          geoTab === "capitals-quiz" && <CapitalsQuizTab />}
        {domain === "geo" &&
          geoSubject === "eu" &&
          geoTab === "association" && <AssociationTab />}
        {domain === "geo" &&
          geoSubject === "france" &&
          geoTab === "checklist" && <FranceTab />}
        {domain === "geo" &&
          geoSubject === "france" &&
          geoTab === "map-quiz" && <FranceMapQuizTab />}
        {domain === "geo" &&
          geoSubject === "france" &&
          geoTab === "capitals-quiz" && <FranceCapitalsQuizTab />}
        {domain === "geo" &&
          geoSubject === "france" &&
          geoTab === "association" && <FranceAssociationTab />}
        {domain === "histoire" &&
          historySubject === "dates" &&
          historyTab === "frise" && <FriseLectureTab />}
        {domain === "histoire" &&
          historySubject === "dates" &&
          historyTab === "ordonner" && <FriseOrdonnnerTab />}
        {domain === "histoire" &&
          historySubject === "dates" &&
          historyTab === "flashcards" && <HistoryDatesFlashcardTab />}
        {domain === "histoire" &&
          historySubject === "dates" &&
          historyTab === "association" && <HistoryDatesAssociationTab />}
        {domain === "histoire" &&
          historySubject === "personnages" &&
          historyTab === "liste" && <HistoirePersonnagesTab />}
        {domain === "histoire" &&
          historySubject === "personnages" &&
          historyTab === "association" && <HistoryPersonnagesAssociationTab />}
        {domain === "histoire" &&
          historySubject === "personnages" &&
          historyTab === "photos" && <PhotoFlashcardTab />}
        {domain === "histoire" &&
          historySubject === "personnages" &&
          historyTab === "quiz" && <QuiSuisJeTab />}
        {domain === "histoire" &&
          !(historySubject === "dates" && historyTab === "frise") &&
          !(historySubject === "dates" && historyTab === "ordonner") &&
          !(historySubject === "dates" && historyTab === "flashcards") &&
          !(historySubject === "dates" && historyTab === "association") &&
          !(historySubject === "personnages" && historyTab === "liste") &&
          !(historySubject === "personnages" && historyTab === "association") &&
          !(historySubject === "personnages" && historyTab === "photos") &&
          !(historySubject === "personnages" && historyTab === "quiz") && (
            <div className="p-8 text-center">
              <p
                className="text-2xl mb-2"
                style={{
                  fontFamily: "'Fredoka', system-ui, sans-serif",
                  color: "#9575cd",
                }}
              >
                Bientôt disponible ✨
              </p>
              <p className="text-sm text-slate-400">
                Module en cours de développement
              </p>
            </div>
          )}
      </main>
    </div>
  );
};

export default App;
