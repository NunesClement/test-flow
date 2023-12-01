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

  console.log({"cont": currentVersionJSON})

  // matches `"@factory/*: ".*"` and replaces it with `"@factory/*: "${version}""`
  const newContent = content.replace(
    /\"@factory\/((\w|-)+)\": "([^"]|\\")*"/g,
    `"@factory/$1": "${currentVersionJSON}"`,
  );

  
  fs.writeFileSync(packageJSON, newContent);
  console.log(`  📍 Pinned ${name} @factory/* dependencies`);
}