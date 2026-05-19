const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

const geometrySelect = document.querySelector("#geometrySelect");
const areaRange = document.querySelector("#areaRange");
const areaValue = document.querySelector("#areaValue");
const angleSum = document.querySelector("#angleSum");
const parallelCount = document.querySelector("#parallelCount");
const geometryNote = document.querySelector("#geometryNote");

const diskBoundary = document.querySelector("#diskBoundary");
const sphereGuide = document.querySelector("#sphereGuide");
const baseLine = document.querySelector("#baseLine");
const parallelOne = document.querySelector("#parallelOne");
const parallelTwo = document.querySelector("#parallelTwo");
const trianglePath = document.querySelector("#trianglePath");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((item) => item.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));

    tab.classList.add("active");
    document.querySelector(`#${target}`).classList.add("active");
  });
});

function setEuclideanDiagram() {
  diskBoundary.classList.add("hidden");
  sphereGuide.classList.add("hidden");
  baseLine.setAttribute("d", "M 120 215 L 500 215");
  parallelOne.setAttribute("d", "M 120 125 L 500 125");
  parallelTwo.setAttribute("d", "M 120 85 L 500 85");
  trianglePath.setAttribute("d", "M 210 215 L 310 115 L 430 215 Z");
}

function setSphericalDiagram() {
  diskBoundary.classList.add("hidden");
  sphereGuide.classList.remove("hidden");
  baseLine.setAttribute("d", "M 182 165 A 128 74 0 0 1 438 165");
  parallelOne.setAttribute("d", "M 182 165 A 128 74 0 0 0 438 165");
  parallelTwo.setAttribute("d", "M 310 91 A 128 74 0 1 1 309.9 91");
  trianglePath.setAttribute("d", "M 310 91 A 128 74 0 0 1 438 165 A 128 74 0 0 1 182 165 A 128 74 0 0 1 310 91");
}

function setHyperbolicDiagram() {
  diskBoundary.classList.remove("hidden");
  sphereGuide.classList.add("hidden");
  baseLine.setAttribute("d", "M 205 235 A 210 210 0 0 1 415 235");
  parallelOne.setAttribute("d", "M 140 125 A 170 170 0 0 1 420 195");
  parallelTwo.setAttribute("d", "M 140 125 A 210 210 0 0 1 380 235");
  trianglePath.setAttribute("d", "M 250 220 A 120 120 0 0 1 310 90 A 120 120 0 0 1 370 220 Z");
}

function updateInteractive() {
  const geometry = geometrySelect.value;
  const area = Number(areaRange.value);
  let curvature = 0;
  let parallels = "1";
  let note = "";

  if (geometry === "spherical") {
    curvature = 1;
    parallels = "0";
    note = "Na esfera, as geodésicas são círculos máximos e quaisquer duas acabam por se intersectar.";
    setSphericalDiagram();
  } else if (geometry === "hyperbolic") {
    curvature = -1;
    parallels = "infinitas";
    note = "Na geometria hiperbólica, o defeito angular cresce com a área do triângulo.";
    setHyperbolicDiagram();
  } else {
    parallels = "1";
    note = "No plano euclidiano, a soma dos ângulos internos de um triângulo é sempre 180°.";
    setEuclideanDiagram();
  }

  const angleDegrees = 180 + (curvature * area * 180) / Math.PI;

  areaValue.textContent = area.toFixed(2);
  angleSum.textContent = `${angleDegrees.toFixed(1)}°`;
  parallelCount.textContent = parallels;
  geometryNote.textContent = note;
}

geometrySelect.addEventListener("change", updateInteractive);
areaRange.addEventListener("input", updateInteractive);

updateInteractive();
