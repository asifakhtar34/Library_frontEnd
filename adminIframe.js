let refresh = document.getElementById("refresh");
let OIframe = document.createElement('iframe');
OIframe.setAttribute('id', 'orderIframe');
OIframe.setAttribute('src', "./adminOrdersIframe.html");
// let orderIframe = document.getElementById("orderIframe");
// orderIframe.style.display = "none";

//creaying a separate div to contain all the admin functionality
let adminContainer = document.createElement("div");
adminContainer.setAttribute("id", "adminBox");

// order container
let orderContainer = document.createElement("div");
orderContainer.setAttribute("id", "orderBox");
document.getElementsByTagName("body")[0].appendChild(orderContainer);

orderContainer.style.display = "none";




// creating admin logged-in page
// let adminLogin = document.getElementById("adminLogin");

// adminLogin.addEventListener("click", adminFunc);

window.onload = function adminFunc() {
    // Create a form dynamically
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "#");
    form.setAttribute("id", "adminForm");

    // Create an input element for emailID
    let ID = document.createElement("input");
    ID.setAttribute("type", "email");
    ID.setAttribute("name", "email");
    ID.setAttribute("placeholder", "E-Mail ID");
    ID.setAttribute("id", "email");

    // Create an input element for password
    let PWD = document.createElement("input");
    PWD.setAttribute("type", "password");
    PWD.setAttribute("name", "password");
    PWD.setAttribute("placeholder", "Password");
    PWD.setAttribute("id", "password");

    // Create a submit button
    let s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    s.setAttribute("id", "adminSubmit");

    s.addEventListener("click", adminSubmit);

    //admin login form

    function adminSubmit(event) {
        event.preventDefault();

        let xhr = new XMLHttpRequest();
        let email = document.getElementById("email");
        let password = document.getElementById("password");

        // console.log(email.value)
        // console.log(password.value)
        xhr.open("POST", "http://localhost:3000/admin/login", true);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // create a new product
                let response = this.responseText;
                // console.log(this.responseText)
                let success = JSON.parse(response);
                // storing jwt in local storage for further access
                localStorage.setItem("jwt", success.token);

                let p = document.createElement("p");
                p.setAttribute("id", "pass");
                p.append(success.message);
                //removing the form after sucess login
                adminContainer.removeChild(form);
                adminContainer.appendChild(p);
                setTimeout(() => {
                    adminContainer.removeChild(p);
                }, 2500);
                form.reset();

                // appending the iframe after success login
                document.getElementsByTagName("body")[0].appendChild(OIframe);

                //adding orderBOx after suucess loggin
                // order container



                //after success login show order container
                orderContainer.style.display = "block";





                // document.getElementsByTagName("body")[0].appendChild(p);
                // calling to addproduct
                addNewProduct(response, form);
                // calling to updateProduct
                updateProduct(response, form);

                //delete products
                removeProduct(response, form);

                //showOrders
                // fetchOrders(response, form);

                //refresh ordersList
                resfreshOrders();


            } else if (this.readyState == 4 && this.status == 401) {
                console.log(this.responseText);
                let failed = JSON.parse(this.responseText);
                let p = document.createElement("p");
                p.setAttribute("id", "fail");
                p.append(failed.message);
                adminContainer.appendChild(p);
                setTimeout(() => {
                    adminContainer.removeChild(p);
                }, 2000);
                form.reset();
            }
        };

        xhr.send(`email=${email.value}&password=${password.value}`);
        // xhr.send(params)
    }

    // Append the email_ID input to the form
    form.append(ID);

    // Append the password to the form
    form.append(PWD);

    // Append the button to the form
    form.append(s);
    //appending the form to the adminContainer
    adminContainer.appendChild(form);
    // adminLogin.removeEventListener("click", adminFunc);
    //appenidng the admin container to the body
    document.getElementsByTagName("body")[0].appendChild(adminContainer);
    // adminContainer.appendChild(logout);
}

//called when admin is sucessfully logged in

