/*=============================
ANIMACIONES AL HACER SCROLL
=============================*/

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {

    threshold: 0.25

});

document.querySelectorAll(".animar").forEach((elemento) => {

    observer.observe(elemento);

});


/*=============================
EFECTO PARALLAX FLORES
=============================*/

const flores = document.querySelectorAll(".flor");

window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    flores.forEach((flor, index) => {

        const velocidad = (index + 1) * 0.12;

        if (flor.classList.contains("izquierda")) {

            flor.style.transform =
                `translateY(${scroll * velocidad}px) rotate(-90deg)`;

        } else {

            flor.style.transform =
                `translateY(${scroll * velocidad}px) rotate(90deg)`;

        }

    });

});


/*=============================
ANIMACIÓN BOTONES
=============================*/

document.querySelectorAll(".boton").forEach((boton)=>{

    boton.addEventListener("mouseenter",()=>{

        boton.style.transform="translateY(-5px) scale(1.03)";

    });

    boton.addEventListener("mouseleave",()=>{

        boton.style.transform="translateY(0) scale(1)";

    });

});