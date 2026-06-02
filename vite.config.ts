import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { qrcode } from "vite-plugin-qrcode";

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [react(), tailwindcss(), qrcode()],
});
