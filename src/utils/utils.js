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

function removeSelected(selectedArray, wholeArray) {
  let onlyName = wholeArray.map((x) => {
    return x.name;
  });
  selectedArray.forEach((x) => {
    let index = onlyName.indexOf(x);
    if (index > -1) {
      wholeArray.splice(index, 1);
      onlyName.splice(index, 1);
    }
  });
  return wholeArray;
}

export { performApiCall, removeSelected };
