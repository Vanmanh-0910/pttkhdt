const fs = require('fs');
const path = require('path');

const protoDir = path.join(__dirname, 'prototype');
const files = fs.readdirSync(protoDir).filter(f => f.endsWith('.html'));

console.log(`Processing ${files.length} HTML files...`);

for (const file of files) {
  const filePath = path.join(protoDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace proto-flag + site-header with <div id="site-header"></div>
  // Patterns can vary slightly, so use regex matching <div class="proto-flag">.*?<\/header>
  const headerRegex = /<div class="proto-flag">[\s\S]*?<\/header>/;
  if (headerRegex.test(html)) {
    html = html.replace(headerRegex, '<div id="site-header"></div>');
  }

  // Replace site-footer with <div id="site-footer"></div>
  const footerRegex = /<footer class="site-footer">[\s\S]*?<\/footer>/;
  if (footerRegex.test(html)) {
    html = html.replace(footerRegex, '<div id="site-footer"></div>');
  }

  // Ensure layout.js is included before ui.js
  if (!html.includes('assets/js/layout.js')) {
    html = html.replace(
      '<script src="assets/js/ui.js"></script>',
      '<script src="assets/js/layout.js"></script>\n  <script src="assets/js/ui.js"></script>'
    );
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${file}`);
}

console.log('DONE applying shared header/footer components.');
