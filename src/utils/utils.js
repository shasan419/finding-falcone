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

function updateSelectedArray(selectedArray, wholeArray, type) {
  let nameArray = wholeArray.map((x) => {
    return x.name;
  });
  selectedArray.forEach((x) => {
    let index = nameArray.indexOf(x);
    if (index > -1) {
      if (type === "planets") {
        wholeArray.splice(index, 1);
        nameArray.splice(index, 1);
      } else if (type === "vehicles") {
        if (wholeArray[index].total_no > 0) {
          wholeArray[index].total_no -= 1;
        }
      }
    }
  });
  return wholeArray;
}

function updateTimeTaken(selectedPlanets, selectedVehicles) {
  let timeTaken = 0;
  for (let i = 0; i < selectedPlanets.length; i++) {
    if (
      isNotEmptyString(selectedPlanets[i]) &&
      isNotEmptyString(selectedVehicles[i])
    ) {
      let planet = JSON.parse(localStorage.getItem("planets")).filter(
        (x) => x.name === selectedPlanets[i]
      );
      let vehicle = JSON.parse(localStorage.getItem("vehicles")).filter(
        (x) => x.name === selectedVehicles[i]
      );
      timeTaken += planet[0].distance / vehicle[0].speed;
    }
  }
  return timeTaken;
}

function isNotEmptyString(str) {
  if (str !== "") {
    return true;
  }
  return false;
}

export { performApiCall, updateSelectedArray, updateTimeTaken, createArray };
