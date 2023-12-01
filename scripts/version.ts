import fs from 'fs';
import path from 'path';

const packages = fs
  .readdirSync(path.join(__dirname, '..', 'packages'), { withFileTypes: true })
  .filter((file) => file.isDirectory())
  .map((dir) => dir.name)
  .filter((dir) => !dir.startsWith('.'));

  const currentVersion = path.join(
    __dirname,
    '../package.json',
  );

  const currentContent = fs.readFileSync(currentVersion).toString();
  const currentVersionJSON = JSON.parse(currentContent).version;

for (const name of packages) {
  const packageJSON = path.join(
    __dirname,
    '..',
    'packages',
    name,
    'package.json',
  );

  if (!fs.existsSync(packageJSON)) {
    continue;
  }

  const content = fs.readFileSync(packageJSON).toString();

  const updatedContent = content.replace(/"version": "\d+\.\d+\.\d+"/, `"version": "${currentVersionJSON}"`);
  
  console.log({packageJSON, updatedContent})
  fs.writeFileSync(packageJSON, updatedContent);
  console.log(`  📍 Pinned ${name} * dependencies`);
}