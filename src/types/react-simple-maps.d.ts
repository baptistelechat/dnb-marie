declare module "react-simple-maps" {
  import type { CSSProperties, ReactNode } from "react";

  interface GeoObject {
    rsmKey: string;
    id: string;
    type: string;
    properties: Record<string, unknown>;
    geometry: unknown;
  }

  interface GeoStyle {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    outline?: string;
    cursor?: string;
    animation?: string;
  }

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, number | string | number[]>;
    width?: number;
    height?: number;
    style?: CSSProperties;
    children?: ReactNode;
  }

  interface GeographiesProps {
    geography: string;
    children: (props: { geographies: GeoObject[] }) => ReactNode;
  }

  interface GeographyProps {
    geography: GeoObject;
    onClick?: () => void;
    style?: {
      default?: GeoStyle;
      hover?: GeoStyle;
      pressed?: GeoStyle;
    };
    "aria-label"?: string;
    role?: string;
    tabIndex?: number;
  }

  export const ComposableMap: (props: ComposableMapProps) => ReactNode;
  export const Geographies: (props: GeographiesProps) => ReactNode;
  export const Geography: (props: GeographyProps) => ReactNode;
}
