console.log("ok");

let prodBtn = document.getElementById("btn");
let list = document.getElementById("bookList");
let bookContainer = document.getElementById("content");
let iframe = document.getElementById("myFrame");
let adminIframe = document.getElementById("adminIframe");
let refresh = document.getElementById("refresh");
let adminLogout = document.getElementById("adminLogout");






// let adminLogoutBtn = document.getElementById("adminLogout");

adminIframe.style.display = "none";
adminLogout.style.display = "none";
// logging admin in appending iframe
function adminlogin() {
    adminIframe.style.display = "block";
    adminLogout.style.display = "block";
}
// logging out admin
function adminloggedOut() {
    adminLogout.style.display = "none";

    localStorage.removeItem("jwt");
    adminIframe.contentWindow.location.reload();
    adminIframe.style.display = "none";
    let p = document.createElement("p");
    p.setAttribute("id", "pass");
    p.append("Admin Logged Out");
    document.getElementsByTagName("body")[0].appendChild(p)
    setTimeout(() => {
        document.getElementsByTagName("body")[0].removeChild(p)
    }, 2000);

}


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
                            let div = document.createElement("div");
                            divCont.setAttribute("id", "detailsCont");
                            li.appendChild(div);

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
};


// logout.addEventListener("click", logoutFn);


// document.getElementsByTagName("body")[0].removeChild(logout);
// let newBookForm = document.getElementsByClassName("newBookForm");
// //    removing all elements in admin login
// let newBookFormArr = Array.from(newBookForm);
// newBookFormArr.forEach((elem) => {
//     elem.style.display = "none";
// });
// let refresh = document.getElementsByClassName("refresh");

// let refreshArr = Array.from(refresh);
// refreshArr.forEach((elem) => {
//     elem.style.display = "none";
// });
// document.getElementById("addNewBook").style.display = "none";
// if (document.getElementById("updateBook")) {

//     document.getElementById("updateBook").style.display = "none";
// }
// if (document.getElementById("updateForm")) {

//     document.getElementById("updateForm").style.display = "none";
// }
// if (document.getElementById("removebookForm")) {

//     document.getElementById("removebookForm").style.display = "none";
// }
// if (document.getElementById("removeBook")) {

//     document.getElementById("removeBook").style.display = "none";
// }