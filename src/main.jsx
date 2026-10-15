import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import Site from "./Site";
import "./site.css";

const root = document.getElementById("root");
const app = <Site initialPath={window.location.pathname} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
