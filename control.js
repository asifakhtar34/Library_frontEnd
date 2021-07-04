console.log("ok");

let prodBtn = document.getElementById("btn");
let list = document.getElementById("bookList");
let bookContainer = document.getElementById("content");
let iframe = document.getElementById("myFrame");


function refreashIframe() {
    iframe.contentWindow.location.reload();
}

// window.onload.addEventListener("click", fetchProducts);

// xhr request to fetch all products

window.onload = function fetchProducts() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/products", true);

    // check with on readystatechange or onload
    xhr.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            //receving all products
            let products = JSON.parse(this.responseText);
            let prodArr = products.products;
            console.log(products.products);
            console.log(products);
            let count = 0;

            let p = document.createElement("p");
            p.append("All Books");
            bookContainer.insertBefore(p, list);
            //looping through all item in products
            prodArr.forEach((item) => {
                let li = document.createElement("li");
                li.classList.add("book", `book${count}`);
                count++;

                let txt = document.createElement("txt");
                // console.log(Object.entries(item))
                // creating an array of all books bcoz to convert object to array so we can loop
                let booksArr = Object.entries(item);
                console.log(booksArr);
                //looping through individual product element and appending to list
                for (let i = 0; i < booksArr.length; i++) {
                    // checking for the request property for setting the link of product details
                    if (i == booksArr.length - 1) {
                        // console.log(booksArr[i][1].url)
                        let a = document.createElement("a");

                        let button = document.createElement("button");
                        button.append("See Details");
                        a.appendChild(button);
                        a.classList.add("detailLink");
                        //when user click on link calls a xhr and appends a div
                        a.addEventListener("click", showProdDetails);

                        function showProdDetails() {
                            var xhr = new XMLHttpRequest();

                            xhr.open("GET", booksArr[i][1].url, true);

                            xhr.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                    console.log(Object.entries(JSON.parse(this.responseText)));
                                    let detailArr = Object.entries(JSON.parse(this.responseText));
                                    detailArr.forEach((elem) => {
                                        let div = document.createElement("div");
                                        let p1 = document.createElement("p");
                                        p1.append(elem[0]);
                                        let p2 = document.createElement("p");
                                        p2.append(elem[1]);
                                        div.appendChild(p1);
                                        div.appendChild(p2);
                                        li.insertBefore(div, a);
                                        // let hide = document.createElement('button');
                                        // hide.append('Hide Details');
                                        // hide.setAttribute('onclick', 'function hide(){ div.style.display = "block"}');
                                        // div.appendChild(hide);
                                        a.removeEventListener("click", showProdDetails);
                                    });
                                } else if (this.status == 404 || this.status == 500) {
                                    alert("'Retry': some issue on server side");
                                }
                            };
                            xhr.send();
                        }

                        // appending the a tag to ul
                        li.appendChild(a);

                        list.appendChild(li);
                    } else {
                        // console.log(booksArr[i])

                        let p1 = document.createElement("p");
                        p1.append(booksArr[i][0]);
                        p1.classList.add("label");
                        let p2 = document.createElement("p");
                        p2.append(booksArr[i][1]);
                        p2.classList.add("value");

                        li.appendChild(p1);
                        li.appendChild(p2);
                        list.appendChild(li);
                    }
                }
            });
            prodBtn.removeEventListener("click", fetchProducts);
        }
    };

    xhr.send();
}

// creating admin logged-in page

let adminLogin = document.getElementById("adminLogin");

adminLogin.addEventListener("click", adminFunc);

function adminFunc() {

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






        let xhr = new XMLHttpRequest;
        let email = document.getElementById("email");
        let password = document.getElementById("password");

        // console.log(email.value)
        // console.log(password.value)
        xhr.open("POST", 'http://localhost:3000/admin/login', true);

        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');


        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // create a new product
                let response = this.responseText;
                addNewProduct(response, form);

            } else if (this.readyState == 4 && this.status == 401) {
                console.log(this.responseText)
                let failed = JSON.parse(this.responseText);
                let p = document.createElement('p');
                p.append(failed.message)
                document.getElementsByTagName("body")[0].appendChild(p);
                setTimeout(() => {
                    p.style.display = "none";
                }, 4000);
                form.reset();


            }
        }
        xhr.send(`email=${email.value}&password=${password.value}`);
        // xhr.send(params)

    }

    // Append the email_ID input to the form
    form.append(ID);

    // Append the password to the form
    form.append(PWD);

    // Append the button to the form
    form.append(s);
    //appending the form to the body
    document.getElementsByTagName("body")[0].appendChild(form);
    adminLogin.removeEventListener("click", adminFunc);

}


