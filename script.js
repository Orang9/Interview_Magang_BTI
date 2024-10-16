const inputQuestionPoints = document.getElementById("inputQuestionPoints");
const limitPoint = document.getElementById("limitPoint");
const formSubmit = document.getElementById("formSubmit");
const outputQuestionPoints = document.getElementById("outputQuestionPoints");
const outputLimitPoint = document.getElementById("outputLimitPoint");
const outputAnswer = document.getElementById("outputAnswer");

formSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const points = inputQuestionPoints.value
    .replace(/"/g, "")
    .split(",")
    .map(Number);

  if (points.length > 10) {
    return alert(
      "Input point lebih dari 10 pertanyaan, maksimal 10 pertanyaan"
    );
  } else if (points.some((num) => num < 1)) {
    return alert("Input tidak boleh kurang dari 1");
  }

  const limit = Number(limitPoint.value);

  outputQuestionPoints.innerHTML = points
    .map((point, index) => `[pertanyaan ${index}] => ${point}`)
    .join("<br>");
  outputLimitPoint.textContent = limit;

  const allCombination = [];
  const combination = [];

  function generateCombinations(arr, size, start, temp) {
    if (temp.length === size) {
      allCombination.push([...temp]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      temp.push(arr[i]);
      generateCombinations(arr, size, i + 1, temp);
      temp.pop();
    }
  }

  for (let i = 1; i <= points.length; i++) {
    generateCombinations(points, i, 0, []);
  }

  allCombination.forEach((x) => {
    const sum = x.reduce((acc, currentValue) => acc + currentValue, 0);
    if (sum == limit) {
      combination.push(x);
    }
  });

  outputAnswer.innerHTML =
    combination.length > 0
      ? `<p><strog>Total Combinataions found: ${combination.length}</strog></p>` +
        combination
          .map(
            (arr, index) =>
              `<p>Array (${index}) ${arr
                .map((num, i) => `<br> [${i}] => ${num}`)
                .join(",")}</p>`
          )
          .join("")
      : `<p>No combinations match the limit.</p>`;
});
