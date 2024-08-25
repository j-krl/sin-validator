function validate(val: string) {
  if (val.length !== 9) {
    return false;
  }
  const doubled = val.split("").map((x, i) => {
    const num = parseInt(x);
    if (i % 2 === 0) {
      return num;
    }
    const d = num * 2;
    if (d < 10) {
      return d;
    }
    const doubledArr = d.toString().split("");
    return parseInt(doubledArr[0]) + parseInt(doubledArr[1]);
  });
  const sum = doubled.reduce((acc, curr) => acc + curr, 0);
  return sum % 10 === 0;
}

document
  .querySelector("#validate-button")
  .addEventListener("click", function () {
    const input: HTMLInputElement = document.querySelector("#sin-input");
    const isValid = validate(input.value);
    const resultElement: HTMLDivElement = document.querySelector(
      "#validation-result-wrapper",
    );
    const validationClass = `validation-${isValid ? "success" : "error"}`;
    const message = isValid ? "SIN is valid" : "Not a valid SIN";
    resultElement.classList.add(validationClass);
    (resultElement.firstElementChild as HTMLDivElement).innerText = message;
    resultElement.style.display = "flex";
  });

document
  .querySelector("#masked-sin-input")
  .addEventListener("input", function (this: HTMLInputElement) {
    const resultElement: HTMLDivElement = document.querySelector(
      "#validation-result-wrapper",
    );
    resultElement.style.display = "none";
    resultElement.classList.remove("validation-success", "validation-error");
    const input: HTMLInputElement = document.querySelector("#sin-input");
    input.value = this.value.replace(/\D/g, "");
    this.value = input.value.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");
  });
