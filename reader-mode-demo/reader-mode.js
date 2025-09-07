// Reader Mode JavaScript - Completely isolated from existing site scripts

// Reader Mode state management
let readerModeActive = false;
let currentLanguage = 'en';

// Toggle Reader Mode for specified language
function toggleReaderMode(lang) {
    if (readerModeActive && currentLanguage === lang) {
        closeReaderMode();
    } else {
        openReaderMode(lang);
    }
}

// Open Reader Mode
function openReaderMode(lang) {
    currentLanguage = lang;
    readerModeActive = true;
    
    // Show the overlay
    const overlay = document.getElementById('reader-mode-overlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Load content based on language
        loadReaderContent(lang);
        
        // Update button state
        updateReaderButtonState(true);
    }
}

// Close Reader Mode
function closeReaderMode() {
    readerModeActive = false;
    
    // Hide the overlay
    const overlay = document.getElementById('reader-mode-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Update button state
        updateReaderButtonState(false);
    }
}

// Load content based on language
function loadReaderContent(lang) {
    const contentDiv = document.getElementById('reader-mode-content');
    if (!contentDiv) return;
    
    if (lang === 'es') {
        contentDiv.innerHTML = getSpanishContent();
    } else {
        contentDiv.innerHTML = getEnglishContent();
    }
}

// Get Spanish content
function getSpanishContent() {
    return `
        <h2>Bienvenidos a Antelope Valley High School</h2>
        
        <h3>Acerca de Nuestra Escuela</h3>
        <p>Antelope Valley High School ha sido un pilar de la comunidad de Lancaster desde 1912. Estamos orgullosos de nuestras profundas raíces en el Valle del Antílope. Durante más de cien años, nos hemos dedicado a proporcionar una educación de primera clase en un lugar que se siente como un hogar lejos del hogar.</p>
        
        <h3>Académicos</h3>
        <p>Nuestro departamento académico ofrece un plan de estudios riguroso diseñado para preparar a los estudiantes para la universidad y carreras profesionales. Ofrecemos cursos de Honores y Colocación Avanzada (AP) para estudiantes que buscan desafíos adicionales.</p>
        
        <h3>Transcripciones</h3>
        <p>Las transcripciones son registros oficiales del rendimiento académico de un estudiante. El Distrito Escolar Antelope Valley Union High School tiene procedimientos específicos para solicitarlas.</p>
        
        <h4>Para solicitar una transcripción:</h4>
        <ol>
            <li>Complete el formulario de solicitud disponible en la Oficina de Consejería</li>
            <li>Proporcione identificación válida con foto</li>
            <li>Incluya la dirección completa donde debe enviarse la transcripción</li>
            <li>Permita 5-10 días hábiles para el procesamiento</li>
            <li>Hay una tarifa de $5.00 por cada transcripción oficial</li>
        </ol>
        
        <h3>Requisitos de Graduación</h3>
        <p>Los estudiantes deben completar 220 créditos para graduarse, incluyendo:</p>
        <ul>
            <li>40 créditos en Inglés</li>
            <li>30 créditos en Matemáticas</li>
            <li>30 créditos en Ciencias</li>
            <li>30 créditos en Estudios Sociales</li>
            <li>20 créditos en Educación Física</li>
            <li>10 créditos en Artes Visuales y Escénicas</li>
            <li>60 créditos electivos</li>
        </ul>
        
        <h3>Centro de Carreras y Universidad</h3>
        <p>Nuestro Centro de Carreras y Orientación sirve como un recurso valioso para los estudiantes que planean su educación post-secundaria y carreras profesionales. Los estudiantes pueden visitar la página del Centro o pasar en persona para acceder a esta información.</p>
        
        <h3>Contacto</h3>
        <p>Para más información, contáctenos:</p>
        <ul>
            <li><strong>Teléfono:</strong> (661) 948-8552</li>
            <li><strong>Email:</strong> infoavhs@avhsd.org</li>
            <li><strong>Dirección:</strong> 44900 N. 30th Street East, Lancaster, CA 93535</li>
        </ul>
    `;
}

// Get English content (fallback)
function getEnglishContent() {
    return `
        <h2>Welcome to Antelope Valley High School</h2>
        
        <h3>About Our School</h3>
        <p>Antelope Valley High School has been a cornerstone of the Lancaster community since 1912. We're proud of our deep roots in the Antelope Valley. For over a hundred years, we've been dedicated to providing a top-notch education in a place that feels like a home away from home.</p>
        
        <h3>Academics</h3>
        <p>Our academic department offers a rigorous curriculum designed to prepare students for college and careers. We offer Honors and Advanced Placement (AP) courses for students seeking additional challenges.</p>
        
        <h3>Transcripts</h3>
        <p>Transcripts are official records of a student's academic performance. The Antelope Valley Union High School District has specific procedures for requesting them.</p>
        
        <h4>To request a transcript:</h4>
        <ol>
            <li>Complete the request form available in the Counseling Office</li>
            <li>Provide valid photo identification</li>
            <li>Include the complete address where the transcript should be sent</li>
            <li>Allow 5-10 business days for processing</li>
            <li>There is a $5.00 fee for each official transcript</li>
        </ol>
        
        <h3>Graduation Requirements</h3>
        <p>Students must complete 220 credits to graduate, including:</p>
        <ul>
            <li>40 credits in English</li>
            <li>30 credits in Mathematics</li>
            <li>30 credits in Science</li>
            <li>30 credits in Social Studies</li>
            <li>20 credits in Physical Education</li>
            <li>10 credits in Visual and Performing Arts</li>
            <li>60 elective credits</li>
        </ul>
        
        <h3>College and Career Center</h3>
        <p>Our Career and Guidance Center serves as a valuable resource for students planning their post-secondary education and career paths. Students can visit the Center's page or stop by in person to access this information.</p>
        
        <h3>Contact</h3>
        <p>For more information, contact us:</p>
        <ul>
            <li><strong>Phone:</strong> (661) 948-8552</li>
            <li><strong>Email:</strong> infoavhs@avhsd.org</li>
            <li><strong>Address:</strong> 44900 N. 30th Street East, Lancaster, CA 93535</li>
        </ul>
    `;
}

// Update reader button state
function updateReaderButtonState(isActive) {
    const buttons = document.querySelectorAll('.reader-mode-btn');
    buttons.forEach(btn => {
        if (isActive) {
            btn.style.background = '#28a745';
            btn.textContent = 'Cerrar Modo Lector';
        } else {
            btn.style.background = '#0051d2';
            btn.textContent = ' Leer en Español';
        }
    });
}

// Handle escape key to close reader mode
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && readerModeActive) {
        closeReaderMode();
    }
});

// Close reader mode when clicking outside content
document.addEventListener('click', function(event) {
    if (readerModeActive) {
        const overlay = document.getElementById('reader-mode-overlay');
        const content = document.getElementById('reader-mode-content');
        const header = document.getElementById('reader-mode-header');
        
        if (overlay && event.target === overlay) {
            closeReaderMode();
        }
    }
});
