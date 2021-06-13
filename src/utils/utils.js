import config from "./config";

async function performApiCall(endpoint, payload) {
  let data = "";
  if (payload) {
    data = payload;
  }
  const response = await fetch(`${config.apiUrl}${endpoint}`, data)
    .then((res) => res.json())
    .catch((e) => console.log(e));
  return response;
}

export { performApiCall };
