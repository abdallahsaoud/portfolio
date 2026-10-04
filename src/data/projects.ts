export type ProjectLink = { label: string; href: string; external?: boolean };

export type Project = {
  slug: string;
  index: string;
  title: string;
  status: string;
  meta: string;
  summary: string;
  points: { lead: string; text: string }[];
  note?: string;
  tags: string[];
  links: ProjectLink[];
  // Mention affichée à la place des liens quand il n'y en a pas.
  sansLien?: string;
};

export const projects: Project[] = [
  {
    slug: 'scorecast',
    index: '01',
    title: 'Scorecast',
    status: '● en production',
    meta: 'iDalgo · alternance · nov. 2024 → aujourd’hui',
    summary:
      'Application de pronostics sportifs entre amis. Backend en quinze microservices NestJS, back-office Nuxt, infrastructure Kubernetes. J’interviens sur toute la chaîne, avec une préférence nette pour le serveur.',
    points: [
      {
        lead: 'Migration sans coupure',
        text: 'du monolithe historique vers les microservices, plusieurs dizaines de milliers d’utilisateurs migrés.',
      },
      {
        lead: 'Un microservice d’analytics',
        text: 'conçu et livré de zéro, du modèle de données à l’infrastructure Kubernetes.',
      },
      {
        lead: 'Des tâches de fond fiabilisées en production',
        text: ': correctifs livrés en hotfix, jobs rendus idempotents, tests de charge avant le lancement.',
      },
      {
        lead: 'Un back-office en Nuxt et Vue',
        text: 'pour l’équipe : une soixantaine de pages et composants, des graphiques en SVG maison, une couche d’API typée.',
      },
    ],
    tags: ['NestJS', 'PostgreSQL', 'NATS', 'BullMQ', 'Kubernetes', 'Nuxt', 'Vue'],
    links: [{ label: 'Lire l’étude de cas', href: '/projets/scorecast' }],
  },
  {
    slug: 'hadjime-dem',
    index: '02',
    title: 'Hadjime Dem',
    status: '● outils internes',
    meta: 'entreprise de déménagement · première alternance · 2023 → 2024',
    summary: 'Des outils métier pour l’équipe commerciale, développés pendant ma première alternance.',
    points: [
      {
        lead: 'Générateur automatique de devis',
        text: 'à partir des paramètres d’un déménagement.',
      },
      {
        lead: 'Relances automatiques par e-mail',
        text: 'des devis restés sans réponse, et campagnes de mailing vers prospects et clients.',
      },
      {
        lead: 'Module de facturation',
        text: 'pour clore le cycle du devis à la facture.',
      },
    ],
    tags: ['NestJS', 'Angular'],
    links: [],
    sansLien: 'outil interne, pas de lien public',
  },
  {
    slug: 'heritage',
    index: '03',
    title: 'Héritage',
    status: '● en ligne',
    meta: 'projet personnel · 2025 → 2026',
    summary:
      'Site de réservation et boutique en ligne d’une marque de robes orientales, conçu, développé et mis en ligne seul.',
    points: [
      {
        lead: 'Front React + TypeScript',
        text: ': catalogue filtrable, fiches produit, réservation d’essayage en plusieurs étapes.',
      },
      {
        lead: 'Back NestJS + PostgreSQL',
        text: 'avec authentification et panneau d’administration : robes, rendez-vous, tableau de bord.',
      },
      {
        lead: 'Paiement Stripe et livraison Sendcloud',
        text: 'par webhooks, e-mails de commande, tunnel d’achat testé de bout en bout.',
      },
    ],
    note:
      'Et une leçon : la première version était sur-architecturée pour un site vitrine. Je l’ai simplifiée, et documenté pourquoi.',
    tags: ['React', 'TypeScript', 'Tailwind', 'NestJS', 'PostgreSQL', 'Stripe', 'Sendcloud'],
    links: [{ label: 'Voir le site', href: 'https://heritage-alg.com/', external: true }],
  },
  {
    slug: 'storm',
    index: '04',
    title: 'STORM',
    status: '● démo',
    meta: 'HETIC · en équipe · février → avril 2026',
    summary:
      'Messagerie temps réel façon Slack ou Discord, avec salons publics ou privés, conçue en équipe pour tenir la charge. Objectif fixé : 100 000 connexions WebSocket simultanées pour moins de 700 € d’infrastructure.',
    points: [
      {
        lead: 'Une passerelle WebSocket en Rust',
        text: 'derrière un répartiteur de charge : elle authentifie, vérifie l’appartenance au salon et ne diffuse un message qu’à ses membres.',
      },
      {
        lead: 'Des services découplés par un bus',
        text: ': les messages passent par un flux Valkey avant d’être écrits par lots dans PostgreSQL ; la présence en ligne repose sur des clés à expiration.',
      },
      {
        lead: 'Une charge mesurée, pas supposée',
        text: ': objectifs de service chiffrés, tests de charge k6 et Locust, scripts de chaos, tableaux de bord Prometheus et Grafana sur Kubernetes.',
      },
    ],
    note:
      'Ce que j’en retiens : le premier test de charge a révélé une écriture en base message par message. En passant aux insertions par lots, la latence est tombée de 2 secondes à moins de 30 millisecondes.',
    tags: ['Rust', 'Axum', 'WebSocket', 'Valkey', 'PostgreSQL', 'Kubernetes', 'k6'],
    links: [],
  },
  {
    slug: 'aled',
    index: '05',
    title: 'Aled',
    status: '● démo',
    meta: 'HETIC · équipe de 4 · juillet 2026',
    summary:
      'Outil de création de shows lumineux pour un mur de dizaines de milliers de LED et des projecteurs motorisés, pilotés en Art-Net/DMX et synchronisés à la musique.',
    points: [
      {
        lead: 'Détection du tempo',
        text: 'par analyse spectrale insensible au volume, alignement sur un BPM entier, métronome Web Audio à planification anticipée.',
      },
      {
        lead: 'Un modèle calques → clips → images-clés',
        text: 'calé sur les mesures, rendu dans un framebuffer échantillonné vers les pixels physiques.',
      },
      {
        lead: 'Une leçon de performance',
        text: ': des milliers de clips figeaient l’interface ; pré-rastérisation en bitmap, de 2 900 clips à 52 pour un rendu identique.',
      },
    ],
    note:
      'Réalisé en grande partie avec des assistants IA, compris et défendu en soutenance : c’est là que j’ai appris DMX, Art-Net et l’analyse audio.',
    tags: ['Electron', 'React', 'TypeScript', 'Web Audio', 'vitest'],
    links: [{ label: 'Code sur GitHub', href: 'https://github.com/Samy951/Aled', external: true }],
  },
];