function addNewProduct(response, form) {

    // console.log(this.responseText)
    let success = JSON.parse(response);
    // storing jwt in local storage for further access
    localStorage.setItem("jwt", success.token);

    let p = document.createElement('p');
    p.append(success.message);
    //removing the form after sucess login
    document.getElementsByTagName("body")[0].removeChild(form);
    setTimeout(() => {
        p.style.display = "none";
    }, 2500);
    form.reset();


    document.getElementsByTagName("body")[0].appendChild(p);

    //creating post link to add product

    let addProduct = document.createElement("button");
    addProduct.append("Add New Book");
    addProduct.setAttribute("id", "addNewBook");
    addProduct.addEventListener("click", addProducts);

    //logout of Admin
    let logout = document.createElement("button");
    logout.append("Logout")
    logout.setAttribute("id", "logout")
    logout.addEventListener("click", logoutFn)

    function logoutFn() {
        //aftre logout enabaling login func
        adminLogin.addEventListener("click", adminFunc);
        let newBookForm = document.getElementsByClassName("newBookForm")
            //    removing all elements in admin login
        let newBookFormArr = Array.from(newBookForm)
        newBookFormArr.forEach(elem => {
            elem.style.display = "none";
        });
        let refresh = document.getElementsByClassName("refresh")

        let refreshArr = Array.from(refresh)
        refreshArr.forEach(elem => {
            elem.style.display = "none";
        });
        document.getElementById("addNewBook").style.display = "none";

        localStorage.removeItem("jwt");
        document.getElementsByTagName("body")[0].removeChild(logout);
    }

    // sending xhr request to server for adding new products
    function addProducts() {
        // enabling logput
        document.getElementById("logout").disabled = false;
        // form for enterinfg new book details
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

        //refresh all products
        let refresh = document.createElement("button");
        refresh.append("refresh products");
        refresh.setAttribute("class", "refresh");
        refresh.addEventListener("click", () => {
            iframe.contentWindow.location.reload();
        })



        s.setAttribute("id", "productSubmit");

        s.addEventListener("click", productSubmit);
        //this is triggered when new book is submit is hit
        function productSubmit(event) {
            event.preventDefault();
            let xhr = new XMLHttpRequest;

            //grabbing form value to send to server
            let name = document.getElementById("name");
            let price = document.getElementById("price");
            let author = document.getElementById("author");
            let token = localStorage.getItem("jwt");

            if (name.value == "" || price.value == "" || author.value == "") {
                let p = document.createElement('p');
                p.append("PLease Fill out All the Fields");
                productform.appendChild(p);
                setTimeout(() => {
                    productform.removeChild(p)
                }, 2000);
                return;
            }
            // console.log(token)

            xhr.open("POST", 'http://localhost:3000/products', true);

            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 201) {
                    console.log("hello")
                    console.log(this.responseText);
                    productform.reset();

                    // prodBtn.addEventListener("click", fetchProducts);
                }
            }
            xhr.send(`name=${name.value}&price=${price.value}&author=${author.value}&token=${token}`);




        }

        // Append the name input to the form
        productform.append(name);

        // Append the price to the form
        productform.append(price);

        // Append the author to the form
        productform.append(author);

        // Append the submit to the form
        productform.append(s);

        document.getElementsByTagName("body")[0].appendChild(productform);
        document.getElementsByTagName("body")[0].appendChild(refresh);
        console.log("am clicked")
        addProduct.removeEventListener("click", addProducts);







    }
    document.getElementsByTagName("body")[0].appendChild(addProduct);
    document.getElementsByTagName("body")[0].insertBefore(logout, addProduct);








}