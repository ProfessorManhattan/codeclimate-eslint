## ESLint

For those of you who are unaware, [ESLint](https://eslint.org/) is a CLI tool that makes it easy to find and fix problems in JavaScript/TypeScript code. It can also do the same for JSON and YAML files. What makes it really special is its ability to automatically fix errors. Want all your objects, JSON, and YML sorted alphabetically? It can handle that and much more. You should include a configuration in your project for this CodeClimate engine/standalone linter to work properly.

### Shareable Configuration

We maintain a shareable configuration for ESLint that you can include in your project named **[eslint-config-strict-mode](https://github.com/ProfessorManhattan/eslint-config-strict-mode)**. It incorporates most of the best ESLint plugins into a single configuration that has been tuned to not report duplicates, enable as many rules as possible (while maintaining a compromise for sanity), and enable/disable rules based on the project type (defined in `blueprint.group` and `blueprint.subgroup` in `package.json`). Directions to incorporate our configuration (or any configuration) can be found on the [eslint-config-strict-mode](https://github.com/ProfessorManhattan/eslint-config-strict-mode) page.
