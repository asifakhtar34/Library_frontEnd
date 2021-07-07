//creaying a separate div to contain all the admin functionality
let userContainer = document.createElement("div");
userContainer.setAttribute("id", "userDetailBox");
document.getElementsByTagName("body")[0].appendChild(userContainer);

window.onload = function userFunc() {
    // Create a form dynamically
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "#");
    form.setAttribute("id", "adminForm");

    // Create an input element for emailID
    let ID = document.createElement("input");
    let idLabel = document.createElement("label");
    idLabel.append("Enter Email:");
    idLabel.setAttribute("for", "email");

    ID.setAttribute("type", "email");
    ID.setAttribute("name", "email");
    ID.setAttribute("placeholder", "E-Mail ID");
    ID.setAttribute("id", "email");

    // Create an input element for password
    let PWD = document.createElement("input");
    let pwdLabel = document.createElement("label");
    pwdLabel.append("Enter Password:");
    pwdLabel.setAttribute("for", "password");
    PWD.setAttribute("type", "password");
    PWD.setAttribute("name", "password");
    PWD.setAttribute("placeholder", "Password");
    PWD.setAttribute("id", "password");

    // Create a submit button
    let s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "LOGIN");
    s.setAttribute("id", "adminSubmit");

    s.addEventListener("click", userSubmit);

    //admin login form

    function userSubmit(event) {
        event.preventDefault();

        let xhr = new XMLHttpRequest();
        let email = document.getElementById("email");
        let password = document.getElementById("password");

        // console.log(email.value)
        // console.log(password.value)
        xhr.open("POST", "http://localhost:3000/user/login", true);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // create a new product
                let response = this.responseText;
                // console.log(this.responseText)
                let success = JSON.parse(response);
                // storing jwt in local storage for further access
                localStorage.setItem("Ujwt", success.token);

                let p = document.createElement("p");
                p.setAttribute("id", "pass");
                p.append(success.message);
                //removing the form after sucess login
                userContainer.removeChild(form);
                userContainer.appendChild(p);
                setTimeout(() => {
                    userContainer.removeChild(p);
                }, 2500);
                form.reset();

                //   // accessing all users ordersTable
                //   let userOrdersContainer = document.createElement("div");
                //   userOrdersContainer.setAttribute("id", "userOrdersContainer");
                //   document.getElementsByTagName("body")[0].appendChild(userOrdersContainer);


                // Show orders btn
                let showBtn = document.createElement("button");
                showBtn.append("Show Issued Books")
                showBtn.setAttribute("id", "showBtn");
                userContainer.appendChild(showBtn);


                showBtn.addEventListener('click', showOrderBtn);



                function showOrderBtn() {
                    var xhr = new XMLHttpRequest();

                    xhr.open("GET", "http://localhost:3000/user/allUsers", true);

                    // check with on readystatechange or onload
                    xhr.onload = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            //receving all products
                            let users = JSON.parse(this.responseText);
                            // console.log(users);

                            let usersArr = users.allUsers;
                            // console.log(ordersCount);
                            // console.log(usersArr);

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
                                // console.log(Object.entries(item));
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
                }




            } else if (this.readyState == 4 && this.status == 401) {
                console.log(this.responseText);
                let failed = JSON.parse(this.responseText);
                let p = document.createElement("p");
                p.setAttribute("id", "fail");
                p.append(failed.message);
                userContainer.appendChild(p);
                setTimeout(() => {
                    userContainer.removeChild(p);
                }, 2000);
                form.reset();





            }
        };

        xhr.send(`email=${email.value}&password=${password.value}`);
        // xhr.send(params)
    }

    // Append the email_ID input to the form
    form.append(ID);
    form.insertBefore(idLabel, ID);

    // Append the password to the form
    form.append(PWD);
    form.insertBefore(pwdLabel, PWD);

    // Append the button to the form
    form.append(s);
    //appending the form to the adminContainer
    userContainer.appendChild(form);
    // adminLogin.removeEventListener("click", adminFunc);
    //appenidng the admin container to the body
    document.getElementsByTagName("body")[0].appendChild(userContainer);
    // adminContainer.appendChild(logout);
};