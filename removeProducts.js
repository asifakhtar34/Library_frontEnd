function removeProduct(response, form) {
    //creating post link to add product

    let removeProduct = document.createElement("button");
    removeProduct.append("REMOVE BOOK");
    removeProduct.setAttribute("id", "removeBook");
    removeProduct.addEventListener("click", removeProducts);
    // sending xhr request to server for adding new products
    function updateProducts() {
        // enabling logput
        document.getElementById("logout").disabled = false;
        // form for enterinfg new book details
        let removeForm = document.createElement("form");
        removeForm.setAttribute("method", "post");
        removeForm.setAttribute("action", "#");
        removeForm.setAttribute("class", "removebookForm");

        // Create an input element for name of book
        let prodId = document.createElement("input");
        prodId.setAttribute("type", "text");
        prodId.setAttribute("name", "rprodId");
        prodId.setAttribute("placeholder", "Product ID");
        prodId.setAttribute("id", "removeprodId");
        prodId.setAttribute("required", "");

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
            let prodId = document.getElementById("prodId");

            let token = localStorage.getItem("jwt");

            if (prodId.value == "") {
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
                    console.log(this.responseText);
                    let p = document.createElement("p");
                    // p.append("updated Product succes");
                    // updateForm.appendChild(p);
                    // setTimeout(() => {
                    //             updateForm.removeChild(p);
                    //         }, 2000);
                    //         return;
                    //     }
                    removeForm.reset();

                    // prodBtn.addEventListener("click", fetchProducts);
                }
            };
            xhr.send(
                `id=${prodId.value}&token=${token}`
            );
        }

        // Append the name input to the form
        removeForm.append(prodId);





        // Append the submit to the form
        removeForm.append(s);

        document.getElementsByTagName("body")[0].appendChild(removeForm);
        // document.getElementsByTagName("body")[0].appendChild(refresh);
        console.log("am  deleted clicked");
        removeProduct.removeEventListener("click", removeProduct);
    }
    document.getElementsByTagName("body")[0].appendChild(removeProduct);
    // document.getElementsByTagName("body")[0].insertBefore(logout, addProduct);
}