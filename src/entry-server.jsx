import React from "react";
import { renderToString } from "react-dom/server";
import Site from "./Site";
export { routeMetadata } from "./content";
export function render(path) {
  return renderToString(<Site initialPath={path} />);
}
