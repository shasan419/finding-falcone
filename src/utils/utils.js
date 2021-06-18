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

function createArray(length) {
  let a = new Array(length);
  for (let i = 0; i < length; ++i) a[i] = "";
  return a;
}

function isNotEmptyString(str) {
  if (str !== "") {
    return true;
  }
  return false;
}

function getLocalItem(item) {
  return JSON.parse(localStorage.getItem(item));
}

function setLocalItem(item, data) {
  localStorage.setItem(item, JSON.stringify(data));
}

export {
  performApiCall,
  createArray,
  getLocalItem,
  setLocalItem,
  isNotEmptyString,
};
