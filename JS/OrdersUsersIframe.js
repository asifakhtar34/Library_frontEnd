// let orderIframe = document.getElementById("orderIframe").contentWindow;

// orderIframe.onload = function fetchOrders() {
// orders fetch button
// let showOrders = document.createElement("button");
// showOrders.append("Show All orders");
// showOrders.setAttribute("id", "showOrders");
// showOrders.addEventListener("click", showAllOrders);
// let count = 0;

let orderHead = document.getElementById("orderhead");
let userHead = document.getElementById("userHead");

window.onload = function showAllOrders() {
    // console.log("showorders")

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
            // console.log(ordersCount);
            console.log(ordersArr);

            let orderSno = 1;

            //creating table to conatin all ordersArr
            let ordersTable = document.createElement("table");
            ordersTable.setAttribute("id", "ordersTable");
            let headingRow = ordersTable.insertRow();
            let h1 = headingRow.insertCell();
            let h2 = headingRow.insertCell();
            let h3 = headingRow.insertCell();
            let h4 = headingRow.insertCell();
            let h5 = headingRow.insertCell();
            let h6 = headingRow.insertCell();

            let h7 = headingRow.insertCell();

            h1.innerHTML = "S.No";
            h2.innerHTML = "Order-ID";
            h3.innerHTML = "Product-Id";
            h4.innerHTML = "Book-Name";
            h5.innerHTML = "User-ID";
            h6.innerHTML = "User-Name";

            h7.innerHTML = "Date Of Issue";

            //looping through all the orders
            ordersArr.forEach((item) => {
                let ordersRow = ordersTable.insertRow();
                console.log(Object.entries(item));
                let IndorederArr = Object.entries(item);

                //    inserting orderS.no
                let orderCell = ordersRow.insertCell();
                orderCell.innerHTML = orderSno;
                orderSno++;

                //looping through individual orders
                for (let i = 0; i < IndorederArr.length; i++) {
                    if (i == 0) {
                        console.log(IndorederArr[i][1]);
                        let orderCell = ordersRow.insertCell();
                        orderCell.innerHTML = IndorederArr[i][1];
                    } else if (i == 1) {
                        console.log(IndorederArr[i][1]._id);
                        //inserting productId in table row
                        let orderCell = ordersRow.insertCell();
                        orderCell.innerHTML = IndorederArr[i][1]._id;
                        //inserting productname in table row
                        let orderCell1 = ordersRow.insertCell();
                        orderCell1.innerHTML = IndorederArr[i][1].name;
                    } else if (i == 2) {
                        console.log(IndorederArr[i][1]._id);
                        //inserting userID in table row
                        let orderCell = ordersRow.insertCell();
                        orderCell.innerHTML = IndorederArr[i][1]._id;
                        //inserting UserName in table row
                        let orderCell1 = ordersRow.insertCell();
                        orderCell1.innerHTML = IndorederArr[i][1].name;
                    } else if (i == 3) {
                        //inserting UserName in table row
                        let orderCell1 = ordersRow.insertCell();
                        orderCell1.innerHTML = IndorederArr[i][1].toLocaleString();
                    }
                }
            });

            orderHead.appendChild(ordersTable);
        }
    };

    xhr.send();

    //getting all usersArr
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/user/allUsers", true);

    // check with on readystatechange or onload
    xhr.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            //receving all products
            let users = JSON.parse(this.responseText);
            console.log(users);

            let usersArr = users.allUsers;
            // console.log(ordersCount);
            console.log(usersArr);

            let userSno = 1;

            //creating table to conatin all usersArr
            let usersTable = document.createElement("table");
            usersTable.setAttribute("id", "usersTable");
            let headingRow = usersTable.insertRow();
            let h1 = headingRow.insertCell();
            let h2 = headingRow.insertCell();
            let h3 = headingRow.insertCell();
            let h4 = headingRow.insertCell();
            let h5 = headingRow.insertCell();




            h1.innerHTML = "S.No";
            h2.innerHTML = "User-ID";
            h3.innerHTML = "EmailID";
            h4.innerHTML = "Name";
            h5.innerHTML = "Mobile No.";

            //looping through all the orders
            usersArr.forEach((item) => {
                let userRow = usersTable.insertRow();
                console.log(Object.entries(item));
                let InduserArr = Object.entries(item);

                //    inserting orderS.no
                let userCell = userRow.insertCell();
                userCell.innerHTML = userSno;
                userSno++;

                //looping through individual orders
                for (let i = 0; i < InduserArr.length; i++) {
                    if (i == 0) {
                        let userCell = userRow.insertCell();
                        userCell.innerHTML = InduserArr[i][1];
                    } else if (i == 1) {
                        let userCell = userRow.insertCell();
                        userCell.innerHTML = InduserArr[i][1];
                    } else if (i == 2) {
                        let userCell = userRow.insertCell();
                        userCell.innerHTML = InduserArr[i][1];
                    } else if (i == 3) {
                        let userCell = userRow.insertCell();
                        userCell.innerHTML = InduserArr[i][1];
                    }
                }
            });

            userHead.appendChild(usersTable);
        }
    };

    xhr.send();
};

// create a vie all users table
// window.onload = function showAllUsers() {
//     // console.log("showorders")

//     // document.getElementsByTagName("body")[0].removeChild(orderContainer);

//     var xhr = new XMLHttpRequest();

//     xhr.open("GET", "http://localhost:3000/user/allUsers", true);

//     // check with on readystatechange or onload
//     xhr.onload = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             //receving all products
//             let users = JSON.parse(this.responseText);
//             console.log(users);

//             let usersArr = users.allUsers;
//             // console.log(ordersCount);
//             console.log(usersArr);

//             let userSno = 1;

//             //creating table to conatin all usersArr
//             let usersTable = document.createElement("table");
//             usersTable.setAttribute("id", "ordersTable");
//             let headingRow = usersTable.insertRow();
//             let h1 = headingRow.insertCell();
//             let h2 = headingRow.insertCell();
//             let h3 = headingRow.insertCell();
//             let h4 = headingRow.insertCell();
//             let h5 = headingRow.insertCell();
//             let h6 = headingRow.insertCell();

//             let h7 = headingRow.insertCell();

//             h1.innerHTML = "S.No";
//             h2.innerHTML = "Order-ID";
//             h3.innerHTML = "Product-Id";
//             h4.innerHTML = "Book-Name";
//             h5.innerHTML = "User-ID";
//             h6.innerHTML = "User-Name";

//             h7.innerHTML = "Date Of Issue";

//             //looping through all the orders
//             usersArr.forEach((item) => {
//                 let userRow = usersTable.insertRow();
//                 console.log(Object.entries(item));
//                 let InduserArr = Object.entries(item);

//                 //    inserting orderS.no
//                 let userCell = userRow.insertCell();
//                 userCell.innerHTML = userSno;
//                 userSno++;

//                 //looping through individual orders
//                 for (let i = 0; i < InduserArr.length; i++) {

//                 }
//             });

//             userHead.appendChild(usersTable);
//         }
//     };

//     xhr.send();
// };