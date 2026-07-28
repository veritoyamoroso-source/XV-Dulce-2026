const sobre = document.getElementById("sobre");
const intro = document.getElementById("intro");
const invitacion = document.getElementById("invitacion");
const musica = document.getElementById("musica");
const flash = document.getElementById("flash");

const btnConfirmar = document.getElementById("btn-confirmar");
const nombreInput = document.getElementById("nombre-input");
const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");

let abierto = false;

/*=================================
ABRIR SOBRE
=================================*/

sobre.addEventListener("click", () => {

    if (abierto) return;

    abierto = true;

    sobre.style.pointerEvents = "none";
    sobre.style.transform = "scale(1.08)";

    setTimeout(() => {

        sobre.src = "img/sobreAbierto.png";

    }, 250);

    musica.volume = 0.45;

    musica.play().catch(() => {});

    flash.animate(
        [
            { opacity: 0 },
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 900,
            easing: "ease"
        }
    );

    setTimeout(() => {

        intro.style.opacity = "0";

    }, 500);

    setTimeout(() => {

        intro.style.display = "none";

        invitacion.style.display = "flex";

        invitacion.classList.add("fade-in-invitation");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 1200);

});


/*=================================
CONFIRMAR ASISTENCIA
=================================*/

const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbyelEJSnLWNzcQ-95Bh68dWBDn6yiayVB6hsuk_G0UWhNTb4ChsUwMb2wNbcy9ireA-xw/exec";


btnConfirmar.addEventListener("click", async () => {

    const nombre = nombreInput.value.trim();

    if (nombre === "") {

        mensajeConfirmacion.textContent = "⚠️ Escribe tu nombre completo.";

        mensajeConfirmacion.style.color = "#e6b800";

        mensajeConfirmacion.classList.remove("oculto");

        return;

    }

    btnConfirmar.disabled = true;

    btnConfirmar.textContent = "Enviando...";

    try {

        const respuesta = await fetch(URL_SCRIPT, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                nombre: nombre

            })

        });

        if (!respuesta.ok) {

            throw new Error();

        }

        mensajeConfirmacion.textContent =
            "✅ ¡Gracias! Tu asistencia ha sido registrada.";

        mensajeConfirmacion.style.color = "#7CFC90";

        mensajeConfirmacion.classList.remove("oculto");

        nombreInput.value = "";

        btnConfirmar.textContent = "✔ Confirmado";

    }

    catch (error) {

        mensajeConfirmacion.textContent =
            "❌ Error al enviar. Inténtalo nuevamente.";

        mensajeConfirmacion.style.color = "#ff6666";

        mensajeConfirmacion.classList.remove("oculto");

        btnConfirmar.disabled = false;

        btnConfirmar.textContent = "Confirmar asistencia";

    }

});


nombreInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        btnConfirmar.click();

    }

});