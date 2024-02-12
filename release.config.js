const branch = process.env.GITHUB_REF_NAME

const pluginsPreRelease = [
  "@semantic-release/commit-analyzer",
  "@semantic-release/release-notes-generator",
  "@semantic-release/npm",
  "@semantic-release/github",
];

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


 if (config.branches.some((it) => it === branch || (it.name === branch && !it.prerelease))) {
  config.plugins = pluginsRelease;
} else {
  config.plugins = pluginsPreRelease;
}


module.exports = config;
