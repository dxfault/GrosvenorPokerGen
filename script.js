function generateNumbers() {
    let min1 = parseInt(document.getElementById("min1").value);
    let max1 = parseInt(document.getElementById("max1").value);
    let min2 = parseInt(document.getElementById("min2").value);
    let max2 = parseInt(document.getElementById("max2").value);

    if (isNaN(min1)  isNaN(max1)  isNaN(min2) || isNaN(max2)) {
        alert("Please enter valid numbers for all ranges.");
        return;
    }

    if (min1 > max1 || min2 > max2) {
        alert("Minimum values must be less than maximum values.");
        return;
    }

    let num1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
    let num2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;

    document.getElementById("number-display").textContent = ${num1} - ${num2};
}
