import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
/* import dns from "dns"; //added this

dns.setDefaultResultOrder("verbatim"); */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //the shit under here was added
  /*  server: {
    host: "localhost",
    port: 3002,
  }, */
});

//npm run dev -- --host
