function fetchOrders() {
    // orders fetch button
    let showOrders = document.createElement("button");
    showOrders.append("Show All orders");
    showOrders.setAttribute("id", "showOrders");
    // showOrders.addEventListener("click", showAllOrders);

    function showAllOrders() {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:3000/orders", true);

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
    }
    adminContainer.appendChild(showOrders);

};