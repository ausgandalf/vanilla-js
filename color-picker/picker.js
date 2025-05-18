document.addEventListener("DOMContentLoaded", () => {
  const colorInput = document.getElementById("color-input");
  const colorDisplay = document.getElementById("color-display");

  colorInput.addEventListener("input", () => {
    const color = colorInput.value;
    colorDisplay.textContent = color;
    colorDisplay.style.backgroundColor = color;
    colorDisplay.style.color = "#fff";
    colorDisplay.style.padding = "10px";
  });
});