//add a new product
function addNewProduct(response, form) {
    //creating post link to add product

    let addProduct = document.createElement("button");
    addProduct.append("Add New Book");
    addProduct.setAttribute("id", "addNewBook");
    addProduct.addEventListener("click", addProducts);
    // sending xhr request to server for adding new products
    function addProducts() {
        let productform = document.createElement("form");
        productform.setAttribute("method", "post");
        productform.setAttribute("action", "#");
        productform.setAttribute("class", "newBookForm");

        // Create an input element for name of book
        let name = document.createElement("input");
        name.setAttribute("type", "text");
        name.setAttribute("name", "name");
        name.setAttribute("placeholder", "Book Name");
        name.setAttribute("id", "name");
        name.setAttribute("required", "");

        // Create an input element for price
        let price = document.createElement("input");
        price.setAttribute("type", "number");
        price.setAttribute("name", "price");
        price.setAttribute("placeholder", "price");
        price.setAttribute("id", "price");

        // Create an input element for password
        let author = document.createElement("input");
        author.setAttribute("type", "text");
        author.setAttribute("name", "author");
        author.setAttribute("placeholder", "Author");
        author.setAttribute("id", "author");

        // Create a submit button
        let s = document.createElement("input");
        s.setAttribute("type", "submit");
        s.setAttribute("value", "Submit");
        s.setAttribute("id", "productSubmit");

        s.setAttribute("id", "productSubmit");

        s.addEventListener("click", productSubmit);
        //this is triggered when new book is submit is hit
        function productSubmit(event) {
            event.preventDefault();
            let xhr = new XMLHttpRequest();

            //grabbing form value to send to server
            let name = document.getElementById("name");
            let price = document.getElementById("price");
            let author = document.getElementById("author");
            let token = localStorage.getItem("jwt");

            if (name.value == "" || price.value == "" || author.value == "") {
                let p = document.createElement("p");
                p.append("PLease Fill out All the Fields");
                productform.appendChild(p);
                setTimeout(() => {
                    productform.removeChild(p);
                }, 2000);
                return;
            }
            // console.log(token)

            xhr.open("POST", "http://localhost:3000/products", true);

            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 201) {
                    console.log("hello");
                    console.log(JSON.parse(this.responseText).message);
                    let p = document.createElement("p");
                    p.setAttribute("id", "pass");
                    p.append(JSON.parse(this.responseText).message);
                    adminContainer.appendChild(p);
                    setTimeout(() => {
                        adminContainer.removeChild(p);
                    }, 2000);
                    productform.reset();

                    // prodBtn.addEventListener("click", fetchProducts);
                }
            };
            xhr.send(
                `name=${name.value}&price=${price.value}&author=${author.value}&token=${token}`
            );
        }

        // Append the name input to the form
        productform.append(name);

        // Append the price to the form
        productform.append(price);

        // Append the author to the form
        productform.append(author);

        // Append the submit to the form
        productform.append(s);

        adminContainer.appendChild(productform);
        // adminContainer.appendChild(refresh);
        console.log("am clicked");
        addProduct.removeEventListener("click", addProducts);
    }
    adminContainer.appendChild(addProduct);
}

