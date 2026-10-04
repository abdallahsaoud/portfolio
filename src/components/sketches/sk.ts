// Primitives de dessin « au feutre » : chaque fonction renvoie le `d` d'un <path>.

const r1 = (n: number) => Math.round(n * 10) / 10;

export type Stroke = { d: string; at?: number; t?: number; w?: number; fill?: string; color?: string };
export type Label = {
  x: number;
  y: number;
  s: string;
  at?: number;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  kind?: 'hand' | 'disp';
  fill?: string;
  rot?: number;
};
export type Packet = { path: string; dur?: number; begin?: number; fill?: string };
export type Scene = {
  ink?: Stroke[];
  blue?: Stroke[];
  red?: Stroke[];
  grn?: Stroke[];
  // Traits pointillés : ils apparaissent en fondu au lieu de se tracer.
  dash?: Stroke[];
  texts?: Label[];
  packets?: Packet[];
  // Moment où les messages commencent à circuler, et leur rayon.
  pkAt?: number;
  pkR?: number;
};

// Rectangle aux coins arrondis.
export const box = (x: number, y: number, w: number, h: number, r = 6) =>
  `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`;

// Cercle ou ellipse fermée.
export const ring = (cx: number, cy: number, rx: number, ry = rx) =>
  `M${cx} ${cy - ry}A${rx} ${ry} 0 1 1 ${cx} ${cy + ry}A${rx} ${ry} 0 1 1 ${cx} ${cy - ry}Z`;

const head = (x: number, y: number, a: number, len: number) => {
  const s = 0.55;
  return `M${r1(x - len * Math.cos(a - s))} ${r1(y - len * Math.sin(a - s))}L${x} ${y}L${r1(x - len * Math.cos(a + s))} ${r1(y - len * Math.sin(a + s))}`;
};

// Flèche droite.
export const arrow = (x1: number, y1: number, x2: number, y2: number, len = 9) =>
  `M${x1} ${y1}L${x2} ${y2}${head(x2, y2, Math.atan2(y2 - y1, x2 - x1), len)}`;

// Flèche courbe (un point de contrôle).
export const curve = (x1: number, y1: number, cx: number, cy: number, x2: number, y2: number, len = 9) =>
  `M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}${head(x2, y2, Math.atan2(y2 - cy, x2 - cx), len)}`;

// Pointe de flèche seule (pour terminer un trait pointillé).
export const tip = (x: number, y: number, angleDeg: number, len = 9) => head(x, y, (angleDeg * Math.PI) / 180, len);

// Cylindre : une base de données. (cx, y) = centre de l'ellipse du haut.
export const db = (cx: number, y: number, rx = 22, h = 20, ry = 7) => {
  const k = ry * 1.33;
  return `M${cx - rx} ${y}C${cx - rx} ${y - k} ${cx + rx} ${y - k} ${cx + rx} ${y}C${cx + rx} ${y + k} ${cx - rx} ${y + k} ${cx - rx} ${y}V${y + h}C${cx - rx} ${y + h + k} ${cx + rx} ${y + h + k} ${cx + rx} ${y + h}V${y}`;
};

// Boucle au feutre autour d'une zone : une ellipse qui se referme en dépassant un peu.
export const loop = (cx: number, cy: number, rx: number, ry: number) =>
  `M${r1(cx - rx)} ${r1(cy + ry * 0.1)}C${r1(cx - rx * 1.03)} ${r1(cy - ry * 1.28)} ${r1(cx + rx * 1.05)} ${r1(cy - ry * 1.32)} ${r1(cx + rx)} ${r1(cy)}C${r1(cx + rx * 0.97)} ${r1(cy + ry * 1.3)} ${r1(cx - rx * 0.92)} ${r1(cy + ry * 1.3)} ${r1(cx - rx)} ${r1(cy - ry * 0.05)}C${r1(cx - rx)} ${r1(cy - ry * 0.42)} ${r1(cx - rx * 0.9)} ${r1(cy - ry * 0.72)} ${r1(cx - rx * 0.7)} ${r1(cy - ry * 0.9)}`;

// Trait presque droit, très légèrement bombé pour garder une épaisseur au filtre.
export const stroke = (x1: number, y1: number, x2: number, y2: number) =>
  `M${x1} ${y1}Q${r1((x1 + x2) / 2 + (y2 - y1) * 0.012)} ${r1((y1 + y2) / 2 - (x2 - x1) * 0.012)} ${x2} ${y2}`;
