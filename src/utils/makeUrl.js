export const apiBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/"
    : `${window.location.origin}/api`;

export const makeUrl = (urlSuff) => `${apiBaseUrl}/${urlSuff}`;

// https://site/api
