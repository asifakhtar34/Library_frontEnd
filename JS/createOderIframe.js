let orderBox = document.getElementById("orderBox");
let userBox = document.getElementById("userBox");
let adminBox = document.getElementById("adminBox");

console.log("hello")



// creating create order button
let createOrderBtn = document.createElement("button");
createOrderBtn.append("Create New Order")
createOrderBtn.setAttribute("id", "createOrderBtn");

//on order button click trigger function addNewOrder
createOrderBtn.addEventListener("click", addNewOrder);
orderBox.append(createOrderBtn)
document.getElementsByTagName("body")[0].append(orderBox)

// creating  order delete button
let deleteOrderBtn = document.createElement("button");
deleteOrderBtn.append("Delete Order")
deleteOrderBtn.setAttribute("id", "deleteOrderBtn");

//on orderDelete button click trigger function deleteOrder
deleteOrderBtn.addEventListener("click", removeOrder);
orderBox.append(deleteOrderBtn)
document.getElementsByTagName("body")[0].append(orderBox)


// creating  user add button
let AddUserBtn = document.createElement("button");
AddUserBtn.append("Add New user")
AddUserBtn.setAttribute("id", "AddUser");

//on useradd button click trigger function adduser
AddUserBtn.addEventListener("click", addUser);
userBox.append(AddUserBtn)
document.getElementsByTagName("body")[0].append(userBox)

// creating  user delete button
let deleteUserBtn = document.createElement("button");
deleteUserBtn.append("Delete User")
deleteUserBtn.setAttribute("id", "deleteUserBtn");

//on useradd button click trigger function adduser
deleteUserBtn.addEventListener("click", deleteUser);
userBox.append(deleteUserBtn)
document.getElementsByTagName("body")[0].append(userBox)


//create order form


function addNewOrder() {
    let orderForm = document.createElement("form");
    orderForm.setAttribute("method", "post");
    orderForm.setAttribute("action", "#");
    orderForm.setAttribute("id", "newOrderFomr");

    // Create an input element for productID
    let productID = document.createElement("input");
    productID.setAttribute("type", "text");
    productID.setAttribute("name", "productID");
    productID.setAttribute("placeholder", "productID");
    productID.setAttribute("id", "productID");
    productID.setAttribute("required", "");

    // Create an input element for UserID
    let userID = document.createElement("input");
    userID.setAttribute("type", "text");
    userID.setAttribute("name", "userID");
    userID.setAttribute("placeholder", "userID");
    userID.setAttribute("id", "userID");
    userID.setAttribute("required", "");



    // Create a submit button
    let s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    s.setAttribute("id", "orderSubmit");



    s.addEventListener("click", orderSubmit);
    //this is triggered when new book is submit is hit
    function orderSubmit(event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest();

        //grabbing form value to send to server
        let productID = document.getElementById("productID");
        let userID = document.getElementById("userID");

        let token = localStorage.getItem("jwt");

        if (productID.value == "" || userID.value == "") {
            let p = document.createElement("p");
            p.setAttribute("id", "fail");
            p.append("PLease Fill out All the Fields");
            orderForm.appendChild(p);
            setTimeout(() => {
                orderForm.removeChild(p);
            }, 2000);
            return;
        }
        // console.log(token)

        xhr.open("POST", "http://localhost:3000/orders", true);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {
                // console.log("hello");
                // console.log(JSON.parse(this.responseText).message);
                let p = document.createElement("p");
                p.setAttribute("id", "pass");
                p.append(JSON.parse(this.responseText).message);
                adminContainer.appendChild(p);
                setTimeout(() => {
                    adminContainer.removeChild(p);
                }, 2000);
                orderForm.reset();

                // prodBtn.addEventListener("click", fetchProducts);
            }
        };
        xhr.send(
            `productId=${productID.value}&userId=${userID.value}&&token=${token}`
        );
    }

    // Append the name input to the form
    orderForm.append(productID);

    // Append the price to the form
    orderForm.append(userID);



    // Append the submit to the form
    orderForm.append(s);

    orderBox.appendChild(orderForm);
    // adminContainer.appendChild(refresh);
    console.log("am ordered");
    createOrderBtn.removeEventListener("click", addNewOrder);
}



// delete order form

