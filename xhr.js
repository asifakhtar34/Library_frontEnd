console.log("hi")

let getProd = document.getElementById("getProd");

getProd.addEventListener("click", getProduct);

function getProduct() {
    let xhr = new XMLHttpRequest;
    xhr.open("POST", 'http://localhost:3000/products//productdetail', true);


}