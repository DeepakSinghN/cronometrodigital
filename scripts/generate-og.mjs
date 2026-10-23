import sharp from 'sharp';
import fs from 'node:fs';

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0c"/>
      <stop offset="100%" stop-color="#141418"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>

  <!-- Subtle grid pattern -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="0" y1="126" x2="1200" y2="126"/>
    <line x1="0" y1="252" x2="1200" y2="252"/>
    <line x1="0" y1="378" x2="1200" y2="378"/>
    <line x1="0" y1="504" x2="1200" y2="504"/>
    <line x1="240" y1="0" x2="240" y2="630"/>
    <line x1="480" y1="0" x2="480" y2="630"/>
    <line x1="720" y1="0" x2="720" y2="630"/>
    <line x1="960" y1="0" x2="960" y2="630"/>
  </g>

  <!-- Decorative Outer Border -->
  <rect x="25" y="25" width="1150" height="580" rx="20" fill="none" stroke="#262626" stroke-width="1.5"/>

  <!-- Top Pill Badge -->
  <g transform="translate(600, 95)">
    <rect x="-160" y="-18" width="320" height="36" rx="18" fill="#18181b" stroke="#FF9500" stroke-opacity="0.4" stroke-width="1"/>
    <text x="0" y="5" text-anchor="middle" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#FF9500" letter-spacing="2">
      CRONÔMETRO DIGITAL ONLINE
    </text>
  </g>

  <!-- Title / Logo Text -->
  <text x="600" y="185" text-anchor="middle" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">
    Cronômetro Digital com Voltas e Milissegundos
  </text>

  <!-- Central Digital LED Display Box -->
  <rect x="260" y="225" width="680" height="175" rx="16" fill="#000000" stroke="#27272a" stroke-width="2"/>
  
  <!-- Digital Clock Time -->
  <text x="545" y="342" text-anchor="middle" font-family="Courier New, monospace" font-size="94" font-weight="bold" fill="#FF9500" filter="url(#glow)" letter-spacing="3">
    00:00
  </text>
  <text x="735" y="342" text-anchor="start" font-family="Courier New, monospace" font-size="54" font-weight="bold" fill="#FF9500" filter="url(#glow)">
    .00
  </text>

  <!-- Buttons Preview -->
  <g transform="translate(425, 435)">
    <!-- Reset -->
    <rect x="0" y="0" width="100" height="40" rx="6" fill="#B8860B"/>
    <text x="50" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Resetar</text>
    <!-- Volta -->
    <rect x="120" y="0" width="100" height="40" rx="6" fill="#2563EB"/>
    <text x="170" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Volta</text>
    <!-- Iniciar -->
    <rect x="240" y="0" width="110" height="40" rx="6" fill="#4EAF81"/>
    <text x="295" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Iniciar</text>
  </g>

  <!-- Features Subtitle -->
  <text x="600" y="525" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="500" fill="#A1A1AA">
    Alta Precisão • Modo Tela Cheia • Estudo &amp; Pomodoro • Atalhos de Teclado • 100% Grátis
  </text>

  <!-- Domain Branding -->
  <text x="600" y="565" text-anchor="middle" font-family="Courier New, monospace" font-size="16" font-weight="700" fill="#FF9500" letter-spacing="1">
    cronometrodigital.com
  </text>
</svg>`;

async function run() {
  await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile('public/og-image.png');
  console.log('Successfully generated public/og-image.png');
}

run();
