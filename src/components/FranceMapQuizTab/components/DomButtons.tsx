import type { Region } from "../../../data/frenchRegions";
import DomMiniMap from "./DomMiniMap";

interface DomButtonsProps {
  regions: Region[];
  activeCode: string | null;
  answeredCodes: Set<string>;
  pulsingCode: string | null;
  isInteractive: boolean;
  onSelect: (code: string) => void;
}

const DomButtons = ({
  regions,
  activeCode,
  answeredCodes,
  pulsingCode,
  isInteractive,
  onSelect,
}: DomButtonsProps) => {
  if (regions.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 shrink-0 justify-center items-center">
      {regions.map((region) => (
        <DomMiniMap
          key={region.code}
          code={region.code}
          name={region.name}
          isActive={region.code === activeCode}
          isAnswered={answeredCodes.has(region.code)}
          isPulsing={region.code === pulsingCode}
          isInteractive={isInteractive}
          onSelect={() => onSelect(region.code)}
        />
      ))}
    </div>
  );
};

export default DomButtons;
