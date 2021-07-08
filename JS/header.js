var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// let adminIframe = document.getElementById('adminIframe');
// let adminLoginBtn = document.getElementById('adminLogin');

// adminLoginBtn.addEventListener('click', adminlogin)

// //admin controls

// adminIframe.style.display = "none";
// // adminLogout.style.display = "none";

// function adminlogin() {
//     userIframe.style.display = "none";
//     adminIframe.style.display = "block";
//     // adminLogout.style.display = "block";
// }
// logging out admin
// function adminloggedOut() {
//     adminLogout.style.display = "none";

//     localStorage.removeItem("jwt");
//     adminIframe.contentWindow.location.reload();
//     adminIframe.style.display = "none";
//     let p = document.createElement("p");
//     p.setAttribute("id", "pass");
//     p.append("Admin Logged Out");
//     document.getElementsByTagName("body")[0].appendChild(p)
//     setTimeout(() => {
//         document.getElementsByTagName("body")[0].removeChild(p)
//     }, 2000);

// }

//


// user controls

// let userIframe = document.getElementById('userIframe');

// userIframe.style.display = "none";

// let userLoginBtn = document.getElementById('userLogin');

// userLoginBtn.addEventListener('click', userlogin)

// function userlogin() {
//     console.log('hi')
//     adminIframe.style.display = "none";
//     userIframe.style.display = "block";
//     // adminLogout.style.display = "block";
// }