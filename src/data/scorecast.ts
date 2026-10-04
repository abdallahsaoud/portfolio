// Contenu de l'étude de cas Scorecast.

export type Decision = {
  n: string;
  title: string;
  tag: string;
  problem: string;
  choice: string;
  result: string;
  // Schéma associé, quand il y en a un.
  diagram?: 'migration' | 'analytics' | 'dedup';
  caption?: string;
};

export const scorecast = {
  kicker: 'Étude de cas · iDalgo · alternance · nov. 2024 → aujourd’hui',
  titre: 'Scorecast',
  lead: 'Une application de pronostics sportifs entre amis : compétitions privées ou publiques, matchs à pronostiquer, points, ligues hebdomadaires, chat. La nouvelle version est en production depuis mars 2026, avec plusieurs milliers d’utilisateurs actifs par jour et plusieurs centaines de milliers lors des grands événements.',
  meta: [
    { label: 'Rôle', value: 'Développeur full-stack, en alternance' },
    { label: 'Périmètre', value: 'API en microservices, infrastructure, back-office, produit B2B' },
    { label: 'Équipe', value: 'Un lead technique, des développeurs back et front, un ingénieur infra' },
  ],
  stack: [
    'Node 24',
    'TypeScript',
    'NestJS',
    'PostgreSQL',
    'TypeORM',
    'NATS',
    'BullMQ',
    'Redis',
    'Kubernetes',
    'Nuxt',
    'k6',
    'GitHub Actions',
  ],
  figures: [
    { v: '15', l: 'microservices, une base PostgreSQL chacun' },
    { v: '≈ 420', l: 'pull requests relues et mergées' },
    { v: '≈ 30 %', l: 'du code du backend actuel (git blame)' },
    { v: 'mars 2026', l: 'nouvelle version en production' },
  ],
  architecture: {
    titre: 'Comment c’est construit',
    texte:
      'Une passerelle HTTP unique reçoit les appels des applications et les traduit en messages sur un bus NATS. Derrière, quinze microservices NestJS, chacun avec sa propre base PostgreSQL, se parlent en requête-réponse et par événements. Les traitements longs et les tâches planifiées passent par des files BullMQ sur Redis. Le tout tourne sur Kubernetes, déployé en GitOps.',
  },
  decisionsTitre: 'Six décisions que je peux défendre',
  decisionsNote: 'problème · choix · résultat',
  decisions: [
    {
      n: '01',
      title: 'Migrer un monolithe sans fenêtre de coupure',
      tag: 'données · architecture',
      problem:
        'L’ancienne API, un monolithe sur MySQL, servait encore tous les utilisateurs. Il fallait déplacer comptes, compétitions et historiques vers quatorze bases PostgreSQL, sans couper le service ni perdre une partie.',
      choice:
        'Le monolithe expose des points d’export protégés par jeton ; la nouvelle plateforme les interroge et déclenche une tâche de migration par compétition. Chaque tâche vérifie d’abord si le travail est déjà fait, donc on peut la relancer sans risque. Des scripts de reprise avec fichier de progression et mode simulation complètent le dispositif.',
      result:
        'Plusieurs dizaines de milliers d’utilisateurs migrés pendant que les deux versions tournaient en parallèle. Le module a été retiré une fois la migration terminée.',
      diagram: 'migration',
      caption: 'Migration V2 → V3, vue simplifiée',
    },
    {
      n: '02',
      title: 'Tester la charge avant de lancer',
      tag: 'fiabilité · performance',
      problem:
        'La nouvelle version devait sortir en mars 2026 devant une audience qui grimpe à plusieurs centaines de milliers d’utilisateurs les soirs de grands matchs. Personne ne voulait découvrir les limites en production.',
      choice:
        'Une suite de tests de charge k6 : jetons d’authentification forgés en lot, scénario qui rejoue le démarrage de l’application mobile, profils de charge progressifs et seuils de temps de réponse.',
      result: 'Plusieurs défauts de performance détectés et corrigés avant la mise en production.',
    },
    {
      n: '03',
      title: 'Un service d’analytics dont les métriques ne s’additionnent pas',
      tag: 'conception · données',
      problem:
        'L’équipe produit voulait des métriques d’audience : actifs par jour, par semaine, par mois, rétention. Or ces métriques ne se somment pas entre tranches de temps, un même joueur apparaissant dans plusieurs.',
      choice:
        'Un microservice dédié, créé de zéro. Le temps est découpé en tranches de cinq minutes ; les compteurs de flux sont incrémentés à l’ingestion, les métriques d’état recalculées par une tâche planifiée qui rattrape toutes les tranches manquantes dans l’ordre. L’infrastructure Kubernetes du service a été livrée en une seule PR.',
      result:
        'Une reprise exacte après panne, une granularité de lecture imposée par la longueur de la période demandée, et des tableaux de bord consultés au quotidien par l’équipe produit.',
      diagram: 'analytics',
      caption: 'Microservice analytics, flux simplifié',
    },
    {
      n: '04',
      title: 'Des recalculs de classement perdus en silence',
      tag: 'fiabilité · production',
      problem:
        'Lors d’un pic, plusieurs milliers de compétitions liées à un même match, des corrections de score n’atteignaient plus les classements. Aucune erreur : les tâches de recalcul étaient simplement ignorées, parce que leur identifiant statique entrait en collision avec des tâches terminées encore conservées.',
      choice:
        'Passer au mécanisme de dédoublonnage natif de la file de tâches, en gardant la dernière tâche lorsqu’une est déjà active, et supprimer les gardes manuelles devenues inutiles.',
      result: 'Correctif livré en hotfix en production, puis généralisé à sept planificateurs.',
      diagram: 'dedup',
      caption: 'Collision d’identifiants, avant et après',
    },
    {
      n: '05',
      title: 'Refondre les ligues sans casser les apps publiées',
      tag: 'SQL · compatibilité',
      problem:
        'Nouveau modèle de ligues hebdomadaires à six niveaux, avec des montées et des descentes interdépendantes. Les applications mobiles déjà publiées continuaient d’appeler l’ancien système.',
      choice:
        'L’évaluation hebdomadaire tient en une seule requête SQL fenêtrée, pilotée par une table de réglages. L’ancien et le nouveau système tournent côte à côte derrière une nouvelle version de l’API ; le nouveau reste dormant tant que le joueur ne s’y est pas inscrit.',
      result:
        'Une bascule sans blocage des mises en production, couverte par des tests de non-régression sur le calendrier des semaines.',
    },
    {
      n: '06',
      title: 'L’infrastructure de production en GitOps',
      tag: 'infra · Kubernetes',
      problem:
        'Migration de la production vers un nouveau cluster Kubernetes managé : quatorze microservices à décrire, chacun avec sa base de données, ses sauvegardes et son autoscaling.',
      choice:
        'Écriture de l’essentiel des manifests : déploiement, autoscaling, une base PostgreSQL par service via un opérateur dédié, sauvegardes planifiées, secrets chiffrés. Sans détenir les clés de déchiffrement : la PR ne pose que les références au secret, et le cluster attend sans casser.',
      result:
        'Une première version factorisée a été refusée en revue pour illisibilité ; la version retenue garde un fichier simple par service. Leçon : en infrastructure, la duplication lisible vaut mieux qu’une abstraction difficile à relire.',
    },
  ] as Decision[],
  backoffice: {
    titre: 'Le back-office, en Nuxt et Vue',
    texte:
      'L’outil interne avec lequel l’équipe gère les compétitions, les matchs à pronostiquer, les fournisseurs de données, les utilisateurs, la modération et les statistiques. D’abord en Nuxt et JavaScript, puis depuis mars 2026 sur un nouveau front Nuxt 4 en TypeScript, avec un proxy côté serveur qui garde les identifiants hors du navigateur. J’y ai signé environ 95 pull requests et créé une soixantaine de pages et composants Vue.',
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Pinia', 'i18n', 'SCSS', 'ESLint', 'vue-tsc'],
    // `text` se lit à la suite de `lead`.
    points: [
      {
        lead: 'Des graphiques en SVG maison',
        text: 'plutôt qu’une librairie : des barres pour les flux, des lignes pour les états, interrompues là où rien n’a été calculé. Aucune dépendance ajoutée.',
      },
      {
        lead: 'Des modales pilotées par Promise',
        text: ': un composable renvoie la saisie ou rien. Le même schéma, typé, sert sur quatre écrans.',
      },
      {
        lead: 'Un écran dédié aux compétitions archivées',
        text: 'plutôt qu’un mode lecture seule : ses types sont dérivés de ceux de l’API, donc un renommage casse le build au lieu de mentir en silence.',
      },
      {
        lead: 'Des traitements longs sans polling',
        text: ': l’API renvoie un identifiant de tâche, le front s’abonne à un événement socket et retrouve l’état « en cours » après un rechargement.',
      },
    ],
  },
  aussiTitre: 'Aussi, en une ligne',
  aussi: [
    {
      lead: 'Produit B2B.',
      text: 'Suppression programmée des espaces clients avec procès-verbal de destruction RGPD, traversant quatre services et rejouable après échec.',
    },
  ],
  retiensTitre: 'Ce que j’en retiens',
  retiens: [
    'En production, tout ce qui peut être rejoué doit pouvoir l’être sans dégât. L’idempotence n’est pas une option.',
    'Les files de tâches ont leurs propres pièges : lire ce que l’outil sait faire avant d’inventer des gardes manuelles.',
    'Tester la charge avant le lancement coûte moins cher qu’un soir de match raté.',
    'En infrastructure comme en code, la lisibilité pour le relecteur passe avant l’élégance.',
  ],
  autrementTitre: 'Ce que je ferais autrement',
  autrement: [
    'Écrire les tests de non-régression en même temps que les correctifs, pas après.',
    'Garder systématiquement des mesures avant et après : certains gains sont réels, mais je ne peux pas tous les chiffrer aujourd’hui.',
  ],
};