// update productSubmit
function updateProduct(response, form) {
    //creating post link to add product

    let updateProduct = document.createElement("button");
    updateProduct.append("Update product");
    updateProduct.setAttribute("id", "updateBook");
    updateProduct.addEventListener("click", updateProducts);
    // sending xhr request to server for adding new products
    function updateProducts() {
        let updateForm = document.createElement("form");
        updateForm.setAttribute("method", "post");
        updateForm.setAttribute("action", "#");
        updateForm.setAttribute("id", "updateForm");

        // Create an input element for name of book
        let prodId = document.createElement("input");
        prodId.setAttribute("type", "text");
        prodId.setAttribute("name", "prodId");
        prodId.setAttribute("placeholder", "Product ID");
        prodId.setAttribute("id", "prodId");
        prodId.setAttribute("required", "");

        // Create an input element for price
        let property = document.createElement("input");
        property.setAttribute("type", "text");
        property.setAttribute("name", "property");
        property.setAttribute("placeholder", "What you want to change");
        property.setAttribute("id", "property");

        // Create an input element for password
        let newValue = document.createElement("input");
        newValue.setAttribute("type", "text");
        newValue.setAttribute("name", "newValue");
        newValue.setAttribute("placeholder", "New value");
        newValue.setAttribute("id", "newValue");

        // Create a submit button
        let s = document.createElement("input");
        s.setAttribute("type", "submit");
        s.setAttribute("value", "Submit");
        s.setAttribute("id", "updateProdSubmit");

        s.addEventListener("click", updateSubmit);
        //this is triggered when new book is submit is hit
        function updateSubmit(event) {
            event.preventDefault();

            let xhr = new XMLHttpRequest();

            //grabbing form value to send to server
            let prodId = document.getElementById("prodId");
            let property = document.getElementById("property");
            let newValue = document.getElementById("newValue");
            let token = localStorage.getItem("jwt");

            if (prodId.value == "" || property.value == "" || newValue.value == "") {
                let p = document.createElement("p");
                p.append("PLease Fill out All the Fields");
                updateForm.appendChild(p);
                setTimeout(() => {
                    updateForm.removeChild(p);
                }, 2000);
                return;
            }
            // console.log(token)

            xhr.open("PATCH", "http://localhost:3000/products", true);

            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("hello");
                    console.log(JSON.parse(this.responseText).message);
                    let p = document.createElement("p");
                    p.setAttribute("id", "pass");
                    p.append(JSON.parse(this.responseText).message);
                    adminContainer.appendChild(p);
                    setTimeout(() => {
                        adminContainer.removeChild(p);
                    }, 2000);
                    updateForm.reset();

                    // prodBtn.addEventListener("click", fetchProducts);
                }
            };
            xhr.send(
                `id=${prodId.value}&name=${property.value}&value=${newValue.value}&token=${token}`
            );
        }

        // Append the name input to the form
        updateForm.append(prodId);

        // Append the price to the form
        updateForm.append(property);

        // Append the author to the form
        updateForm.append(newValue);

        // Append the submit to the form
        updateForm.append(s);

        adminContainer.appendChild(updateForm);
        // document.getElementsByTagName("body")[0].appendChild(refresh);
        console.log("am  udpated clicked");
        updateProduct.removeEventListener("click", updateProducts);
    }
    adminContainer.appendChild(updateProduct);
    // document.getElementsByTagName("body")[0].insertBefore(logout, addProduct);
}

//delete the product
function removeProduct(response, form) {
    //creating post link to add product

    let removeProduct = document.createElement("button");
    removeProduct.append("REMOVE BOOK");
    removeProduct.setAttribute("id", "removeBook");
    removeProduct.addEventListener("click", removeProducts);
    // sending xhr request to server for adding new products
    function removeProducts() {
        let removeForm = document.createElement("form");
        removeForm.setAttribute("method", "delete");
        removeForm.setAttribute("action", "#");
        removeForm.setAttribute("id", "removebookForm");

        // Create an input element for name of book
        let rprodId = document.createElement("input");
        rprodId.setAttribute("type", "text");
        rprodId.setAttribute("name", "rprodId");
        rprodId.setAttribute("placeholder", "Product ID");
        rprodId.setAttribute("id", "removeprodId");
        rprodId.setAttribute("required", "");

        // Create a submit button
        let s = document.createElement("input");
        s.setAttribute("type", "submit");
        s.setAttribute("value", "Submit");
        s.setAttribute("id", "removeProdSubmit");

        s.addEventListener("click", removeProdSubmit);
        //this is triggered when new book is submit is hit
        function removeProdSubmit(event) {
            event.preventDefault();
            let xhr = new XMLHttpRequest();

            //grabbing form value to send to server
            let rprodId = document.getElementById("removeprodId");

            let token = localStorage.getItem("jwt");
            // form validation
            if (rprodId.value == "") {
                let p = document.createElement("p");
                p.append("Please Fill out  Field");
                removeForm.appendChild(p);
                setTimeout(() => {
                    removeForm.removeChild(p);
                }, 2000);
                return;
            }
            // console.log(token)

            xhr.open("DELETE", "http://localhost:3000/products", true);

            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("hello");
                    console.log(JSON.parse(this.responseText).message);
                    let p = document.createElement("p");
                    p.setAttribute("id", "pass");
                    p.append(JSON.parse(this.responseText).message);
                    adminContainer.appendChild(p);
                    setTimeout(() => {
                        adminContainer.removeChild(p);
                    }, 2000);

                    removeForm.reset();

                    // prodBtn.addEventListener("click", fetchProducts);
                }
            };
            xhr.send(`id=${rprodId.value}&token=${token}`);
        }

        // Append the name input to the form
        removeForm.append(rprodId);

        // Append the submit to the form
        removeForm.append(s);

        adminContainer.appendChild(removeForm);
        // document.getElementsByTagName("body")[0].appendChild(refresh);
        console.log("am  deleted clicked");
        removeProduct.removeEventListener("click", removeProducts);
    }
    adminContainer.appendChild(removeProduct);
    // document.getElementsByTagName("body")[0].insertBefore(logout, addProduct);
}

