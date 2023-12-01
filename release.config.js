const config = {
    branches: ['release'],
    plugins: [
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
        
        "@semantic-release/github"
      ]
};

module.exports = config;
