import { defineConfig } from "vite";
import {resolve} from "path";


export default defineConfig({
  build: {
    
    rollupOptions: 
    { 
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "aboutUs.html"),
        contact: resolve(__dirname, "contactUs.html"),
        product: resolve(__dirname, "product.html"),
        signup: resolve(__dirname, "signup.html"),
        login: resolve(__dirname, "login.html")
      },
    },
  },
});