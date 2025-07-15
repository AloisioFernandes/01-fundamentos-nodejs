export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g;

  return path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9\\-]+)");
}