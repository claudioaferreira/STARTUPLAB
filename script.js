document.addEventListener('DOMContentLoaded', function () {
    const ideaSelect = document.getElementById('idea');
    const ideaDescriptionGroup = document.getElementById('idea-description-group');


    if (ideaSelect && ideaDescriptionGroup) {
        ideaSelect.addEventListener('change', function () {
            ideaDescriptionGroup.style.display = this.value === 'si' ? 'block' : 'none';
        });
    }

    const form = document.querySelector('.registration-form');
    if (!form) {
        console.error("Formulario no encontrado.");
        return;
    }

    form.addEventListener('submit', async function (e) {
        alert("Intercepción del formulario exitosa");
        e.preventDefault();
        console.log("Formulario enviado, evento capturado");
        const data = {
            nombre: document.getElementById('nombre')?.value.trim(),
            cedula: document.getElementById('cedula')?.value.trim(),
            email: document.getElementById('email')?.value.trim(),
            telefono: document.getElementById('telefono')?.value.trim(),
            carrera: document.getElementById('carrera')?.value.trim(),
            edad: document.getElementById('edad')?.value.trim(),
            idea: document.getElementById('idea')?.value,
            idea_descripcion: document.getElementById('idea_descripcion')?.value.trim() || '',
            perfil: document.getElementById('perfil')?.value
        };

        console.log('Datos a enviar:', data);
        const formData = new URLSearchParams();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbzC6S2TAzqE7ZiCl3Kbrg6xNki3dbCvEfM3Fit9XPO5qXkU5cDoy8SOdce1nSLPTZKdZA/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()


            });

            const result = await response.json();

            if (result.result === "success" || result.status === "success") {
                alert("¡Registro exitoso!");
                form.reset();
                ideaDescriptionGroup.style.display = 'none'; // ocultar nuevamente si se mostró
            } else {
                alert("Ocurrió un error. Intenta de nuevo.");
            }

        } catch (error) {
            console.error('Error al enviar:', error);
            alert("Error al conectar con el servidor.");
        }
    });
});