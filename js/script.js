// =========================================
// Tomás Silva Digital
// Script Principal
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Website carregado com sucesso!");

    // Inicializar EmailJS
    emailjs.init({
        publicKey: "71lMnUL-Wk-d9cHqM"
    });

    // Formulário de contacto
    const form = document.getElementById("contact-form");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            emailjs.sendForm(
                "service_iazw862",
                "template_kwqal0t",
                this
            )

            .then(() => {

                alert("✅ A tua mensagem foi enviada com sucesso!");

                form.reset();

            })

            .catch((error) => {

                alert("❌ Ocorreu um erro ao enviar a mensagem.");

                console.error(error);

            });

        });

    }

});