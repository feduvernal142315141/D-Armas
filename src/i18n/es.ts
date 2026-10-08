// ─────────────────────────────────────────────────────────────
// CONTENIDO EN ESPAÑOL (idioma principal)
// Los títulos admiten HTML (<em>) y se renderizan con set:html.
// ─────────────────────────────────────────────────────────────

export const es = {
  meta: {
    title: "D'Armas Clínica Dental · Ortodoncia y especialidades en Altamira, Managua",
    description:
      'Clínica dental en Altamira, Managua: ortodoncia, endodoncia, rehabilitación oral, cirugía maxilofacial y odontología general con especialistas de 20 años de experiencia. Agenda tu cita por WhatsApp.',
    ogLocale: 'es_NI',
  },

  nav: {
    // Desktop: intenciones principales (el espacio es limitado)
    links: [
      { href: '#especialidades', label: 'Especialidades' },
      { href: '#ortodoncia', label: 'Ortodoncia' },
      { href: '#resultados', label: 'Resultados' },
      { href: '#nosotros', label: 'Nosotros' },
      { href: '#equipo', label: 'Equipo' },
      { href: '#contacto', label: 'Contacto' },
    ],
    // Menú móvil a pantalla completa: índice completo
    linksMovil: [
      { href: '#especialidades', label: 'Especialidades' },
      { href: '#ortodoncia', label: 'Ortodoncia' },
      { href: '#resultados', label: 'Resultados' },
      { href: '#nosotros', label: 'Nosotros' },
      { href: '#equipo', label: 'Equipo' },
      { href: '#faq', label: 'Preguntas' },
      { href: '#contacto', label: 'Contacto' },
    ],
    agendar: 'Agendar cita',
    menu: 'Menú',
    ubicacion: 'Altamira · Managua',
    ariaRedes: 'Redes sociales',
    ariaPrincipal: 'Principal',
    ariaMenuMovil: 'Menú móvil',
    ariaAbrir: 'Abrir menú',
    ariaCerrar: 'Cerrar menú',
  },

  whatsapp: {
    cita: "¡Hola! Quiero agendar una cita en Clínica Dental D'Armas!!!",
    tratamiento: (nombre: string) =>
      `¡Hola! Quiero información sobre ${nombre} en Clínica Dental D'Armas!!!`,
    ortodoncia: "¡Hola! Quiero agendar una valoración de ortodoncia en Clínica Dental D'Armas!!!",
    doctor: (nombre: string) => `¡Hola! Quiero agendar una cita con ${nombre} en Clínica Dental D'Armas!!!`,
  },

  hero: {
    eyebrowCorto: 'Altamira · Managua',
    eyebrowLargo: 'Clínica dental de especialidades · Altamira, Managua',
    titulo: 'La sonrisa que quieres, con el <em>cuidado</em> que mereces',
    subCorto: 'Todas las especialidades en un solo lugar, con especialistas de primer nivel.',
    subLargo:
      'Ortodoncia, endodoncia, coronas y todo lo que tu salud oral necesita, en un solo lugar y con especialistas de primer nivel que te acompañan en cada paso.',
    ctaWhatsapp: 'Agenda por WhatsApp',
    ctaLlamar: 'Llámanos',
    chipValor: '20+',
    chipLabel: 'años de experiencia',
    chipEstrella: 'Atención de primer nivel',
    chipEstrellaSub: 'Especialistas certificados',
    fotoAlt: "Dra. Patricia Armas, ortodoncista de D'Armas Clínica Dental",
    draNombre: 'Dra. Patricia Armas',
    draCargo: 'Ortodoncista',
  },

  especialidades: {
    eyebrow: 'Especialidades',
    titulo: 'Todo lo que tu sonrisa necesita, <em>en un solo lugar</em>',
    sub: 'Desde una limpieza hasta rehabilitaciones completas: cada tratamiento lo realiza el especialista indicado, con tecnología y materiales de primera.',
    foco: 'Foco de la clínica',
    consultar: 'Consultar por este tratamiento',
    items: [
      {
        id: 'ortodoncia',
        nombre: 'Ortodoncia',
        destacado: true,
        descripcion:
          'Mucho más que estética: una oclusión correcta que mejora tu masticación, tu higiene y tu confianza. Brackets metálicos, estéticos, alineadores invisibles y ortodoncia infantil.',
        tags: ['Brackets', 'Alineadores invisibles', 'Ortodoncia infantil'],
      },
      {
        id: 'endodoncia',
        nombre: 'Endodoncia',
        destacado: true,
        descripcion:
          'Cuando el nervio del diente se inflama o infecta, el tratamiento de conducto elimina el dolor, sana la infección y salva tu diente natural evitando la extracción.',
        tags: ['Tratamiento de conducto', 'Urgencias por dolor'],
      },
      {
        id: 'rehabilitacion',
        nombre: 'Rehabilitación oral',
        destacado: true,
        descripcion:
          'Coronas y prótesis que devuelven la fuerza, la funcionalidad y la estética natural de tu sonrisa, con materiales de primera calidad.',
        tags: ['Coronas', 'Prótesis fija y removible'],
      },
      {
        id: 'maxilofacial',
        nombre: 'Cirugía maxilofacial',
        destacado: false,
        descripcion:
          'Cirugía de cordales, extracciones quirúrgicas y patología oral en manos de nuestra especialista, con manejo cuidadoso del postoperatorio.',
        tags: ['Cordales', 'Cirugía oral'],
      },
      {
        id: 'general',
        nombre: 'Odontología general integral',
        destacado: false,
        descripcion:
          'El cuidado de toda la familia en un solo lugar: limpiezas, resinas, blanqueamiento, extracciones simples y control periódico de tu salud oral.',
        tags: ['Limpieza', 'Blanqueamiento', 'Resinas'],
      },
    ],
  },

  ortodoncia: {
    eyebrow: 'Nuestra especialidad',
    titulo: 'Ortodoncia que transforma <em>tu sonrisa y tu salud</em>',
    intro:
      'Un tratamiento de ortodoncia va mucho más allá de la estética: corrige la posición de los dientes y maxilares para lograr una masticación correcta, una mejor higiene oral y una confianza que se nota.',
    procesoTitulo: 'Así trabajamos,',
    procesoTituloEm: 'paso a paso',
    tipos: [
      {
        nombre: 'Brackets metálicos',
        texto:
          'La opción clásica, altamente resistente y efectiva para todo tipo de casos, de los más sencillos a los más complejos. Hoy más cómodos y discretos que nunca.',
      },
      {
        nombre: 'Brackets estéticos',
        texto:
          'Zafiro o cerámica: la eficacia de los brackets fijos con una estética superior. Se camuflan con el color natural de tus dientes y pasan desapercibidos.',
      },
      {
        nombre: 'Ortodoncia invisible',
        texto:
          'Alineadores transparentes hechos a la medida, removibles: come con libertad, mantén tu higiene sin complicaciones y casi nadie notará que los llevas.',
      },
      {
        nombre: 'Ortopedia y ortodoncia infantil',
        texto:
          'Guía el crecimiento de los maxilares y corrige malos hábitos a tiempo, previniendo problemas complejos en la adolescencia y adultez.',
      },
    ],
    proceso: [
      {
        titulo: 'Diagnóstico integral',
        texto: 'Examen físico, fotográfico y radiográfico para evaluar tu mordida con máxima precisión.',
      },
      {
        titulo: 'Plan personalizado',
        texto: 'Una estrategia a tu medida, con las fases del tratamiento y el tiempo estimado explicados con claridad.',
      },
      {
        titulo: 'Colocación',
        texto: 'Inicia el tratamiento con la colocación de tus brackets o la entrega de tus primeros alineadores.',
      },
      {
        titulo: 'Revisiones mensuales',
        texto: 'Ajustes mes a mes para que tus dientes se desplacen de forma segura hacia su posición ideal.',
      },
      {
        titulo: 'Retiro y retención',
        texto: 'Se retira la aparatología y se coloca un retenedor de contención para mantener tu nueva sonrisa.',
      },
    ],
    cta: 'Agenda tu valoración de ortodoncia',
    nota: 'Brackets desde lo clásico hasta lo invisible, para adultos y niños.',
  },

  resultados: {
    eyebrow: 'Antes y después',
    titulo: 'Resultados reales de <em>nuestros pacientes</em>',
    sub: 'Cada caso es distinto, pero el destino es el mismo: una sonrisa sana, alineada y de la que te sientas orgulloso.',
    casos: [
      {
        titulo: 'Apiñamiento corregido con ortodoncia',
        texto: 'De dientes apiñados a una sonrisa alineada y funcional: el poder de un plan bien ejecutado.',
      },
      {
        titulo: 'Cierre de espacios en proceso',
        texto: 'Brackets trabajando mes a mes: los espacios se cierran y la mordida encuentra su posición ideal.',
      },
      {
        titulo: 'Ortopedia infantil a tiempo',
        texto: 'Guiar el crecimiento de los maxilares en la niñez previene tratamientos complejos en el futuro.',
      },
    ],
    altPrefijo: 'Antes y después',
    disclaimer: 'Casos tratados en la clínica, compartidos con autorización de los pacientes.',
  },

  nosotros: {
    eyebrow: 'Acerca de nosotros',
    statement: 'Nos apasiona <em>transformar sonrisas</em> y cuidar la salud bucodental de toda la familia',
    texto:
      'Ubicados en Altamira, Managua, ofrecemos una atención odontológica integral y especializada, con un fuerte enfoque en ortodoncia, para garantizar que cada paciente reciba el tratamiento ideal para una sonrisa sana y alineada.',
    mision: {
      titulo: 'Nuestra misión',
      texto:
        'Brindar servicios dentales de alta calidad con un trato humano, cálido y profesional, utilizando tecnología y técnicas actualizadas para asegurar el bienestar y la confianza de cada persona que nos visita.',
      claves: ['Trato humano', 'Tecnología', 'Confianza'],
    },
    vision: {
      titulo: 'Nuestra visión',
      texto:
        'Ser la clínica dental de referencia en Managua, reconocida por la excelencia en nuestros tratamientos, la satisfacción de nuestros pacientes y nuestro compromiso constante con la salud oral.',
      claves: ['Referencia', 'Excelencia', 'Compromiso'],
    },
    valoresEyebrow: 'Lo que nos guía',
    valores: [
      { nombre: 'Empatía', texto: 'Escuchamos antes de tratar.' },
      { nombre: 'Excelencia', texto: 'Especialistas y técnicas al día.' },
      { nombre: 'Honestidad', texto: 'Solo el tratamiento que necesitas.' },
      { nombre: 'Cercanía', texto: 'Te acompañamos en cada paso.' },
    ],
  },

  porque: {
    eyebrow: "Por qué D'Armas",
    titulo: 'Una clínica pensada para que <em>vuelvas sonriendo</em>',
    sub: 'Atención odontológica integral y especializada, en un espacio donde te sientes como en casa.',
    razones: [
      {
        titulo: 'Atención personalizada',
        texto: 'Cada sonrisa es única: diseñamos planes de tratamiento adaptados a tus necesidades específicas.',
      },
      {
        titulo: 'Especialistas en cada área',
        texto: 'Experiencia profesional enfocada en lograr resultados estéticos y funcionales óptimos.',
      },
      {
        titulo: 'Ambiente seguro y cómodo',
        texto: 'Un espacio pensado para que te sientas como en casa: tranquilo y en confianza durante toda tu visita.',
      },
      {
        titulo: 'Tecnología y técnicas actualizadas',
        texto: 'Diagnóstico apoyado en radiografías y equipos modernos para asegurar tu bienestar en cada consulta.',
      },
    ],
    statsLabels: ['Años de experiencia', 'Especialidades', 'Especialistas certificados'],
    galeria: {
      verTodas: 'Ver la clínica',
      ampliar: 'Ampliar foto',
      cerrar: 'Cerrar galería',
      anterior: 'Foto anterior',
      siguiente: 'Foto siguiente',
      aria: "Galería de D'Armas Clínica Dental",
      miniaturas: 'Miniaturas',
      fotos: [
        {
          titulo: 'Atención en consulta',
          texto: 'Cada tratamiento se realiza con protocolos de bioseguridad y el tiempo que tu sonrisa merece.',
        },
        {
          titulo: 'Gabinete de ortodoncia',
          texto: 'Sillón de última generación en un espacio luminoso, pensado para que estés cómodo durante toda la sesión.',
        },
        {
          titulo: 'Sala de espera',
          texto: 'Un rincón tranquilo para llegar con calma: luz natural, plantas y agua fresca mientras te atendemos.',
        },
        {
          titulo: 'Recepción',
          texto: 'Te recibimos con una sonrisa. Aceptamos tarjetas y pago sin contacto para que todo sea más fácil.',
        },
        {
          titulo: 'Gabinete principal',
          texto: 'Equipamiento completo e instrumental esterilizado para cada paciente, sin excepciones.',
        },
        {
          titulo: 'Consulta de valoración',
          texto: 'Te explicamos tu diagnóstico en pantalla, paso a paso, para que tomes decisiones con confianza.',
        },
        {
          titulo: 'Cirugía maxilofacial',
          texto: 'La Dra. Claudia Ardanza en consulta: procedimientos quirúrgicos con anestesia local y un postoperatorio cuidado.',
        },
      ],
    },
  },

  endodoncia: {
    eyebrow: 'Endodoncia · casos reales',
    titulo: 'Salvamos tu diente, <em>hasta en la radiografía se ve</em>',
    sub: 'Cuando el nervio se inflama o infecta por una caries profunda, una fractura o un golpe, el tratamiento de conducto elimina el dolor y preserva tu diente natural, evitando la extracción.',
    pasos: [
      {
        titulo: 'Apertura y limpieza',
        texto: 'Se accede al interior del diente para retirar el tejido dañado y desinfectar por completo los conductos.',
      },
      {
        titulo: 'Sellado tridimensional',
        texto: 'Los conductos se rellenan con un material biocompatible que sella la pieza y evita que la infección regrese.',
      },
      {
        titulo: 'Restauración final',
        texto: 'Una reconstrucción o corona devuelve al diente el 100% de su fuerza, funcionalidad y estética natural.',
      },
    ],
    casos: [
      {
        titulo: 'Molar inferior · post-endodoncia',
        texto: 'Conductos sellados y diente reconstruido: el paciente conserva su pieza natural.',
      },
      {
        titulo: 'Tratamiento de conducto multirradicular',
        texto: 'Obturación precisa hasta el ápice en un molar de anatomía compleja.',
      },
      {
        titulo: 'Endodoncia en diente anterior',
        texto: 'Conducto tratado y listo para su restauración estética definitiva.',
      },
    ],
    altPrefijo: 'Radiografía',
    disclaimer: 'Imágenes diagnósticas de pacientes de la clínica, compartidas con fines informativos.',
  },

  equipo: {
    eyebrow: 'Nuestro equipo',
    titulo: 'Especialistas que tratan a cada paciente <em>como familia</em>',
    sub: 'Un equipo con formación de primer nivel y un trato humano, cálido y profesional.',
    fundadora: 'Fundadora y directora',
    agendarCon: 'Agendar con',
    formacionLabel: 'Formación',
    experienciaLabel: 'Experiencia',
    enfoqueLabel: 'Enfoque',
    especialistasEyebrow: 'Especialistas',
    miembros: [
      {
        nombre: 'Dra. Patricia Armas Padilla',
        corto: 'la Dra. Patricia',
        cargo: 'Ortodoncista · Directora',
        especialidades: ['Especialista en Ortodoncia', 'Especialista en Odontología General Integral'],
        bio: 'Graduada en la Facultad de Estomatología de La Habana "Raúl González Sánchez" (Cuba), con 20 años de experiencia transformando sonrisas. Diseña cada tratamiento a la medida, con controles cercanos y un trato que te hace sentir en casa.',
        cita: 'Cada sonrisa es única. Por eso no hay dos tratamientos iguales: diseño cada plan a la medida y acompaño a mis pacientes hasta el último control.',
        formacion: 'Facultad de Estomatología de La Habana (Cuba)',
        experiencia: '20+ años transformando sonrisas',
        enfoque: 'Ortodoncia a la medida · controles cercanos',
        foto: 'dra-patricia-clinica',
      },
      {
        nombre: 'Dr. Roberto A. Rodríguez Balart',
        corto: 'el Dr. Roberto',
        cargo: 'Endodoncista',
        especialidades: ['Especialista en Endodoncia', 'Especialista en Odontología General Integral'],
        bio: 'Especialista en salvar dientes naturales: tratamientos de conducto precisos, sin dolor y con control radiográfico en cada etapa.',
        cita: '',
        formacion: '',
        experiencia: '',
        enfoque: 'Salvar tu diente natural, sin dolor',
        foto: 'dr-roberto',
      },
      {
        nombre: 'Dra. Claudia Ardanza Camacho',
        corto: 'la Dra. Claudia',
        cargo: 'Cirujana Maxilofacial',
        especialidades: ['Especialista en Cirugía Maxilofacial'],
        bio: 'A cargo de las cirugías de mayor complejidad: cordales, extracciones quirúrgicas y patología oral, con un manejo cuidadoso del postoperatorio.',
        cita: '',
        formacion: '',
        experiencia: '',
        enfoque: 'Cirugía segura y postoperatorio cuidado',
        foto: 'dra-claudia',
      },
    ],
  },

  faq: {
    eyebrow: 'Preguntas frecuentes',
    titulo: 'Resolvemos tus dudas <em>antes de la cita</em>',
    sub: '¿Tienes otra pregunta? Escríbenos por WhatsApp y te respondemos personalmente.',
    items: [
      {
        pregunta: '¿El tratamiento de conducto duele?',
        respuesta:
          'No. La endodoncia se realiza con anestesia local y precisamente busca eliminar el dolor causado por la inflamación o infección del nervio. Se limpia el conducto, se desinfecta y se sella con un material biocompatible, preservando tu diente natural.',
      },
      {
        pregunta: '¿Cuánto dura un tratamiento de ortodoncia?',
        respuesta:
          'Depende de cada caso. En tu valoración realizamos un diagnóstico integral (examen físico, fotográfico y radiográfico) y te entregamos un plan personalizado con las fases y el tiempo estimado desde el inicio.',
      },
      {
        pregunta: '¿Qué tipo de brackets me convienen?',
        respuesta:
          'Ofrecemos brackets metálicos, brackets estéticos de zafiro o cerámica y alineadores invisibles removibles. En la valoración te recomendamos la opción ideal según tu caso, estilo de vida y objetivos estéticos.',
      },
      {
        pregunta: '¿Atienden niños?',
        respuesta:
          'Sí. Contamos con ortopedia y ortodoncia infantil para guiar el crecimiento de los maxilares y corregir malos hábitos a tiempo, previniendo problemas complejos en el futuro.',
      },
      {
        pregunta: '¿Es necesario sacar las muelas del juicio?',
        respuesta:
          'No siempre. Se evalúa con una radiografía si tienen espacio y posición adecuada. Cuando causan dolor o riesgo de infección, la extracción la realiza nuestra especialista en cirugía maxilofacial con todo el cuidado del postoperatorio.',
      },
      {
        pregunta: '¿Cuáles son los horarios de atención?',
        respuesta:
          'Atendemos de lunes a viernes de 8:30 am a 4:30 pm. También trabajamos dos sábados al mes con previa coordinación. Escríbenos por WhatsApp y buscamos el espacio que mejor te convenga.',
      },
      {
        pregunta: '¿Cómo agendo mi primera cita?',
        respuesta:
          'Escríbenos por WhatsApp al +505 8484 9885 o llámanos. En tu primera visita hacemos una valoración completa y te explicamos tu plan de tratamiento paso a paso.',
      },
    ],
  },

  contacto: {
    eyebrow: 'Visítanos',
    titulo: 'Te esperamos <em>en la clínica</em>',
    direccionLabel: 'Dirección',
    direccion: 'Altamira, del costado oeste del Palí, ½ cuadra al norte, casa #337',
    ciudadPais: 'Managua, Nicaragua',
    verMaps: 'Ver en Google Maps',
    horariosLabel: 'Horarios',
    horarios: [
      { dias: 'Lunes a viernes', horas: '8:30 am – 4:30 pm' },
      { dias: 'Sábados', horas: 'Dos al mes, previa coordinación' },
    ],
    telefonoLabel: 'Teléfono',
    tambien: 'también por',
    mapaTitle: "Mapa de D'Armas Clínica Dental",
    mapa: {
      explorar: 'Explorar el mapa',
      bloquear: 'Bloquear el mapa',
      comoLlegar: 'Cómo llegar',
      copiar: 'Copiar dirección',
      copiado: 'Dirección copiada',
      abierto: 'Abierto ahora',
      cerrado: 'Cerrado',
      cierra: 'cierra a las',
      abre: 'abre',
      hoy: 'hoy',
      manana: 'mañana',
      ariaAcciones: 'Cómo llegar a la clínica',
    },
  },

  solicitud: {
    eyebrow: 'Déjanos tus datos',
    titulo: '¿Prefieres que <em>te contactemos</em>?',
    sub: 'Cuéntanos qué necesitas y nuestro equipo se comunicará contigo para coordinar tu valoración.',
    alternativa: '¿Tienes prisa? Escríbenos por',
    alternativaLlamar: 'o llámanos al',
    nombre: 'Nombre completo',
    telefono: 'Teléfono',
    correo: 'Correo electrónico',
    contactoAyuda: 'Déjanos al menos un teléfono o un correo.',
    servicio: 'Servicio de interés',
    servicioCargando: 'Cargando servicios…',
    servicioNinguno: 'Aún no lo sé',
    mensaje: 'Mensaje',
    opcional: 'opcional',
    privacidadAntes: 'He leído y acepto la',
    privacidadLink: 'política de privacidad',
    promociones: 'Quiero recibir promociones y novedades de la clínica.',
    enviar: 'Enviar mis datos',
    enviando: 'Enviando…',
    reintentar: 'Reintentar',
    exitoTitulo: '¡Recibimos tus datos!',
    exitoTexto: 'La clínica se pondrá en contacto contigo pronto.',
    noDisponibleTitulo: 'Este formulario no está disponible por ahora',
    noDisponibleTexto: 'Escríbenos por WhatsApp o llámanos y te atendemos personalmente.',
    errores: {
      nombre: 'Escribe tu nombre completo (entre 2 y 120 caracteres).',
      contacto: 'Indica un teléfono o un correo para poder contactarte.',
      telefono: 'El teléfono no es válido: usa entre 7 y 15 dígitos.',
      correo: 'El correo no es válido.',
      mensaje: 'El mensaje admite hasta 1000 caracteres.',
      caracteres: 'No uses los símbolos < ni >.',
      privacidad: 'Debes aceptar la política de privacidad para enviar tus datos.',
      revisa: 'Revisa los campos marcados.',
      validacion: 'No pudimos procesar tus datos. Revísalos e inténtalo de nuevo.',
      captcha: 'No pudimos verificar que eres una persona. Inténtalo de nuevo.',
      captchaPendiente: 'Completa la verificación de seguridad antes de enviar.',
      limite: 'Demasiados intentos, inténtalo más tarde.',
      espera: 'Podrás intentarlo de nuevo en {s} s.',
      red: 'No pudimos enviar tus datos. Revisa tu conexión e inténtalo de nuevo.',
    },
  },

  reserva: {
    gracias: '¡Gracias, {nombre}!',
    invitacion: 'Ya recibimos tus datos. ¿Quieres agendar tu cita ahora?',
    agendar: 'Agendar mi cita ahora',
    llamenme: 'Prefiero que me llamen',
    paso: 'Paso {n} de {total}',
    atras: 'Atrás',
    cargando: 'Cargando…',
    reintentar: 'Reintentar',
    tituloServicio: '¿Qué servicio necesitas?',
    minutos: '{n} min',
    sugerido: 'Tu elección',
    tituloDoctor: '¿Con quién quieres atenderte?',
    cualquiera: 'Cualquier doctor disponible',
    cualquieraDetalle: 'Te asignamos a quien tenga espacio primero',
    tituloFecha: 'Elige día y hora',
    diasAnteriores: 'Días anteriores',
    diasSiguientes: 'Días siguientes',
    sinHorarios: 'No hay horarios disponibles en estos días. Prueba con los siguientes.',
    horaDe: 'Hora de {ciudad}',
    tituloConfirmar: 'Confirma tu cita',
    lblServicio: 'Servicio',
    lblDoctor: 'Doctor',
    lblFecha: 'Fecha',
    lblHora: 'Hora',
    lblClinica: 'Clínica',
    lblReferencia: 'Referencia',
    doctorAsignar: 'Te asignaremos un doctor disponible',
    confirmar: 'Confirmar cita',
    confirmando: 'Reservando…',
    reservadaTitulo: '¡Tu cita está reservada!',
    canceladaTitulo: 'Esta cita fue cancelada',
    canceladaTexto: 'Escríbenos por WhatsApp para agendar una nueva.',
    calendario: 'Agregar a mi calendario',
    cambios: '¿Necesitas cambiar o cancelar tu cita? Escríbenos por',
    waCambio: "¡Hola! Tengo una cita reservada en Clínica Dental D'Armas con la referencia {ref} y necesito ayuda.",
    expira: 'Tu sesión vence en menos de 5 minutos. Confirma tu cita pronto.',
    sinServiciosTitulo: 'La clínica te contactará para agendar',
    sinServiciosTexto: 'Ya tenemos tus datos; te escribiremos para coordinar tu cita.',
    requiereClinicaTitulo: 'Recibimos tu solicitud',
    requiereClinica: 'La clínica se pondrá en contacto contigo para confirmar tu cita.',
    errYaAtendida: 'Tu solicitud ya fue atendida por la clínica. Si necesitas ayuda, escríbenos por WhatsApp.',
    errSesionExpirada: 'Tu sesión para agendar expiró. Envía el formulario de nuevo para continuar.',
    errSesionInvalida: 'No pudimos continuar con tu reserva. Envía el formulario de nuevo.',
    errHorarioOcupado: 'Ese horario se acaba de ocupar. Elige otro.',
    errInvalida: 'Esa opción ya no está disponible. Elige de nuevo.',
    errLimite: 'Demasiados intentos, inténtalo más tarde.',
    errEspera: 'Podrás intentarlo de nuevo en {s} s.',
    errValidacion: 'No pudimos procesar tu solicitud. Inténtalo de nuevo.',
    errRed: 'No pudimos conectar. Revisa tu conexión e inténtalo de nuevo.',
  },

  privacidad: {
    metaTitle: "Política de privacidad | D'Armas Clínica Dental",
    metaDescription: "Cómo D'Armas Clínica Dental trata los datos que nos dejas en el formulario de contacto.",
    titulo: 'Política de privacidad',
    version: 'Versión',
    volver: 'Volver al inicio',
    footerLink: 'Política de privacidad',
    secciones: [
      {
        titulo: 'Quiénes somos',
        parrafos: [
          "D'Armas Clínica Dental, ubicada en Altamira, Managua, Nicaragua, es responsable de los datos personales que nos compartes a través de este sitio.",
        ],
      },
      {
        titulo: 'Qué datos recopilamos',
        parrafos: [
          'Cuando completas el formulario de contacto recibimos tu nombre, tu teléfono o tu correo electrónico, el servicio que te interesa y el mensaje que decidas escribir.',
          'También registramos la página desde la que enviaste el formulario, el sitio desde el que llegaste y las etiquetas de campaña de la dirección (por ejemplo, la publicación o anuncio que te trajo), para saber qué canales nos ayudan a llegar a nuestros pacientes.',
        ],
      },
      {
        titulo: 'Para qué los usamos',
        parrafos: [
          'Usamos tus datos para contactarte, responder tu consulta y coordinar tu cita o valoración.',
          'Solo te enviaremos promociones y novedades si marcaste la casilla correspondiente. Puedes retirar ese consentimiento en cualquier momento escribiéndonos.',
        ],
      },
      {
        titulo: 'Dónde se guardan y con quién se comparten',
        parrafos: [
          'Tus datos se guardan en el sistema de gestión que utiliza la clínica y solo accede a ellos el personal autorizado. Para proteger el formulario contra envíos automatizados podemos apoyarnos en un servicio de verificación de seguridad.',
          'No vendemos ni cedemos tus datos a terceros con fines comerciales.',
        ],
      },
      {
        titulo: 'Tus derechos',
        parrafos: [
          'Puedes pedirnos en cualquier momento acceder a tus datos, corregirlos o eliminarlos, así como dejar de recibir comunicaciones. Para hacerlo, escríbenos por WhatsApp o llámanos al +505 8484 9885.',
        ],
      },
    ],
  },

  cta: {
    titulo: 'Tu nueva sonrisa empieza <em>con un mensaje</em>',
    sub: 'Agenda tu valoración y descubre lo fácil que es ponerte en manos de especialistas.',
    btnWhatsapp: 'Escríbenos por WhatsApp',
    btnLlamar: 'Llamar a la clínica',
    footerLinks: [
      { href: '#especialidades', label: 'Especialidades' },
      { href: '#ortodoncia', label: 'Ortodoncia' },
      { href: '#resultados', label: 'Resultados' },
      { href: '#nosotros', label: 'Nosotros' },
      { href: '#equipo', label: 'Equipo' },
      { href: '#faq', label: 'Preguntas' },
      { href: '#contacto', label: 'Contacto' },
    ],
    ariaFooter: 'Pie de página',
    ariaFacebook: 'Facebook de la clínica',
    ariaTiktok: 'TikTok de la clínica',
    derechos: 'Todos los derechos reservados.',
  },

  barra: {
    llamar: 'Llamar',
    agendar: 'Agendar cita',
    ariaAcciones: 'Acciones rápidas',
    ariaWhatsapp: 'Escribir por WhatsApp',
  },

  tema: {
    activarOscuro: 'Activar modo oscuro',
    activarClaro: 'Activar modo claro',
  },

  idioma: {
    aria: 'Cambiar idioma',
  },
} as const;

export type Dict = typeof es;
