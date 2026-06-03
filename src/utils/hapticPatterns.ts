import { useWebHaptics } from "web-haptics/react";
import { useCallback } from "react";

interface HapticVibration {
  duration: number;
  intensity?: number;
  delay?: number;
}

const SUCCESS_PATTERN: HapticVibration[] = [
  { duration: 30 },
  { delay: 60, duration: 40, intensity: 1 },
];

const ERROR_PATTERN: HapticVibration[] = [
  { duration: 40, intensity: 0.7 },
  { delay: 40, duration: 40, intensity: 0.7 },
  { delay: 40, duration: 40, intensity: 0.9 },
  { delay: 40, duration: 50, intensity: 0.6 },
];

// cancel() avant trigger() est obligatoire pour les taps rapides :
// navigator.vibrate() est ignoré sur de nombreux Android si une vibration
// est déjà en cours (comportement non-spec mais très répandu).
export const useHaptics = () => {
  const { trigger, cancel } = useWebHaptics();

  const tick = useCallback(() => {
    cancel();
    trigger(40);
  }, [cancel, trigger]);

  const success = useCallback(() => {
    trigger(SUCCESS_PATTERN);
  }, [trigger]);

  const error = useCallback(() => {
    trigger(ERROR_PATTERN);
  }, [trigger]);

  return { tick, success, error };
};
