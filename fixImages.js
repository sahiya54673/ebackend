const fs = require('fs');
const path = require('path');

const replacements = {
  // Fashion
  "photo-1515886657613-9f3515b0c78f": "photo-1595777457583-95e059d581b8", // Silk evening dress
  
  // Kitchen
  "photo-1648704978826-5a29ea5f7b50": "photo-1584269600464-37b1b58a9fe7", // Smart Air Fryer XL
  "photo-1594833134782-20bc2ec81c9c": "photo-1599940824399-b87987ceb72a", // Non-stick frying pan
  "photo-1590333746438-283583bb3417": "photo-1576092768241-dec231879fc3", // Digital kitchen scale
  "photo-1594041680534-e8c8cdebd679": "photo-1576092768241-dec231879fc3", // Glass electric kettle
  "photo-1584990333910-fe907c0fe12b": "photo-1584269600464-37b1b58a9fe7", // Copper Core Pot
  
  // Beauty
  "photo-1570194065650-d99fb4bedf0a": "photo-1608248597279-f99d160bfcbc", // Glow Serum 30ml
  "photo-1586495777744-4e6232bf2e69": "photo-1596462502278-27bfdc403348", // Velvet Matte Lipstick
  "photo-1590156221122-c7b3d4ed2fd2": "photo-1522337360788-8b13dee7a37e", // Radiant Foundation
  "photo-1556228578-00c91f42289c": "photo-1556228578-8c89e6adf883", // Daily Sun Protect
  "photo-1522338223523-0de2c3d5ed21": "photo-1522337360788-8b13dee7a37e", // Elite Makeup Brushes
  "photo-1583073030863-2442d34b318d": "photo-1515377905703-c4788e51af15", // Silk sleep mask
  "photo-1556228578-1f1906233e72": "photo-1556228578-8c89e6adf883", // Charcoal face scrub
  
  // Health & Sports
  "photo-1591946614421-1d977ff02021": "photo-1535930891776-0c2dfb7fda1a", // Orthopedic dog bed & spiky massage ball
  "photo-1591453412154-15f79a95079a": "photo-1574680096145-d05b474e2155", // Body Analyst Scale
  "photo-1471864190281-a93a3072167a": "photo-1584017911766-d451b3d0e843", // Multivitamin Elite
  "photo-1512428813833-df57dec3343a": "photo-1584017911766-d451b3d0e843", // Therapeutic Heat Pad
  "photo-1622279457486-62dcc4a4bd13": "photo-1595257841889-ecea66b266e7", // Elite Tennis Racket
  "photo-1533224859065-ce907c0fe12b": "photo-1551698618-1ffd5f979148", // Trek Carbon Poles
  "photo-1544191696-4021eaadca7d": "photo-1517649763962-0c623066013b", // Pro Cycle Helmet
  
  // Grocery
  "photo-1585478259715-876a23d1ec5d": "photo-1509440159596-0249088772ff", // Artisan Sourdough
  "photo-1544787210-2211d7c3199a": "photo-1597481499750-3e6b22637e12", // Organic Green Tea
  "photo-1589733429478-24597d58ba19": "photo-1587049352846-4a222e784d38", // Pure Maple Syrup
  "photo-1508029052414-22295b94691c": "photo-1597481499750-3e6b22637e12", // Roasted almonds
  "photo-1613478223719-2ab80260f45c": "photo-1621506289937-a8e4df240d0b", // Cold pressed juice
  "photo-1588612196333-f72f8541249b": "photo-1597481499750-3e6b22637e12", // Organic chia seeds
  "photo-1596515320579-d60233044199": "photo-1601004890684-d8cbf643f5f2", // Wild berries mix
  
  // Decor
  "photo-1507473885765-e6ed657f9971": "photo-1513506003901-1e6a229e2d15", // Floor lamp
  "photo-1513519247388-19346422745b": "photo-1579783902614-a3fb3927b6a5", // Abstract Canvas Art
  "photo-1532372576044-6733839a9d97": "photo-1594269600464-37b1b58a9fe7", // Shelf
  "photo-1505691938895-1758d7eaa511": "photo-1505693416388-ac5ce068fe85", // Cotton Pouf
  "photo-1544450579-73b0cdf12db0": "photo-1512820790803-83ca734da794", // Agate bookends
  
  // Pets
  "photo-1589924691106-073b697596cd": "photo-1548767797-d8c844163c4c", // Grain-Free Dog food
  "photo-1563460716037-460ad3b5a68e": "photo-1535930891776-0c2dfb7fda1a", // Automatic pet feeder
  "photo-1544175334-0370d0571343": "photo-1535930891776-0c2dfb7fda1a", // Washable Pet Mat
};

// 1. Fix backend/seeder.js
const seederPath = 'seeder.js';
let seederContent = fs.readFileSync(seederPath, 'utf8');
let seederReplacedCount = 0;

for (const [broken, working] of Object.entries(replacements)) {
  if (seederContent.includes(broken)) {
    seederContent = seederContent.split(broken).join(working);
    seederReplacedCount++;
  }
}

fs.writeFileSync(seederPath, seederContent, 'utf8');
console.log(`Backend seeder.js updated! Replaced ${seederReplacedCount} broken image IDs.`);

// 2. Fix frontend/src/pages/CategoryPage.jsx
const categoryPagePath = path.join(__dirname, '..', 'frontend', 'src', 'pages', 'CategoryPage.jsx');
if (fs.existsSync(categoryPagePath)) {
  let catContent = fs.readFileSync(categoryPagePath, 'utf8');
  let catReplacedCount = 0;

  for (const [broken, working] of Object.entries(replacements)) {
    if (catContent.includes(broken)) {
      catContent = catContent.split(broken).join(working);
      catReplacedCount++;
    }
  }

  fs.writeFileSync(categoryPagePath, catContent, 'utf8');
  console.log(`Frontend CategoryPage.jsx updated! Replaced ${catReplacedCount} broken image IDs.`);
} else {
  console.log(`Frontend CategoryPage.jsx not found at ${categoryPagePath}`);
}
