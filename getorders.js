window.updateProducts = function updateProduct(response, form) {


    //creating post link to add product

    let updateProduct = document.createElement("button");
    updateProduct.append("Add New Book");
    updateProduct.setAttribute("id", "addNewBook");
    updateProduct.addEventListener("click", updateProducts);
    // sending xhr request to server for adding new products
    function updateProducts() {
        // enabling logput
        document.getElementById("logout").disabled = false;
        // form for enterinfg new book details
        let updateForm = document.createElement("form");
        updateForm.setAttribute("method", "post");
        updateForm.setAttribute("action", "#");
        updateForm.setAttribute("class", "newBookForm");

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
        let value = document.createElement("input");
        value.setAttribute("type", "text");
        value.setAttribute("name", "newValue");
        value.setAttribute("placeholder", "New value");
        value.setAttribute("id", "newValue");

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
                p.append("Please Fill out All the Fields");
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
                if (this.readyState == 4 && this.status == 201) {
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
                    updateForm.reset();

                    // prodBtn.addEventListener("click", fetchProducts);
                }
            };
            xhr.send(
                `name=${prodId.value}&price=${property.value}&author=${newValue.value}&token=${token}`
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

        document.getElementsByTagName("body")[0].appendChild(updateForm);
        // document.getElementsByTagName("body")[0].appendChild(refresh);
        console.log("am  udpated clicked");
        // addProduct.removeEventListener("click", addProducts);
    }
    document.getElementsByTagName("body")[0].appendChild(updateProduct);
    document.getElementsByTagName("body")[0].insertBefore(logout, addProduct);
}