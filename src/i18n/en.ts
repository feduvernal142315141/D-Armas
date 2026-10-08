// ─────────────────────────────────────────────────────────────
// ENGLISH CONTENT
// ─────────────────────────────────────────────────────────────
import type { Dict } from './es';

export const en: Dict = {
  meta: {
    title: "D'Armas Dental Clinic · Orthodontics & Dental Specialties in Altamira, Managua",
    description:
      'Dental clinic in Altamira, Managua: orthodontics, root canal treatment, oral rehabilitation, maxillofacial surgery and general dentistry with specialists backed by 20 years of experience. Book your appointment on WhatsApp.',
    ogLocale: 'en_US',
  },

  nav: {
    links: [
      { href: '#especialidades', label: 'Specialties' },
      { href: '#ortodoncia', label: 'Orthodontics' },
      { href: '#resultados', label: 'Results' },
      { href: '#nosotros', label: 'About us' },
      { href: '#equipo', label: 'Team' },
      { href: '#contacto', label: 'Contact' },
    ],
    linksMovil: [
      { href: '#especialidades', label: 'Specialties' },
      { href: '#ortodoncia', label: 'Orthodontics' },
      { href: '#resultados', label: 'Results' },
      { href: '#nosotros', label: 'About us' },
      { href: '#equipo', label: 'Team' },
      { href: '#faq', label: 'FAQ' },
      { href: '#contacto', label: 'Contact' },
    ],
    agendar: 'Book a visit',
    menu: 'Menu',
    ubicacion: 'Altamira · Managua',
    ariaRedes: 'Social media',
    ariaPrincipal: 'Main',
    ariaMenuMovil: 'Mobile menu',
    ariaAbrir: 'Open menu',
    ariaCerrar: 'Close menu',
  },

  whatsapp: {
    cita: "Hello! I'd like to book an appointment at Clínica Dental D'Armas!!!",
    tratamiento: (nombre: string) =>
      `Hello! I'd like more information about ${nombre} at Clínica Dental D'Armas!!!`,
    ortodoncia: "Hello! I'd like to book an orthodontic consultation at Clínica Dental D'Armas!!!",
    doctor: (nombre: string) => `Hello! I'd like to book an appointment with ${nombre} at Clínica Dental D'Armas!!!`,
  },

  hero: {
    eyebrowCorto: 'Altamira · Managua',
    eyebrowLargo: 'Specialty dental clinic · Altamira, Managua',
    titulo: 'The smile you want, with the <em>care</em> you deserve',
    subCorto: 'Every dental specialty under one roof, with first-class specialists.',
    subLargo:
      'Orthodontics, root canals, crowns and everything your oral health needs — all under one roof, with first-class specialists by your side at every step.',
    ctaWhatsapp: 'Book on WhatsApp',
    ctaLlamar: 'Call us',
    chipValor: '20+',
    chipLabel: 'years of experience',
    chipEstrella: 'First-class care',
    chipEstrellaSub: 'Certified specialists',
    fotoAlt: "Dr. Patricia Armas, orthodontist at D'Armas Dental Clinic",
    draNombre: 'Dr. Patricia Armas',
    draCargo: 'Orthodontist',
  },

  especialidades: {
    eyebrow: 'Specialties',
    titulo: 'Everything your smile needs, <em>in one place</em>',
    sub: 'From a routine cleaning to full rehabilitations: every treatment is performed by the right specialist, with first-rate technology and materials.',
    foco: 'Clinic focus',
    consultar: 'Ask about this treatment',
    items: [
      {
        id: 'ortodoncia',
        nombre: 'Orthodontics',
        destacado: true,
        descripcion:
          'Far more than aesthetics: a correct bite that improves chewing, hygiene and confidence. Metal braces, aesthetic braces, clear aligners and orthodontics for children.',
        tags: ['Braces', 'Clear aligners', 'Kids orthodontics'],
      },
      {
        id: 'endodoncia',
        nombre: 'Root Canal Treatment',
        destacado: true,
        descripcion:
          "When the tooth's nerve becomes inflamed or infected, a root canal removes the pain, heals the infection and saves your natural tooth — avoiding extraction.",
        tags: ['Root canal', 'Pain emergencies'],
      },
      {
        id: 'rehabilitacion',
        nombre: 'Oral Rehabilitation',
        destacado: true,
        descripcion:
          'Crowns and dentures that restore the strength, function and natural beauty of your smile, crafted with premium materials.',
        tags: ['Crowns', 'Fixed & removable dentures'],
      },
      {
        id: 'maxilofacial',
        nombre: 'Maxillofacial Surgery',
        destacado: false,
        descripcion:
          'Wisdom teeth removal, surgical extractions and oral pathology in the hands of our specialist, with careful post-operative follow-up.',
        tags: ['Wisdom teeth', 'Oral surgery'],
      },
      {
        id: 'general',
        nombre: 'Comprehensive General Dentistry',
        destacado: false,
        descripcion:
          'Care for the whole family in one place: cleanings, fillings, whitening, simple extractions and regular check-ups for your oral health.',
        tags: ['Cleaning', 'Whitening', 'Fillings'],
      },
    ],
  },

  ortodoncia: {
    eyebrow: 'Our specialty',
    titulo: 'Orthodontics that transforms <em>your smile and your health</em>',
    intro:
      'Orthodontic treatment goes far beyond aesthetics: it corrects the position of your teeth and jaws for proper chewing, better oral hygiene and confidence that shows.',
    procesoTitulo: 'How we work,',
    procesoTituloEm: 'step by step',
    tipos: [
      {
        nombre: 'Metal braces',
        texto:
          'The classic choice — highly durable and effective for every kind of case, from the simplest to the most complex. More comfortable and discreet than ever.',
      },
      {
        nombre: 'Aesthetic braces',
        texto:
          'Sapphire or ceramic: the effectiveness of fixed braces with superior aesthetics. They blend with the natural color of your teeth and go unnoticed.',
      },
      {
        nombre: 'Invisible aligners',
        texto:
          'Custom-made, removable clear aligners: eat freely, keep your hygiene routine effortlessly — and almost no one will know you are wearing them.',
      },
      {
        nombre: 'Kids orthopedics & orthodontics',
        texto:
          'Guides jaw growth and corrects habits early, preventing complex problems in adolescence and adulthood.',
      },
    ],
    proceso: [
      {
        titulo: 'Full diagnosis',
        texto: 'Physical, photographic and X-ray examination to evaluate your bite with maximum precision.',
      },
      {
        titulo: 'Personalized plan',
        texto: 'A strategy tailored to you, with every phase and estimated timeline clearly explained.',
      },
      {
        titulo: 'Placement',
        texto: 'Treatment begins with the placement of your braces or the delivery of your first aligners.',
      },
      {
        titulo: 'Monthly check-ups',
        texto: 'Month-by-month adjustments so your teeth move safely toward their ideal position.',
      },
      {
        titulo: 'Removal & retention',
        texto: 'The braces come off and a retainer is placed to keep your new smile in place.',
      },
    ],
    cta: 'Book your orthodontic consultation',
    nota: 'From classic braces to invisible aligners, for adults and children.',
  },

  resultados: {
    eyebrow: 'Before & after',
    titulo: 'Real results from <em>our patients</em>',
    sub: 'Every case is different, but the destination is the same: a healthy, aligned smile you can be proud of.',
    casos: [
      {
        titulo: 'Crowding corrected with orthodontics',
        texto: 'From crowded teeth to an aligned, functional smile: the power of a well-executed plan.',
      },
      {
        titulo: 'Space closure in progress',
        texto: 'Braces working month by month: gaps close and the bite finds its ideal position.',
      },
      {
        titulo: 'Kids orthopedics, right on time',
        texto: 'Guiding jaw growth during childhood prevents complex treatments later in life.',
      },
    ],
    altPrefijo: 'Before and after',
    disclaimer: 'Cases treated at our clinic, shared with patient consent.',
  },

  nosotros: {
    eyebrow: 'About us',
    statement: 'We are passionate about <em>transforming smiles</em> and caring for the oral health of the whole family',
    texto:
      'Located in Altamira, Managua, we offer comprehensive, specialized dental care with a strong focus on orthodontics — so every patient receives the ideal treatment for a healthy, aligned smile.',
    mision: {
      titulo: 'Our mission',
      texto:
        'To provide high-quality dental services with warm, human, professional care, using up-to-date technology and techniques to ensure the wellbeing and confidence of every person who visits us.',
      claves: ['Human touch', 'Technology', 'Trust'],
    },
    vision: {
      titulo: 'Our vision',
      texto:
        'To be the leading dental clinic in Managua, recognized for the excellence of our treatments, the satisfaction of our patients and our constant commitment to oral health.',
      claves: ['Leadership', 'Excellence', 'Commitment'],
    },
    valoresEyebrow: 'What guides us',
    valores: [
      { nombre: 'Empathy', texto: 'We listen before we treat.' },
      { nombre: 'Excellence', texto: 'Specialists and up-to-date techniques.' },
      { nombre: 'Honesty', texto: 'Only the treatment you need.' },
      { nombre: 'Closeness', texto: 'With you at every step.' },
    ],
  },

  porque: {
    eyebrow: "Why D'Armas",
    titulo: 'A clinic designed to make you <em>leave smiling</em>',
    sub: 'Comprehensive, specialized dental care in a space where you feel right at home.',
    razones: [
      {
        titulo: 'Personalized care',
        texto: 'Every smile is unique: we design treatment plans tailored to your specific needs.',
      },
      {
        titulo: 'A specialist for every area',
        texto: 'Professional expertise focused on achieving optimal aesthetic and functional results.',
      },
      {
        titulo: 'A safe, comfortable environment',
        texto: 'A space designed to make you feel at home: calm and at ease throughout your entire visit.',
      },
      {
        titulo: 'Up-to-date technology & techniques',
        texto: 'Diagnosis supported by X-rays and modern equipment to ensure your wellbeing at every appointment.',
      },
    ],
    statsLabels: ['Years of experience', 'Specialties', 'Certified specialists'],
    galeria: {
      verTodas: 'Tour the clinic',
      ampliar: 'Enlarge photo',
      cerrar: 'Close gallery',
      anterior: 'Previous photo',
      siguiente: 'Next photo',
      aria: "D'Armas Dental Clinic gallery",
      miniaturas: 'Thumbnails',
      fotos: [
        {
          titulo: 'In-chair care',
          texto: 'Every treatment follows strict biosafety protocols and gets the time your smile deserves.',
        },
        {
          titulo: 'Orthodontics room',
          texto: 'A latest-generation chair in a bright space, designed to keep you comfortable through the whole session.',
        },
        {
          titulo: 'Waiting room',
          texto: 'A quiet corner to settle in: natural light, plants and fresh water while we get ready for you.',
        },
        {
          titulo: 'Front desk',
          texto: 'We greet you with a smile. Cards and contactless payments accepted to keep things simple.',
        },
        {
          titulo: 'Main treatment room',
          texto: 'Fully equipped, with sterilized instruments for every single patient — no exceptions.',
        },
        {
          titulo: 'Consultation',
          texto: 'We walk you through your diagnosis on screen, step by step, so you can decide with confidence.',
        },
        {
          titulo: 'Oral surgery',
          texto: 'Dr. Claudia Ardanza in the clinic: surgical procedures under local anaesthesia with careful post-operative follow-up.',
        },
      ],
    },
  },

  endodoncia: {
    eyebrow: 'Root canals · real cases',
    titulo: 'We save your tooth — <em>you can see it in the X-ray</em>',
    sub: 'When the nerve becomes inflamed or infected from deep decay, a fracture or trauma, a root canal removes the pain and preserves your natural tooth, avoiding extraction.',
    pasos: [
      {
        titulo: 'Access & cleaning',
        texto: 'The inside of the tooth is accessed to remove damaged tissue and fully disinfect the canals.',
      },
      {
        titulo: 'Three-dimensional sealing',
        texto: 'The canals are filled with a biocompatible material that seals the tooth and keeps infection from returning.',
      },
      {
        titulo: 'Final restoration',
        texto: 'A build-up or crown returns 100% of the tooth’s strength, function and natural appearance.',
      },
    ],
    casos: [
      {
        titulo: 'Lower molar · post root canal',
        texto: 'Canals sealed and tooth rebuilt: the patient keeps their natural tooth.',
      },
      {
        titulo: 'Multi-rooted canal treatment',
        texto: 'Precise filling all the way to the apex in a molar with complex anatomy.',
      },
      {
        titulo: 'Root canal on a front tooth',
        texto: 'Canal treated and ready for its final aesthetic restoration.',
      },
    ],
    altPrefijo: 'X-ray',
    disclaimer: 'Diagnostic images of clinic patients, shared for informational purposes.',
  },

  equipo: {
    eyebrow: 'Our team',
    titulo: 'Specialists who treat every patient <em>like family</em>',
    sub: 'A team with first-class training and a warm, human, professional touch.',
    fundadora: 'Founder & director',
    agendarCon: 'Book with',
    formacionLabel: 'Training',
    experienciaLabel: 'Experience',
    enfoqueLabel: 'Focus',
    especialistasEyebrow: 'Specialists',
    miembros: [
      {
        nombre: 'Dr. Patricia Armas Padilla',
        corto: 'Dr. Patricia',
        cargo: 'Orthodontist · Director',
        cita: 'Every smile is unique. That is why no two treatments are alike: I design each plan to measure and stay with my patients until the very last check-up.',
        formacion: 'Faculty of Stomatology of Havana (Cuba)',
        experiencia: '20+ years transforming smiles',
        enfoque: 'Tailor-made orthodontics · close follow-up',
        especialidades: ['Specialist in Orthodontics', 'Specialist in Comprehensive General Dentistry'],
        bio: 'A graduate of the "Raúl González Sánchez" School of Dentistry in Havana, Cuba, with 20 years of experience transforming smiles. She designs every treatment plan personally, with close follow-ups and care that makes you feel at home.',
        foto: 'dra-patricia-clinica',
      },
      {
        nombre: 'Dr. Roberto A. Rodríguez Balart',
        corto: 'Dr. Roberto',
        cargo: 'Endodontist',
        cita: '',
        formacion: '',
        experiencia: '',
        enfoque: 'Saving your natural tooth, pain-free',
        especialidades: ['Specialist in Endodontics', 'Specialist in Comprehensive General Dentistry'],
        bio: 'A specialist in saving natural teeth: precise, pain-free root canal treatments with X-ray control at every stage.',
        foto: 'dr-roberto',
      },
      {
        nombre: 'Dr. Claudia Ardanza Camacho',
        corto: 'Dr. Claudia',
        cargo: 'Maxillofacial Surgeon',
        cita: '',
        formacion: '',
        experiencia: '',
        enfoque: 'Safe surgery and careful recovery',
        especialidades: ['Specialist in Maxillofacial Surgery'],
        bio: 'In charge of the most complex surgeries: wisdom teeth, surgical extractions and oral pathology, with careful post-operative management.',
        foto: 'dra-claudia',
      },
    ],
  },

  faq: {
    eyebrow: 'Frequently asked questions',
    titulo: 'Your questions, answered <em>before your visit</em>',
    sub: 'Have another question? Message us on WhatsApp and we will answer personally.',
    items: [
      {
        pregunta: 'Does a root canal hurt?',
        respuesta:
          'No. Root canal treatment is performed under local anesthesia and its very purpose is to remove the pain caused by nerve inflammation or infection. The canal is cleaned, disinfected and sealed with a biocompatible material, preserving your natural tooth.',
      },
      {
        pregunta: 'How long does orthodontic treatment take?',
        respuesta:
          'It depends on each case. At your consultation we perform a full diagnosis (physical, photographic and X-ray examination) and give you a personalized plan with the phases and estimated timeline from day one.',
      },
      {
        pregunta: 'Which type of braces is right for me?',
        respuesta:
          'We offer metal braces, aesthetic sapphire or ceramic braces, and removable clear aligners. At your consultation we recommend the ideal option for your case, lifestyle and aesthetic goals.',
      },
      {
        pregunta: 'Do you treat children?',
        respuesta:
          'Yes. We offer kids orthopedics and orthodontics to guide jaw growth and correct habits early, preventing complex problems in the future.',
      },
      {
        pregunta: 'Do wisdom teeth always need to be removed?',
        respuesta:
          'Not always. An X-ray tells us whether they have enough room and a healthy position. When they cause pain or risk of infection, our maxillofacial surgery specialist performs the extraction with careful post-operative follow-up.',
      },
      {
        pregunta: 'What are your opening hours?',
        respuesta:
          'We see patients Monday to Friday from 8:30 am to 4:30 pm, plus two Saturdays a month by prior arrangement. Message us on WhatsApp and we will find the time that suits you best.',
      },
      {
        pregunta: 'How do I book my first visit?',
        respuesta:
          'Message us on WhatsApp at +505 8484 9885 or give us a call. At your first visit we perform a complete evaluation and walk you through your treatment plan step by step.',
      },
    ],
  },

  contacto: {
    eyebrow: 'Visit us',
    titulo: 'We are waiting for you <em>at the clinic</em>',
    direccionLabel: 'Address',
    direccion: 'Altamira, from the west side of Palí supermarket, ½ block north, house #337',
    ciudadPais: 'Managua, Nicaragua',
    verMaps: 'View on Google Maps',
    horariosLabel: 'Opening hours',
    horarios: [
      { dias: 'Monday to Friday', horas: '8:30 am – 4:30 pm' },
      { dias: 'Saturdays', horas: 'Twice a month, by arrangement' },
    ],
    telefonoLabel: 'Phone',
    tambien: 'also on',
    mapaTitle: "Map of D'Armas Dental Clinic",
    mapa: {
      explorar: 'Explore the map',
      bloquear: 'Lock the map',
      comoLlegar: 'Get directions',
      copiar: 'Copy address',
      copiado: 'Address copied',
      abierto: 'Open now',
      cerrado: 'Closed',
      cierra: 'closes at',
      abre: 'opens',
      hoy: 'today',
      manana: 'tomorrow',
      ariaAcciones: 'Directions to the clinic',
    },
  },

  solicitud: {
    eyebrow: 'Leave us your details',
    titulo: 'Prefer that <em>we contact you</em>?',
    sub: 'Tell us what you need and our team will reach out to arrange your consultation.',
    alternativa: 'In a hurry? Message us on',
    alternativaLlamar: 'or call us at',
    nombre: 'Full name',
    telefono: 'Phone',
    correo: 'Email',
    contactoAyuda: 'Leave us at least a phone number or an email.',
    servicio: 'Service of interest',
    servicioCargando: 'Loading services…',
    servicioNinguno: 'Not sure yet',
    mensaje: 'Message',
    opcional: 'optional',
    privacidadAntes: 'I have read and accept the',
    privacidadLink: 'privacy policy',
    promociones: 'I want to receive promotions and news from the clinic.',
    enviar: 'Send my details',
    enviando: 'Sending…',
    reintentar: 'Retry',
    exitoTitulo: 'We received your details!',
    exitoTexto: 'The clinic will get in touch with you soon.',
    noDisponibleTitulo: 'This form is not available right now',
    noDisponibleTexto: 'Message us on WhatsApp or give us a call and we will assist you personally.',
    errores: {
      nombre: 'Enter your full name (2 to 120 characters).',
      contacto: 'Enter a phone number or an email so we can reach you.',
      telefono: 'The phone number is not valid: use 7 to 15 digits.',
      correo: 'The email is not valid.',
      mensaje: 'The message can be up to 1000 characters long.',
      caracteres: 'Do not use the < or > symbols.',
      privacidad: 'You must accept the privacy policy to send your details.',
      revisa: 'Check the highlighted fields.',
      validacion: 'We could not process your details. Check them and try again.',
      captcha: 'We could not verify that you are a person. Please try again.',
      captchaPendiente: 'Complete the security check before sending.',
      limite: 'Too many attempts, please try again later.',
      espera: 'You can try again in {s} s.',
      red: 'We could not send your details. Check your connection and try again.',
    },
  },

  privacidad: {
    metaTitle: "Privacy policy | D'Armas Clínica Dental",
    metaDescription: "How D'Armas Clínica Dental handles the details you leave in the contact form.",
    titulo: 'Privacy policy',
    version: 'Version',
    volver: 'Back to home',
    footerLink: 'Privacy policy',
    secciones: [
      {
        titulo: 'Who we are',
        parrafos: [
          "D'Armas Clínica Dental, located in Altamira, Managua, Nicaragua, is responsible for the personal data you share with us through this site.",
        ],
      },
      {
        titulo: 'What data we collect',
        parrafos: [
          'When you complete the contact form we receive your name, your phone number or email, the service you are interested in and any message you choose to write.',
          'We also record the page you sent the form from, the site you came from and the campaign tags in the address (for example, the post or ad that brought you here), so we know which channels help us reach our patients.',
        ],
      },
      {
        titulo: 'How we use it',
        parrafos: [
          'We use your data to contact you, answer your enquiry and arrange your appointment or consultation.',
          'We will only send you promotions and news if you ticked the corresponding box. You can withdraw that consent at any time by writing to us.',
        ],
      },
      {
        titulo: 'Where it is stored and who it is shared with',
        parrafos: [
          'Your data is stored in the management system used by the clinic and only authorised staff can access it. To protect the form against automated submissions we may rely on a security verification service.',
          'We do not sell or hand over your data to third parties for commercial purposes.',
        ],
      },
      {
        titulo: 'Your rights',
        parrafos: [
          'You can ask us at any time to access, correct or delete your data, or to stop receiving communications. To do so, message us on WhatsApp or call us at +505 8484 9885.',
        ],
      },
    ],
  },

  cta: {
    titulo: 'Your new smile starts <em>with a message</em>',
    sub: 'Book your consultation and discover how easy it is to put yourself in the hands of specialists.',
    btnWhatsapp: 'Message us on WhatsApp',
    btnLlamar: 'Call the clinic',
    footerLinks: [
      { href: '#especialidades', label: 'Specialties' },
      { href: '#ortodoncia', label: 'Orthodontics' },
      { href: '#resultados', label: 'Results' },
      { href: '#nosotros', label: 'About us' },
      { href: '#equipo', label: 'Team' },
      { href: '#faq', label: 'FAQ' },
      { href: '#contacto', label: 'Contact' },
    ],
    ariaFooter: 'Footer',
    ariaFacebook: "The clinic's Facebook page",
    ariaTiktok: "The clinic's TikTok",
    derechos: 'All rights reserved.',
  },

  barra: {
    llamar: 'Call',
    agendar: 'Book a visit',
    ariaAcciones: 'Quick actions',
    ariaWhatsapp: 'Message on WhatsApp',
  },

  tema: {
    activarOscuro: 'Switch to dark mode',
    activarClaro: 'Switch to light mode',
  },

  idioma: {
    aria: 'Change language',
  },
};