function removeOrder() {
    let removeorderForm = document.createElement("form");
    removeorderForm.setAttribute("method", "delete");
    removeorderForm.setAttribute("action", "#");
    removeorderForm.setAttribute("id", "removeorderForm");

    // Create an input element for orderId
    let orderID = document.createElement("input");
    orderID.setAttribute("type", "text");
    orderID.setAttribute("name", "orderID");
    orderID.setAttribute("placeholder", "Enter OrderId to be Deleted");
    orderID.setAttribute("id", "orderID");
    orderID.setAttribute("required", "");

    // Create a submit button
    let s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    s.setAttribute("id", "removeProdSubmit");

    s.addEventListener("click", removeOrderSubmit);
    //this is triggered when new book is submit is hit
    function removeOrderSubmit(event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest();

        //grabbing form value to send to server
        let orderID = document.getElementById("orderID");

        let token = localStorage.getItem("jwt");
        // form validation
        if (orderID.value == "") {
            let p = document.createElement("p");
            p.setAttribute("id", "fail");
            p.append("Please Fill out All the Fields");
            removeorderForm.appendChild(p);
            setTimeout(() => {
                removeorderForm.removeChild(p);
            }, 2000);
            return;
        }
        // console.log(token)

        xhr.open("DELETE", "http://localhost:3000/orders", true);

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
                // resetting the form after submit
                removeorderForm.reset();

                // prodBtn.addEventListener("click", fetchProducts);
            }
        };
        xhr.send(`id=${orderID.value}&token=${token}`);
    }

    // Append the OrderId input to the form
    removeorderForm.append(orderID);

    // Append the submit to the form
    removeorderForm.append(s);

    orderBox.appendChild(removeorderForm);
    // document.getElementsByTagName("body")[0].appendChild(refresh);
    console.log("am  deleted clicked");
    deleteOrderBtn.removeEventListener("click", removeOrder);
}




//add new user form

function addUser() {

    let addUserForm = document.createElement("form");
    addUserForm.setAttribute("method", "post");
    addUserForm.setAttribute("action", "#");
    addUserForm.setAttribute("id", "addUserForm");

    // Create an input element for userNAme
    let userName = document.createElement("input");
    let UNlabel = document.createElement('label');
    UNlabel.append('Enter Name:');
    UNlabel.setAttribute("for", "userName");
    userName.setAttribute("type", "text");
    userName.setAttribute("name", "userName");
    userName.setAttribute("placeholder", "userName");
    userName.setAttribute("id", "userName");
    userName.setAttribute("required", "");

    // Create an input element for userEmail
    let userEmail = document.createElement("input");
    let UElabel = document.createElement('label');
    UElabel.append('Enter Email:');
    UElabel.setAttribute("for", "userEmail");
    userEmail.setAttribute("type", "email");
    userEmail.setAttribute("name", "userEmail");
    userEmail.setAttribute("placeholder", "userEmail");
    userEmail.setAttribute("id", "userEmail");
    userEmail.setAttribute("required", "");


    // Create an input element for usermobile
    let userMobile = document.createElement("input");
    let UMlabel = document.createElement('label');
    UMlabel.append('Enter Mobile Number:');
    UMlabel.setAttribute("for", "userMobile");
    userMobile.setAttribute("type", "number");
    userMobile.setAttribute("name", "userMobile");
    userMobile.setAttribute("placeholder", "Mobile Number");
    userMobile.setAttribute("id", "userMobile");
    userMobile.setAttribute("required", "");

    // Create an input element for userpassword
    let userpassword = document.createElement("input");
    let UPlabel = document.createElement('label');
    UPlabel.append('Enter Password:');
    UPlabel.setAttribute("for", "userpassword");
    userpassword.setAttribute("type", "password");
    userpassword.setAttribute("name", "userpassword");
    userpassword.setAttribute("placeholder", "Enter Password");
    userpassword.setAttribute("id", "userpassword");
    userpassword.setAttribute("required", "");

    // Create an input element for userConfirmpassword
    let userConfirmpassword = document.createElement("input");
    let UCPlabel = document.createElement('label');
    UCPlabel.append('Confirm Password:');
    UCPlabel.setAttribute("for", "userConfirmpassword");
    userConfirmpassword.setAttribute("type", "password");
    userConfirmpassword.setAttribute("name", "userConfirmpassword");
    userConfirmpassword.setAttribute("placeholder", "Confirm Password");
    userConfirmpassword.setAttribute("id", "userConfirmpassword");
    userConfirmpassword.setAttribute("required", "");



    // Create a submit button
    let s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    s.setAttribute("id", "addUserSubmit");



    s.addEventListener("click", addUserSubmit);
    //this is triggered when new book is submit is hit
    function addUserSubmit(event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest();

        //grabbing form value to send to server
        let userName = document.getElementById("userName");
        let userEmail = document.getElementById("userEmail");
        let userMobile = document.getElementById("userMobile");
        let userConfirmpassword = document.getElementById("userConfirmpassword");
        let userpassword = document.getElementById("userpassword");

        let token = localStorage.getItem("jwt");

        if (userName.value == "" || userEmail.value == "" || userMobile.value == "" || userConfirmpassword.value == "") {
            let p = document.createElement("p");
            p.setAttribute("id", "fail");
            p.append("PLease Fill out All the Fields");
            addUserForm.appendChild(p);
            setTimeout(() => {
                addUserForm.removeChild(p);
            }, 2000);
            return;
        }
        //checking for password Match
        if (userConfirmpassword.value != userpassword.value) {
            let p = document.createElement("p");
            p.setAttribute("id", "fail");
            p.append("Passwords Should Match");
            addUserForm.appendChild(p);
            setTimeout(() => {
                addUserForm.removeChild(p);
            }, 2000);
            return;
        }

        // console.log(token)

        xhr.open("POST", "http://localhost:3000/user/signup", true);

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
                addUserForm.reset();

                // prodBtn.addEventListener("click", fetchProducts);
            } else if (this.status) {
                let p = document.createElement("p");
                p.setAttribute("id", "fail");
                console.log(JSON.parse(this.responseText).error._message)
                p.append(JSON.parse(this.responseText).error._message);
                adminContainer.appendChild(p);
                setTimeout(() => {
                    adminContainer.removeChild(p);
                }, 2000);
                addUserForm.reset();

            }
        };
        xhr.send(
            `name=${userName.value}&email=${userEmail.value}&mobileNumber=${userMobile.value}&password=${userpassword.value}&token=${token}`
        );
    }

    // Append the name input to the form
    addUserForm.append(userName);

    // Append the email to the form
    addUserForm.append(userEmail);
    // Append the mobile to the form
    addUserForm.append(userMobile);
    // Append the password to the form
    addUserForm.append(userpassword);
    // Append the confirm password to the form
    addUserForm.append(userConfirmpassword);

    //appending labels
    addUserForm.insertBefore(UNlabel, userName);
    addUserForm.insertBefore(UElabel, userEmail);
    addUserForm.insertBefore(UMlabel, userMobile);
    addUserForm.insertBefore(UPlabel, userpassword);
    addUserForm.insertBefore(UCPlabel, userConfirmpassword);
    // addUserForm.append(UElabel);
    // addUserForm.append(UMlabel);
    // addUserForm.append(UPlabel);
    // addUserForm.append(UCPlabel);




    // Append the submit to the form
    addUserForm.append(s);

    userBox.appendChild(addUserForm);
    // adminContainer.appendChild(refresh);
    console.log("user added");

    AddUserBtn.removeEventListener("click", addUser);

}


