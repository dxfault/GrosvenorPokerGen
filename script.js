function generateNumbers() {
    let num1 = Math.floor(Math.random() * 100) + 1;
    let num2 = Math.floor(Math.random() * 100) + 1;
    document.getElementById("number-display").textContent = ${num1} - ${num2};
}
