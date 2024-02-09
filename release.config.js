// eslint-disable-next-line turbo/no-undeclared-env-vars
const branch = process.env.GITHUB_BASE_REF


const config = {
    branches: ['release', {name: 'nightly', prerelease: true}],
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

if (config.branches.some((it) => it === branch || (it.name === branch && !it.prerelease))) {
  config.plugins.push('@semantic-release/changelog', [
    '@semantic-release/git',
    {
      assets: [
        'CHANGELOG.md',
        'package.json',
        'package-lock.json',
        'packages/**/package.json',
        'apps/**/package.json',
      ],
      // eslint-disable-next-line no-template-curly-in-string
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    },
  ])
}

module.exports = config;
