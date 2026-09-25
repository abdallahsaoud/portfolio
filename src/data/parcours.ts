export type Step = { when: string; title: string; text: string };

export const parcours: Step[] = [
  {
    when: 'depuis 2022',
    title: 'Professeur de judo',
    text: 'Enseigner à tous les publics, du débutant au compétiteur. On y apprend la patience et la pédagogie.',
  },
  {
    when: '2023',
    title: 'Commercial',
    text: 'Prospection, relances et relation client dans une entreprise de déménagement.',
  },
  {
    when: '2023 – 2024',
    title: 'Bac+2 développeur web, en alternance',
    text: 'Premiers outils livrés à de vrais utilisateurs : devis automatiques, relances, facturation.',
  },
  {
    when: '2024 – 2025',
    title: 'Bachelor développeur web, HETIC',
    text: 'Et le début de l’alternance chez iDalgo, sur Scorecast.',
  },
  {
    when: '2024 → aujourd’hui',
    title: 'Développeur full-stack chez iDalgo',
    text: 'Microservices NestJS, PostgreSQL, NATS, Kubernetes, back-office Nuxt, sur une application en production.',
  },
  {
    when: 'depuis 2025',
    title: 'Mastère CTO & Tech Lead, HETIC',
    text: 'Dernière année en cours. Disponible pour un CDI.',
  },
];
