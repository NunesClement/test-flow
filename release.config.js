const branch = process.env.GITHUB_REF_NAME // URG: check without git env

console.log({ branch })
const pluginsRelease = [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        "@semantic-release/npm",
        [
          "@semantic-release/git",
          {
            "assets": [
              "CHANGELOG.md",
              "package.json",
              "package-lock.json",
              "packages/**/package.json",
            ],
            "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
          }
        ],
        "@semantic-release/github",
 ]


const config = {
  branches: ['release', {name: 'nightly', prerelease: true}],
 }
 
//  if (branch === 'release') {
//   config.plugins = pluginsRelease;
// }

module.exports = config;