// delete below 

//fetching all orders

// orderIframe.onload = function fetchOrders() {
//     // orders fetch button
//     let showOrders = document.createElement("button");
//     showOrders.append("Show All orders");
//     showOrders.setAttribute("id", "showOrders");
//     showOrders.addEventListener("click", showAllOrders);
//     let count = 0;

//     function showAllOrders() {
//         console.log("showorders")



//         // document.getElementsByTagName("body")[0].removeChild(orderContainer);

//         var xhr = new XMLHttpRequest();

//         xhr.open("GET", "http://localhost:3000/orders", true);

//         // check with on readystatechange or onload
//         xhr.onload = function() {
//             if (this.readyState == 4 && this.status == 200) {
//                 //receving all products
//                 let orders = JSON.parse(this.responseText);
//                 console.log(orders);
//                 let ordersCount = orders.count;
//                 let ordersArr = orders.orders;
//                 console.log(ordersCount);
//                 console.log(ordersArr);

//                 //creating table to conatin all ordersArr
//                 let ordersTable = document.createElement('table');
//                 ordersTable.setAttribute("id", 'ordersTable');
//                 let headingRow = ordersTable.insertRow();
//                 let h1 = headingRow.insertCell();
//                 let h2 = headingRow.insertCell();
//                 let h3 = headingRow.insertCell();
//                 let h4 = headingRow.insertCell();
//                 let h5 = headingRow.insertCell();
//                 let h6 = headingRow.insertCell();
//                 let h7 = headingRow.insertCell();
//                 let h8 = headingRow.insertCell();

//                 h1.innerHTML = "S.No";
//                 h2.innerHTML = "Order-ID";
//                 h3.innerHTML = "Product-Id";
//                 h4.innerHTML = "Book-Name";
//                 h5.innerHTML = "User-ID";
//                 h6.innerHTML = "User-Name";
//                 h7.innerHTML = "Mobile";
//                 h8.innerHTML = "Quantity";



//                 //looping through the 
//                 ordersArr.forEach((item) => {

//                 })


//                 orderContainer.appendChild(ordersTable);
//                 // showOrders.removeEventListener("click", showAllOrders);
//                 // orderIframe.document.getElementsByTagName("body")[0].appendChild(orderContainer);

//             }
//         };

//         xhr.send();
//     }

//     // adminContainer.appendChild(showOrders);

//     // orderIframe.document.getElementsByTagName("body")[0].appendChild(orderContainer);

// };

function resfreshOrders() {
    let refreshOrdersPage = document.createElement("button");
    refreshOrdersPage.append("Refresh Orders");
    refreshOrdersPage.setAttribute("id", "refreshOrders");
    refreshOrdersPage.addEventListener("click", () => {

        OIframe.contentWindow.location.reload();
    });
    adminContainer.appendChild(refreshOrdersPage);


}