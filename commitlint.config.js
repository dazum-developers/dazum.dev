export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      issuePrefix: ['DAZ-'],
    },
  },
  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {},
}
