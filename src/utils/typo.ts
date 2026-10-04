// Espaces insécables de la typographie française (avant : ; ? ! » et après «), posés à l'affichage sans toucher aux données.
export const typo = (s: string) => s.replace(/ ([:;?!»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');