//delete user form

function deleteUser() {
    let removeuserForm = document.createElement("form");
    removeuserForm.setAttribute("method", "delete");
    removeuserForm.setAttribute("action", "#");
    removeuserForm.setAttribute("id", "removeuserForm");

    // Create an input element for orderId
    let userID = document.createElement("input");
    let Ulabel = document.createElement('label');
    Ulabel.append('Enter UserId:');
    Ulabel.setAttribute("for", "userID");
    userID.setAttribute("type", "text");
    userID.setAttribute("name", "userID");
    userID.setAttribute("placeholder", "Enter userID to be Deleted");
    userID.setAttribute("id", "userID");
    userID.setAttribute("required", "");

    // Create a submit button
    let s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    s.setAttribute("id", "removeUserSubmit");

    s.addEventListener("click", removeUserSubmit);
    //this is triggered when new book is submit is hit
    function removeUserSubmit(event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest();

        //grabbing form value to send to server
        let userID = document.getElementById("userID");

        let token = localStorage.getItem("jwt");
        // form validation
        if (userID.value == "") {
            let p = document.createElement("p");
            p.setAttribute("id", "fail");
            p.append("Please Fill out All the Fields");
            removeuserForm.appendChild(p);
            setTimeout(() => {
                removeuserForm.removeChild(p);
            }, 2000);
            return;
        }
        // console.log(token)

        xhr.open("DELETE", "http://localhost:3000/user", true);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("hello");
                console.log(JSON.parse(this.responseText).message);
                let p = document.createElement("p");
                p.setAttribute("id", "pass");
                p.append(JSON.parse(this.responseText).message);
                removeuserForm.appendChild(p);
                setTimeout(() => {
                    removeuserForm.removeChild(p);
                }, 2000);
                // resetting the form after submit
                removeuserForm.reset();

                // prodBtn.addEventListener("click", fetchProducts);
            }
        };
        xhr.send(`id=${userID.value}&token=${token}`);
    }

    // Append the OrderId input to the form
    removeuserForm.append(userID);
    removeuserForm.insertBefore(Ulabel, userID);

    // Append the submit to the form
    removeuserForm.append(s);

    userBox.appendChild(removeuserForm);
    // document.getElementsByTagName("body")[0].appendChild(refresh);
    console.log("am  deleted clicked");
    deleteUserBtn.removeEventListener("click", deleteUser);
}