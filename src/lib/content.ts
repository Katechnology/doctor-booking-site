export const clinicContent = {
  doctor: {
    name: "Dr. Elena Maris",
    specialty: "Private Internal Medicine & Preventive Care",
    tagline:
      "A calm, comprehensive health check designed to help you move from uncertainty to a clear plan.",
    bio: "Dr. Elena Maris combines preventive medicine, practical lifestyle guidance, and unhurried consultations to give patients a clear understanding of their health. Her clinic is designed for adults who want thoughtful care, plain-language advice, and a booking process that feels simple from the first step.",
    portraitAlt: "Portrait illustration of Dr. Elena Maris"
  },
  trustBar: [
    "18+ years of clinical experience",
    "Patient-first consultations",
    "Booking requests answered within one business day"
  ],
  proofPoints: [
    {
      title: "Preventive focus",
      description: "Health checks centered on early insight, risk review, and practical next steps."
    },
    {
      title: "Clear communication",
      description: "Short, understandable explanations without rushed language or confusing medical jargon."
    },
    {
      title: "Comfortable experience",
      description: "A quiet, private clinic atmosphere with extra time for questions and planning."
    },
    {
      title: "Continuity of care",
      description: "Follow-up guidance and referrals when a deeper review or testing is appropriate."
    }
  ],
  services: [
    {
      title: "Comprehensive Health Check",
      summary:
        "A premium annual review covering symptoms, history, risk factors, medications, and screening priorities.",
      duration: "60 minutes",
      audience: "Ideal for adults who want a full preventive review or have new concerns to discuss.",
      featured: true
    },
    {
      title: "Preventive Consultation",
      summary:
        "Focused support on blood pressure, cholesterol, fatigue, family history, and healthy aging planning.",
      duration: "45 minutes",
      audience: "Best for patients seeking a targeted review and practical next steps.",
      featured: false
    },
    {
      title: "Follow-Up Consultation",
      summary:
        "A shorter review after recent tests, a prior visit, or an ongoing treatment plan.",
      duration: "30 minutes",
      audience: "Suitable when you already have a known issue and need continuity.",
      featured: false
    },
    {
      title: "Lifestyle & Screening Review",
      summary:
        "An easy-to-understand discussion around sleep, activity, nutrition, and recommended screenings.",
      duration: "40 minutes",
      audience: "Helpful if you want a prevention plan tailored to this stage of life.",
      featured: false
    }
  ],
  credentials: [
    "Board-certified internal medicine specialist",
    "Member of national preventive care society",
    "Modern infection-control and clinic hygiene standards",
    "Private, confidential handling of patient requests"
  ],
  careSteps: [
    "Send your booking request online",
    "Receive a confirmation call or email from the clinic",
    "Attend your visit with a clear agenda and enough time for questions"
  ],
  testimonials: [
    {
      quote:
        "The process felt respectful and very clear. I knew what to expect before I arrived.",
      name: "Demo Patient, 52"
    },
    {
      quote:
        "I wanted a proper health review without feeling rushed. This felt calm and reassuring.",
      name: "Demo Patient, 61"
    }
  ],
  contact: {
    address: "14 Harborside Avenue, Suite 3, Central District",
    email: "hello@marisclinic.example",
    phone: "+1 (555) 240-1188",
    hours: "Mon-Fri, 8:30 AM-5:30 PM"
  }
} as const;
