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
/*
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
    });*/
});


 const params = new URLSearchParams(window.location.search);

    const today = new Date();
    const ciudad = 'Santo Domingo'; // Puedes cambiar esto si es necesario
    const pais = 'República Dominicana'; // Puedes cambiar esto si es necesario

    const fields = ['nombre', 'cedula', 'email'];

    fields.forEach(field => {
      const el = document.getElementById(field);
      if (el) {
        let value = params.get(field);
        if (!value || value.trim() === '') {
          value = 'N/A';
          el.classList.add('na-value');
        } else {
          el.classList.remove('na-value');
        }
        el.textContent = value;
      }
    });

    // Fecha y lugar (pueden venir en URL o usar placeholders)
    document.getElementById('fecha_emision').textContent = today.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    document.getElementById('lugar_emision').textContent = (params.get('lugar_emision') || `${ciudad}, ${pais}`).trim();

    // Generar texto para QR
    let qrTextParts = [];
    fields.forEach(field => {
      const value = params.get(field) || 'N/A';
      if (value !== 'N/A' || ['nombre', 'cedula', 'email'].includes(field)) {
        qrTextParts.push(`${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}: ${value}`);
      }
    });
    const qrText = qrTextParts.join('; ').trim();

    if (qrText) {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrText)}&size=120x120&margin=1`;

      document.getElementById('qr').src = qrUrl;
    } else {
      document.getElementById('qr').alt = "No hay datos para generar QR";
    }

    function descargarCertificado() {
      const certificate = document.getElementById('certificateToDownload');
      const downloadButton = document.querySelector('.download-button');
      downloadButton.style.display = 'none';

      html2canvas(certificate, {
        scale: 2,
        useCORS: true,
      }).then(canvas => {
        const enlace = document.createElement('a');
        const nombreParticipante = params.get('nombre') || 'participante';
        enlace.download = `Certificado_${nombreParticipante.replace(/\s+/g, '_')}.png`;
        enlace.href = canvas.toDataURL('image/png');
        enlace.click();
        downloadButton.style.display = 'block';
      }).catch(err => {
        console.error("Error al generar la imagen:", err);
        downloadButton.style.display = 'block';
      });
    }