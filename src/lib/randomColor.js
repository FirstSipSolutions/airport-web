const COLORS = ["#ff6b6b", "#4ade80", "#fbbf24", "#38bdf8", "#c084fc", "#f472b6", "#2dd4bf"];

export function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}
