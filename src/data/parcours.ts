// `contrat` : la nature du contrat et, s'il y a lieu, l'employeur. `actuel` : l'étape en cours aujourd'hui.
export type Step = { when: string; title: string; text: string; contrat?: string; actuel?: boolean };

export const parcours: Step[] = [
  {
    when: 'depuis 2022',
    title: 'Professeur de judo',
    contrat: 'en CDI',
    text: 'Enseigner à tous les publics, du débutant au compétiteur. On y apprend la patience et la pédagogie.',
  },
  {
    when: '2023',
    title: 'Commercial',
    contrat: 'en CDD chez Hadjime Dem',
    text: 'Prospection, relances et relation client dans une entreprise de déménagement.',
  },
  {
    when: '2023 – 2024',
    title: 'Bac+2 développeur web',
    contrat: 'en alternance chez Hadjime Dem',
    text: 'Premiers outils livrés à de vrais utilisateurs : devis automatiques, relances, facturation.',
  },
  {
    when: '2024 – 2025',
    title: 'Bachelor développeur web, HETIC',
    contrat: 'en alternance chez iDalgo',
    text: 'Début de l’alternance chez iDalgo, comme développeur full-stack sur Scorecast.',
  },
  {
    when: 'depuis 2025',
    title: 'Mastère CTO & Tech Lead, HETIC',
    contrat: 'en alternance chez iDalgo',
    actuel: true,
    text: 'Le diplôme que je prépare, en dernière année, toujours en alternance chez iDalgo : microservices NestJS, PostgreSQL, NATS, Kubernetes, back-office Nuxt, sur une application en production. Disponible pour un CDI.',
  },
];
