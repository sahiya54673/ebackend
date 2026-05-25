const fs = require('fs');

// We will read seeder.js as a string and extract all https://images.unsplash.com URLs
const content = fs.readFileSync('seeder.js', 'utf8');
const urls = [...new Set(content.match(/https:\/\/images\.unsplash\.com\/[a-zA-Z0-9\-_?=&\.]+/g))];

console.log(`Found ${urls.length} unique Unsplash URLs in seeder.js. Checking statuses...`);

async function checkUrls() {
  const broken = [];
  for (const url of urls) {
    const cleanUrl = url.replace(/['",]/g, '');
    try {
      const response = await fetch(cleanUrl, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
      if (response.status !== 200) {
        console.log(`❌ BROKEN: ${cleanUrl} (Status: ${response.status})`);
        broken.push(cleanUrl);
      } else {
        console.log(`✅ OK: ${cleanUrl.substring(0, 50)}...`);
      }
    } catch (err) {
      console.log(`❌ BROKEN: ${cleanUrl} (Error: ${err.message})`);
      broken.push(cleanUrl);
    }
  }
  console.log('\n--- RESULTS ---');
  console.log(`Total checked: ${urls.length}`);
  console.log(`Total broken: ${broken.length}`);
  fs.writeFileSync('broken_images.json', JSON.stringify(broken, null, 2));
}

checkUrls();
