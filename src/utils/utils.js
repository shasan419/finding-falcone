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

function updateSelectedArray(selectedArray, wholeArray, type) {
  let name = wholeArray.map((x) => {
    return x.name;
  });
  selectedArray.forEach((x) => {
    let index = name.indexOf(x);
    if (index > -1) {
      if (type === "planets") {
        wholeArray.splice(index, 1);
        name.splice(index, 1);
      } else {
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
    if (selectedPlanets[i] !== "" && selectedVehicles[i] !== "") {
      timeTaken +=
        JSON.parse(localStorage.getItem("planets")).filter(
          (x) => x.name === selectedPlanets[i]
        )[0].distance /
        JSON.parse(localStorage.getItem("vehicles")).filter(
          (x) => x.name === selectedVehicles[i]
        )[0].speed;
    }
  }
  return timeTaken;
}

export { performApiCall, updateSelectedArray, updateTimeTaken };
