// ============================================================
// CHATBOT - Preguntas y Respuestas
// Edita este archivo para cambiar lo que responde el chatbot
// ============================================================
// Formato:
//   { q: ["palabra1", "palabra2", ...], en: "Respuesta en inglés", es: "Respuesta en español" }
//   - q: palabras clave que activan esta respuesta (escribe en minúsculas)
//   - en: respuesta en inglés
//   - es: respuesta en español
// ============================================================

window.__CHATBOT_DATA = [
  {
    q: ["programs", "programas", "classes", "clases", "offer", "ofrecen"],
    en: "We offer 4 programs:\n• Tiny Tigers (Ages 4-6)\n• Kids Martial Arts (Ages 7-12)\n• Adult Fitness Program (Ages 13+)\n• Life Skills After School Program (Ages 6-12)\n\nAll include character development, confidence building, and athletic training.",
    es: "Ofrecemos 4 programas:\n• Tigres Pequeños (Edades 4-6)\n• Artes Marciales para Niños (Edades 7-12)\n• Programa de Fitness para Adultos (Edades 13+)\n• Programa Extraescolar (Edades 6-12)\n\nTodos incluyen desarrollo de carácter, confianza y entrenamiento atlético."
  },
  {
    q: ["cost", "price", "pricing", "precios", "cuanto", "cuesta", "costs", "prices", "tuition", "fee", "cuota", "mensualidad", "pay", "pago", "dollars"],
    en: "We have a special offer: 2 FREE classes + 3 months for only $149, including uniform and evaluation.\n\nWe also have a 100% money-back guarantee: if your child doesn't love their first week, we refund every penny.",
    es: "Tenemos una oferta especial: 2 clases GRATIS + 3 meses por solo $149, incluye uniforme y evaluación.\n\nTambién tenemos garantía de devolución: si tu hijo no ama su primera semana, devolvemos cada centavo."
  },
  {
    q: ["ages", "age", "edades", "edad", "old", "years"],
    en: "We serve students of all ages:\n• Tiny Tigers: Ages 4-6\n• Kids Martial Arts: Ages 7-12\n• Teens & Adults: Ages 13+",
    es: "Aceptamos estudiantes de todas las edades:\n• Tigres Pequeños: Edades 4-6\n• Artes Marciales para Niños: Edades 7-12\n• Adolescentes y Adultos: Edades 13+"
  },
  {
    q: ["location", "ubicacion", "ubicados", "address", "direccion", "where", "donde", "located"],
    en: "We are located at:\n9450 Griffin Rd, Cooper City, FL 33328\n\nPhone: 954-380-1340",
    es: "Estamos ubicados en:\n9450 Griffin Rd, Cooper City, FL 33328\n\nTeléfono: 954-380-1340"
  },
  {
    q: ["guarantee", "garantia", "refund", "devolucion", "money", "back", "garantía", "devolución"],
    en: "Yes! We offer a 100% Money-Back Guarantee. If your child doesn't love their first week, we'll refund every penny. No questions asked.",
    es: "¡Sí! Ofrecemos una Garantía de Devolución del 100%. Si tu hijo no ama su primera semana, devolvemos cada centavo. Sin preguntas."
  },
  {
    q: ["trial", "free", "prueba", "gratis", "start", "empezar", "comenzar", "sample"],
    en: "You can start with 2 completely FREE classes. After that, our special offer is 3 months for $149 including uniform. Click 'Start Today' on our website to claim your spot!",
    es: "Puedes empezar con 2 clases completamente GRATIS. Después, nuestra oferta especial es 3 meses por $149 incluyendo uniforme. ¡Haz clic en 'Empieza Hoy' en nuestro sitio web para reservar tu lugar!"
  },
  {
    q: ["adhd", "tdah", "focus", "enfoque", "attention", "hyper", "hiper"],
    en: "Yes! Martial arts is highly effective for kids with ADHD. The structured environment, clear expectations, and physical activity help channel energy productively while building focus and self-regulation skills.",
    es: "¡Sí! Las artes marciales son muy efectivas para niños con TDAH. El ambiente estructurado, las expectativas claras y la actividad física ayudan a canalizar la energía mientras desarrollan enfoque y autorregulación."
  },
  {
    q: ["shy", "timido", "tímido", "quiet", "callado", "introvert", "reserved", "reservado"],
    en: "Absolutely! Martial arts is one of the best activities for shy children. Our supportive environment helps them come out of their shell at their own pace. Many of our most confident students started as shy kids.",
    es: "¡Absolutamente! Las artes marciales son de las mejores actividades para niños tímidos. Nuestro ambiente de apoyo les ayuda a salir de su caparazón a su propio ritmo. Muchos estudiantes seguros comenzaron como niños tímidos."
  },
  {
    q: ["difference", "different", "diferencia", "diferente", "better", "mejor", "why", "porque", "unique"],
    en: "Master Baez combines elite athletic training with character development in a way no other school does. We use modern, gamified approaches, and we truly partner with parents to develop confident leaders. Founded in 1991, serving Cooper City for over 30 years.",
    es: "Master Baez combina entrenamiento atlético de élite con desarrollo de carácter como ninguna otra escuela. Usamos enfoques modernos y dinámicos, y nos asociamos con los padres para desarrollar líderes seguros. Fundados en 1991, sirviendo a Cooper City por más de 30 años."
  },
  {
    q: ["beginner", "principiante", "never", "nunca", "new", "nuevo", "first time", "primera vez", "behind", "atras"],
    en: "Not at all! Every champion starts as a beginner. Our coaches are experts at welcoming new students and meeting them where they are. Everyone progresses at their own pace.",
    es: "¡Para nada! Todo campeón comienza como principiante. Nuestros entrenadores son expertos en dar la bienvenida a nuevos estudiantes. Cada uno progresa a su propio ritmo."
  },
  {
    q: ["violent", "violencia", "violento", "aggressive", "agresivo", "agresion", "agresión", "fighting", "peleas"],
    en: "No, martial arts teaches self-control, discipline, and respect. Our students learn that real strength is about confidence and character, not aggression. It actually reduces the likelihood of bullying behavior.",
    es: "No, las artes marciales enseñan autocontrol, disciplina y respeto. Nuestros estudiantes aprenden que la fuerza real es sobre confianza y carácter, no agresión. De hecho, reduce la probabilidad de acoso."
  },
  {
    q: ["results", "resultados", "time", "tiempo", "how long", "cuanto tiempo", "see", "ver", "change", "cambio"],
    en: "Many parents notice changes in confidence and attitude within the first few weeks. The real transformation builds over months as your child progresses through our belt system.",
    es: "Muchos padres notan cambios en confianza y actitud dentro de las primeras semanas. La transformación real se construye a lo largo de meses a medida que tu hijo progresa en nuestro sistema."
  },
  {
    q: ["belt", "cinturon", "cinturón", "test", "exam", "examen", "promotion", "promocion", "stripes", "franjas"],
    en: "Belt tests happen every 2-3 months. Students earn 3 black tape stripes as they progress. When they earn the 4th stripe (red), they are ready for their belt test. Minimum 2 days per week attendance recommended.",
    es: "Los exámenes de cinturón son cada 2-3 meses. Los estudiantes ganan 3 franjas de cinta negra al progresar. Cuando ganan la 4ta franja (roja), están listos para el examen. Se recomienda mínimo 2 días por semana."
  },
  {
    q: ["tiny", "tigers", "tigres", "pequenos", "pequeños", "age 4", "age 5", "age 6"],
    en: "Tiny Tigers is our program for ages 4-6. It builds foundational motor skills, social interaction, and a love for physical activity in a fun, high-energy environment.",
    es: "Tigres Pequeños es nuestro programa para edades 4-6. Desarrolla habilidades motoras, interacción social y amor por la actividad física en un ambiente divertido y de alta energía."
  },
  {
    q: ["kids", "children", "ninos", "niños", "child", "hijo", "hija", "children's", "infantil"],
    en: "Our Kids Martial Arts program (ages 7-12) focuses on advanced technique, leadership development, and character building. Kids transform into confident young leaders while having fun and staying fit.",
    es: "Nuestro programa de Artes Marciales para Niños (edades 7-12) se enfoca en técnica avanzada, desarrollo de liderazgo y formación de carácter. Los niños se transforman en líderes seguros mientras se divierten."
  },
  {
    q: ["adult", "adults", "adultos", "adulto", "teen", "teens", "adolescentes", "adolescente", "fitness"],
    en: "Our Adult Fitness Program (ages 13+) offers elite training in martial arts, strength conditioning, and leadership skills. Perfect for teens and adults looking for a challenging workout that builds character.",
    es: "Nuestro Programa de Fitness para Adultos (edades 13+) ofrece entrenamiento de élite en artes marciales, acondicionamiento físico y liderazgo. Perfecto para adolescentes y adultos que buscan un reto."
  },
  {
    q: ["after", "school", "extraescolar", "aftercare", "childcare", "cuidado"],
    en: "Our Life Skills After School Program (ages 6-12) provides structured after-school care combining martial arts training and character development in a safe environment.",
    es: "Nuestro Programa Extraescolar (edades 6-12) ofrece cuidado después de la escuela combinando entrenamiento de artes marciales y desarrollo de carácter en un ambiente seguro."
  },
  {
    q: ["phone", "telefono", "teléfono", "call", "llamar", "contact", "contacto"],
    en: "You can reach us at 954-380-1340. Or visit us at 9450 Griffin Rd, Cooper City, FL 33328.",
    es: "Puedes llamarnos al 954-380-1340. O visítanos en 9450 Griffin Rd, Cooper City, FL 33328."
  },
  {
    q: ["hours", "horarios", "schedule", "horario", "open", "abierto", "when"],
    en: "For specific class schedules, please call us at 954-380-1340. We have classes throughout the week for all age groups.",
    es: "Para horarios específicos, por favor llámanos al 954-380-1340. Tenemos clases durante toda la semana para todos los grupos de edad."
  },
  {
    q: ["testimonials", "testimonios", "reviews", "resenas", "reseñas", "opiniones", "google"],
    en: "We have a 4.9/5 star rating with over 100 Google reviews. Parents love how their children's confidence and discipline have grown since joining Master Baez.",
    es: "Tenemos una calificación de 4.9/5 estrellas con más de 100 reseñas en Google. Los padres aman cómo la confianza y disciplina de sus hijos han crecido desde que se unieron a Master Baez."
  },
  {
    q: ["offer", "special", "promotion", "descuento", "especial", "oferta", "deal", "149"],
    en: "Special Offer: 2 FREE classes + 3 months for $149! Includes uniform and personalized evaluation. 100% money-back guarantee. Only 3 spots left this month!",
    es: "Oferta Especial: 2 clases GRATIS + 3 meses por $149. ¡Incluye uniforme y evaluación personalizada! Garantía de devolución del 100%. ¡Solo quedan 3 lugares este mes!"
  },
  {
    q: ["register", "inscribir", "inscripcion", "inscripción", "sign up", "enroll", "enrollment", "join", "unirse"],
    en: "You can start with 2 free classes by clicking 'Start Today' on our website, or call us at 954-380-1340 to reserve your spot!",
    es: "Puedes empezar con 2 clases gratis haciendo clic en 'Empieza Hoy' en nuestro sitio web, ¡o llámanos al 954-380-1340 para reservar tu lugar!"
  },
  {
    q: ["cooper", "city", "pembroke", "pines", "davie", "plantation", "weston", "florida", "fl"],
    en: "We proudly serve Cooper City, Pembroke Pines, Davie, Plantation, Hollywood, Sunrise, and Weston, Florida. Located at 9450 Griffin Rd, Cooper City, FL 33328.",
    es: "Orgullosamente servimos a Cooper City, Pembroke Pines, Davie, Plantation, Hollywood, Sunrise y Weston, Florida. Ubicados en 9450 Griffin Rd, Cooper City, FL 33328."
  },
  {
    q: ["owner", "founder", "fundador", "baez", "master", "instructor", "grandmaster", "daniel"],
    en: "Master Baez Martial Arts was founded in 1991 by Grand Master Daniel Baez. With over 30 years of experience, he has helped thousands of students build confidence, discipline, and leadership skills.",
    es: "Master Baez Martial Arts fue fundado en 1991 por el Gran Maestro Daniel Baez. Con más de 30 años de experiencia, ha ayudado a miles de estudiantes a desarrollar confianza, disciplina y liderazgo."
  },
  {
    q: ["bullying", "acoso", "bully", "bullies"],
    en: "We teach children how to recognize, avoid, and respond to bullying with confidence and respect. Our program focuses on awareness, communication skills, and age-appropriate self-defense techniques.",
    es: "Enseñamos a los niños a reconocer, evitar y responder al acoso con confianza y respeto. Nuestro programa se enfoca en conciencia, comunicación y técnicas de defensa personal apropiadas para su edad."
  }
];
