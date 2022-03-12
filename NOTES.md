* Shouldn't we store the config at a path like this: https://docs.codeclimate.com/docs/advanced-configuration#examples (while leveraging the .codeclimate.yml file)
* Wrap all configs with "codeClimate" so that it is possible to store the configs in package.json 4052060017451983
* Take note at the linting changes
* Remove unnecessary files - if files might be used later on store them in `local/deprecated` with the same folder structure
* Take note at the container-structure-test changes
* Is there a way of mounting the tests in the container with container-structure-test so we don't have to include the test cases in the final image?
* Notice the use of apk del in the Dockerfile
* Implement check-category-mapping.json and store it in `local/category-map.json` -- copy what upstream ESLint categorized each as and fill in any obvious ones. After that, make it so that it looks at the category map first and then defaults to Style.
* Don't worry about 3/4
* I think #2 is addressed now -- please fix it if it is not working though
* Ensure container-structure-test works... for some reason it's not working on my computer -- I did make some changes so please fix if I broke something
* Make sure task lint:codeclimate works... it's basically a wrapper for running `codeclimate analyze --dev` (after you load the custom image by running `task build`) --- in practice, this command will be run on the `test/codeclimate` folder -- I just tried it and I got a permission error
* Make sure `task docker:test:gitlab-runner` works - this will run each stage in the `.gitlab-ci.yml` that starts with `integration` -- this is to test the real world implementation
