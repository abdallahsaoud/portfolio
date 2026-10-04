// Textes de l'accueil : identité, méthode, contact, titres de sections.

export const identite = {
  nom: 'Abdallah Saoud',
  prenom: 'Abdallah',
  titre: 'Développeur full-stack,',
  titreAccent: 'plus à l’aise côté serveur.',
  accroche:
    'Développeur full-stack chez iDalgo sur Scorecast, en alternance, et en dernière année du Mastère CTO & Tech Lead à HETIC. Professeur de judo en parallèle. Avant le code, j’ai fait du commerce : j’en ai gardé le goût des équipes qui s’entendent bien.',
  accrocheCourte:
    'En alternance chez iDalgo sur Scorecast, et en dernière année du Mastère CTO & Tech Lead à HETIC.',
  email: 'abdousa392@gmail.com',
  github: 'https://github.com/abdallahsaoud',
  linkedin: 'https://www.linkedin.com/in/abdallah-saoud-987aa6269/',
  cv: '/cv.pdf',
};

// `text` commence par sa ponctuation ou son espace : afficher <strong>{lead}</strong>{text}.
export const methode: { lead: string; text: string }[] = [
  {
    lead: 'Des PR structurées',
    text: ' : contexte, problème, solution, plan de test. Relues avant d’être mergées, et je relis celles des autres.',
  },
  {
    lead: 'Des assistants IA au quotidien',
    text: ', en gardant la conception, la relecture et la responsabilité de ce qui part en production. Je reste à l’affût des usages structurés de l’IA dans le métier de développeur.',
  },
  {
    lead: 'Le goût des systèmes qui tiennent la charge',
    text: ' et des équipes où l’on se parle. Les deux vont ensemble.',
  },
];

export const contact = {
  statut: 'disponible pour un CDI',
  texte:
    'Je suis disponible pour un CDI, dans une équipe produit avec du vrai back-end. Pour un échange, un e-mail suffit.',
};

export const sections = {
  projets: { titre: 'Projets', note: '2023 → 2026' },
  parcours: { titre: 'Parcours', note: 'judo → commerce → code' },
  methode: { titre: 'Comment je travaille' },
  contact: { titre: 'Contact' },
};
