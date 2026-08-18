import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// The build pre-renders static routes to real HTML (scripts/prerender.mjs) so
// crawlers and no-JS clients get full content on the first response. On the
// client we do a normal render over that markup rather than hydrateRoot: this
// app is heavily driven by framer-motion scroll-reveal animations whose initial
// state can't match a post-animation DOM snapshot, so hydration would mismatch.
// A clean render boots the interactive app exactly as it runs today, while the
// pre-rendered HTML still does its job for search engines.
createRoot(document.getElementById("root")!).render(<App />);
