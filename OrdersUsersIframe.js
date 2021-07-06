// let orderIframe = document.getElementById("orderIframe").contentWindow;

// orderIframe.onload = function fetchOrders() {
// orders fetch button
// let showOrders = document.createElement("button");
// showOrders.append("Show All orders");
// showOrders.setAttribute("id", "showOrders");
// showOrders.addEventListener("click", showAllOrders);
// let count = 0;

window.onload = function showAllOrders() {
    console.log("showorders")



    // document.getElementsByTagName("body")[0].removeChild(orderContainer);

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/orders", true);

    // check with on readystatechange or onload
    xhr.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            //receving all products
            let orders = JSON.parse(this.responseText);
            console.log(orders);
            let ordersCount = orders.count;
            let ordersArr = orders.orders;
            console.log(ordersCount);
            console.log(ordersArr);

            //creating table to conatin all ordersArr
            let ordersTable = document.createElement('table');
            ordersTable.setAttribute("id", 'ordersTable');
            let headingRow = ordersTable.insertRow();
            let h1 = headingRow.insertCell();
            let h2 = headingRow.insertCell();
            let h3 = headingRow.insertCell();
            let h4 = headingRow.insertCell();
            let h5 = headingRow.insertCell();
            let h6 = headingRow.insertCell();
            let h7 = headingRow.insertCell();
            let h8 = headingRow.insertCell();

            h1.innerHTML = "S.No";
            h2.innerHTML = "Order-ID";
            h3.innerHTML = "Product-Id";
            h4.innerHTML = "Book-Name";
            h5.innerHTML = "User-ID";
            h6.innerHTML = "User-Name";
            h7.innerHTML = "Mobile";
            h8.innerHTML = "Quantity";



            //looping through the 
            ordersArr.forEach((item) => {

            })


            // orderContainer.appendChild(ordersTable);
            // showOrders.removeEventListener("click", showAllOrders);
            document.getElementsByTagName("body")[0].appendChild(ordersTable);

        }
    };

    xhr.send();
}

// adminContainer.appendChild(showOrders);

// orderIframe.document.getElementsByTagName("body")[0].appendChild(orderContainer);



// create a vie all users table