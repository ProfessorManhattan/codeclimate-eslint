<!-- ⚠️ This README has been generated from the file(s) ".config/docs/blueprint-readme-codeclimate.md" ⚠️--><div align="center">
  <center>
    <a href="https://github.com/ProfessorManhattan/codeclimate-eslint">
      <img width="148" height="148" alt="ESLint CodeClimate Engine logo" src="https://gitlab.com/megabyte-labs/docker/codeclimate/eslint/-/raw/master/logo.png" />
    </a>
  </center>
</div>
<div align="center">
  <center><h1 align="center"><i></i>ESLint 8 CodeClimate Engine<i></i></h1></center>
  <center><h4 style="color: #18c3d1;">A CodeClimate plugin maintained by <a href="https://megabyte.space" target="_blank">Megabyte Labs</a></h4><i></i></center>
</div>

<div align="center">
  <h4 align="center">
    <a href="website.homepage" title="Megabyte Labs homepage" target="_blank">
      <img src="https://gitlab.com/megabyte-labs/assets/-/raw/master/svg/home-solid.svg" />
    </a>
    <a href="https://gitlab.com/megabyte-labs/docker/codeclimate/codeclimate-eslint/-/blob/master/CONTRIBUTING.md" title="Learn about contributing" target="_blank">
      <img src="https://gitlab.com/megabyte-labs/assets/-/raw/master/svg/contributing-solid.svg" />
    </a>
    <a href="chat_url" title="Slack chat room" target="_blank">
      <img src="https://gitlab.com/megabyte-labs/assets/-/raw/master/svg/chat-solid.svg" />
    </a>
    <a href="ProfessorManhattan/docker-slug_full" title="GitHub mirror" target="_blank">
      <img src="https://gitlab.com/megabyte-labs/assets/-/raw/master/svg/github-solid.svg" />
    </a>
    <a href="https://gitlab.com/megabyte-labs/docker/codeclimate/codeclimate-eslint" title="GitLab repository" target="_blank">
      <img src="https://gitlab.com/megabyte-labs/assets/-/raw/master/svg/gitlab-solid.svg" />
    </a>
  </h4>
  <p align="center">
    <a href="https://hub.docker.com/repository/docker/megabytelabs/slug_full" target="_blank">
      <img alt="Version" src="https://img.shields.io/docker/v/megabytelabs/slug_full?logo=docker&logoColor=white&sort=date&style=for-the-badge" />
    </a>
    <a href="https://hub.docker.com/repository/docker/megabytelabs/slug_full" target="_blank">
      <img alt="DockerHub image size: pretty_name" src="https://img.shields.io/docker/image-size/megabytelabs/slug_full?logo=docker&sort=date&logoColor=white&style=for-the-badge">
    </a>
    <a href="https://hub.docker.com/repository/docker/megabytelabs/slug_full" target="_blank">
      <img alt="DockerHub pulls: pretty_name" src="https://img.shields.io/docker/pulls/megabytelabs/slug_full?logo=docker&logoColor=white&style=for-the-badge" />
    </a>
    <a href="https://hub.docker.com/repository/docker/megabytelabs/slug_full" target="_blank">
      <img alt="DockerHub stars: pretty_name" src="https://img.shields.io/docker/stars/megabytelabs/slug_full?logo=docker&logoColor=white&style=for-the-badge" />
    </a>
    <a href="https://gitlab.com/megabyte-labs/docker/codeclimate/codeclimate-eslint/-/commits/master" target="_blank">
      <img alt="GitLab pipeline status" src="https://gitlab.com/megabyte-labs/dockerfile/codeclimate/codeclimate-eslint/badges/master/pipeline.svg?style=for-the-badge" />
    </a>
    <a href="https://gitlab.com/megabyte-labs/docker/codeclimate/codeclimate-eslint/-/raw/master/LICENSE" target="_blank">
      <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" />
    </a>
  </p>
</div>

> </br><h3 align="center">**A CodeClimate engine for ESLint 8**</h3></br>

<!--TERMINALIZER![terminalizer_title](https://gitlab.com/megabyte-labs/ansible-roles/role_name/-/raw/master/.demo.gif)TERMINALIZER-->

**NOTE:** To use our optimized image (built with DockerSlim) for ESLint CodeClimate Engine 0.0.3, you must use a build tagged with the `slim` keyword. For instance, to use the latest slim build you should specify the image as `megabytelabs/codeclimate-eslint:slim`.

<a href="#table-of-contents" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Table of Contents

- [Overview](#overview)
  - [Slim Build](#slim-build)
  - [Versioning](#versioning)
  - [Testing](#testing)
  - [Standalone](#standalone)
- [Requirements](#requirements)
  - [Optional Requirements](#optional-requirements)
- [Examples](#examples)
  - [Integrating with GitLab CI](#integrating-with-gitlab-ci)
    - [CodeClimate Integration](#codeclimate-integration)
    - [Standalone Integration](#standalone-integration)
- [ESLint](#eslint)
  - [Shareable Configuration](#shareable-configuration)
  - [Building the Docker Container](#building-the-docker-container)
  - [Building a Slim Container](#building-a-slim-container)
  - [Build Tools](#build-tools)
- [Philosophy](#philosophy)
- [Contributing](#contributing)
- [License](#license)

<a href="#overview" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Overview

This project is the home of an ESLint 8 [CodeClimate](https://codeclimate.com/) engine. It was built to integrate ESLint results into the GitLab merge request web UI. It adopts most of its code from the [official CodeClimate ESLint engine](https://github.com/codeclimate/codeclimate-eslint). However, that configuration was last updated years ago so an update should be welcomed. In addition, this CodeClimate engine automatically updates the ESLint configuration used from NPM each time it runs. The configuration it uses by default is [eslint-config-strict-mode](https://github.com/ProfessorManhattan/eslint-config-strict-mode) and is suitable for TypeScript, JavaScript, YML, and JSON files.

### Slim Build

All of our CodeClimate engine projects include two variants. One is the regular build that is created using Docker and the `Dockerfile` that is in the root of this project. The other build is a `slim` build that is built via DockerSlim. If you are looking for stability and want to take advantage of the `slim` build, then you should specify an exact version when referencing the image (e.g. `megabytelabs/codeclimate-package:5.4.0` instead of `megabytelabs/codeclimate-package:latest`).

### Versioning

Whenever possible, we tag our Docker image versions with the corresponding version of the software that the Docker image is used for. For instance, if you are using the ESLint CodeClimate image, then the `megabytelabs/codeclimate-eslint:5.4.0` image means that it likely includes ESLint at version `5.4.0`. There may be some exceptions but this is what we strive for.

### Testing

Multiple methods of testing are used to ensure both the `latest` and `slim` build function properly. The `Dockerfile-test.yml` file in the root of the repository is a [container-structure-test]() that ensures that each container is working properly. On top of that, we also run commands on sample projects stored in `test/compare/` to ensure that the output from the `latest` image matches the output from the `slim` image. In some other scenarios, we also include unit tests for custom code written for the CodeClimate engine.

### Standalone

If you are interested in using the tool and have no need for CodeClimate integration, you can get the `latest`, `slim`, and versioned images without CodeClimate-related code by removing the `codeclimate-` string from the image name. For example, if the image is named `megabytelabs/codeclimate-codeclimate-eslint`, then you can get the same image without CodeClimate-related code by using the `megabytelabs/codeclimate-eslint` image.

<a href="#requirements" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Requirements

- **[Docker](https://gitlab.com/megabyte-labs/ansible-roles/docker)**

### Optional Requirements

- [DockerSlim](repository.project.dockerslim) - Used for generating compact, secure images
- [jq](repository.project.jq) - Used for interacting with JSON
- [Node.js](repository.project.node) (_Version >=14.18_) - Utilized to add development features like a pre-commit hook and maintenance tasks
- Many more requirements that are dynamically installed as they are needed by our `Taskfile.yml` via our custom [go-task/task](https://github.com/go-task/task) fork named **[Bodega](https://github.com/ProfessorManhattan/Bodega)**

If you choose to utilize the development tools provided by this project then at some point you will have to run `bash start.sh` (or `npm i` which calls `bash start.sh` after it is done). The `start.sh` script will attempt to automatically install any requirements (without sudo) that are not already present on your build system to the user's `~/.local/bin` folder. The `start.sh` script also takes care of other tasks such as generating the documentation by calling tasks defined in the `Taskfile.yml`. For more details on how the optional requirements are used and set up, check out the [CONTRIBUTING.md](https://gitlab.com/megabyte-labs/docker/codeclimate/codeclimate-eslint/-/blob/master/docs/CONTRIBUTING.md) guide.

When you are ready to start development, run `task --menu` to open an interactive dialog that will help you understand what build commands we have already engineered for you.

<a href="#examples" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Examples

There are several different ways you can use the Docker container provided by this project. For starters, you can test the feature out locally by running:

```shell
docker run -it -v ${PWD}:/work -w /work --rm megabytelabs/codeclimate-eslint:latest dockerExampleCommand
```

This allows you to run ESLint CodeClimate Engine without installing it locally. It also removes the image from your system when you are done. This could be good for security since the application is within a container and also keeps your file system clean.

You can also add a bash alias to your `~/.bashrc` file so that you can run the ESLint CodeClimate Engine command at any time. To do this, add the following snippet to your `~/.profile` file (or equivalent):

```shell
codeclimate-eslint() {
    docker run -it -v ${PWD}:/work -w /work --rm megabytelabs/codeclimate-eslint:latest "$@"
}
```

_Note: Some CLI tools run without any arguments passed in. For example, the CLI tool `ansible-lint` runs by simply entering `ansible-lint` in the terminal. Our Docker images default command is to show the version so to get around this quirk you would run `ansible-lint .`._

### Integrating with GitLab CI

The main purpose of this project is to build a Docker container that can be used in CI pipelines and during GitLab CI CodeClimate analysis.

#### CodeClimate Integration

If you are interested in improving the GitLab web UI for your merge requests, then you can take a peek at our [GitLab CI configuration for CodeClimate](https://gitlab.com/megabyte-labs/gitlab-ci/-/raw/master/lint/codeclimate.gitlab-ci.yml). It has to run in a single CI stage that includes all the linters you want to report on because GitLab CI only accepts one CodeClimate report artifact.

#### Standalone Integration

If you want to incorporate this CI pipeline tool into GitLab CI project without CodeClimate integration then your first step would be to create a `.gitlab-ci.yml` file in the root of your GitLab repository. Your `.gitlab-ci.yml` file should look something like this:

```yaml
---
stages:
  - lint

include:
  - remote: https://gitlab.com/megabyte-labs/gitlab-ci/-/raw/master/lint/codeclimate-eslint.gitlab-ci.yml
```

That is it! ESLint CodeClimate Engine will now run anytime you commit code (that matches the parameters laid out in the `remote:` file above). Ideally, for production, you should copy the source code from the `remote:` link above to another location and update the `remote:` link to the file's new location. That way, you do not have to worry about any changes that are made to the `remote:` file by our team.

<a href="#eslint" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## ESLint

For those of you who are unaware, [ESLint](https://eslint.org/) is a CLI tool that makes it easy to find and fix problems in JavaScript/TypeScript code. It can also do the same for JSON and YAML files. What makes it really special is its ability to automatically fix errors. Want all your objects, JSON, and YML sorted alphabetically? It can handle that and much more. You should include a configuration in your project for this CodeClimate engine/standalone linter to work properly.

### Shareable Configuration

We maintain a shareable configuration for ESLint that you can include in your project named **[eslint-config-strict-mode](https://github.com/ProfessorManhattan/eslint-config-strict-mode)**. It incorporates most of the best ESLint plugins into a single configuration that has been tuned to not report duplicates, enable as many rules as possible (while maintaining a compromise for sanity), and enable/disable rules based on the project type (defined in `blueprint.group` and `blueprint.subgroup` in `package.json`). Directions to incorporate our configuration (or any configuration) can be found on the [eslint-config-strict-mode](https://github.com/ProfessorManhattan/eslint-config-strict-mode) page.

### Building the Docker Container

You may have a use case that requires some modifications to our Docker image. After you make changes to the Dockerfile, you can upload your custom container to [Docker Hub](website.dockerhub) using the following code:

```shell
export DOCKERHUB_USERNAME=Your_DockerHub_Username_Here
export DOCKERHUB_PASSWORD=Your_DockerHub_Password_Here
docker login -u "$DOCKERHUB_USERNAME" -p "$DOCKERHUB_PASSWORD" docker.io
docker build --pull -t "$DOCKERHUB_USERNAME/codeclimate-eslint:latest" .
docker push "$DOCKERHUB_USERNAME/codeclimate-eslint:latest"
```

After setting your DockerHub username and password, the commands above will build the Docker image and upload it to [Docker Hub](https://hub.docker.com/) where it will be publicly accessible. You can see this logic being implemented as a [GitLab CI task here](repository.link.dockerhub_ci_task). This GitLab CI task works in conjunction with the `.gitlab-ci.yml` file in the root of this repository.

### Building a Slim Container

Some of our repositories support creating a slim build via [DockerSlim](https://gitlab.com/megabyte-labs/ansible-roles/dockerslim). According to [DockerSlim's GitHub page](https://github.com/docker-slim/docker-slim), slimming down containers reduces the final image size and improves the security of the image by reducing the attack surface. It makes sense to create a slim build for anything that supports it, including Alpine images. On their GitHub page, they report that some images can be reduced in size by up to 448.76X. This means that if your image is naturally **700MB** then it **can be reduced to 1.56MB**! It works by removing everything that is unnecessary in the container image.

As a convenience feature, we include a command defined in `package.json` that should build the slim image. Just run `task docker:build` after running `npm i` (or `bash start.sh` if you do not have `Node.js` installed) in the root of this repository to build both the `latest` and `slim` builds.

To build and publish a `slim` Dockerfile to Docker Hub, you can use the following as a starting point:

```shell
export DOCKERHUB_USERNAME=Your_DockerHub_Username_Here
export DOCKERHUB_PASSWORD=Your_DockerHub_Password_Here
docker login -u "$DOCKERHUB_USERNAME" -p "$DOCKERHUB_PASSWORD" docker.io
docker build -t "$DOCKERHUB_USERNAME/codeclimate-eslint:latest" .
docker-slim build --tag $DOCKERHUB_USERNAME/codeclimate-eslint:slim * **codeclimate-eslint**: --http-probe=false --exec '/usr/src/app/bin/eslint.js || continue' --mount "$PWD/test/example:/code" --workdir '/code' --preserve-path-file 'paths.codeclimate-eslint.txt'
* **eslint**: --http-probe=false --exec 'eslint --help' --preserve-path-file 'paths.eslint.txt' $DOCKERHUB_USERNAME/codeclimate-eslint:latest
docker push "$DOCKERHUB_USERNAME/codeclimate-eslint:slim"
```

It may be possible to modify the DockerSlim command above to fix an issue or reduce the footprint even more than our command. You can modify the slim build command inline in the `package.json` file under `blueprint.dockerSlimCommand`.

If you come up with an improvement, please do [open a pull request](repository.group.dockerCodeClimate/codeclimate-eslint/-/issues/new). And again, make sure you replace `DOCKERHUB_USERNAME` and `DOCKERHUB_PASSWORD` in the snippet above with your Docker Hub username and password. The commands in the snippet above will build the slim Docker image and upload it to [Docker Hub](https://hub.docker.com/) where it will be publicly accessible.

### Build Tools

You might notice that we have a lot of extra files considering that this repository basically boils down to a single Dockerfile. These extra files are meant to make team development easier, predictable, and enjoyable. If you have a recent version of [Node.js](repository.project.node) installed, you can get started using our build tools by running `npm i` (or by running `bash start.sh` if you do not currently have Node.js installed) in the root of this repository. After that, you can run `task --list` to see a list of the available development features. Alternatively, you can run `task --menu` to view an interactive menu that will guide you through the development process.

_Note:_ We use a custom-built version of [go-task/task](https://github.com/go-task/task) so if you already have it installed then you should either replace it with our version or use a different bin name for `task`.

For more details, check out the [CONTRIBUTING.md](https://gitlab.com/megabyte-labs/docker/codeclimate/codeclimate-eslint/-/blob/master/CONTRIBUTING.md) file.

<a href="#philosophy" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Philosophy

Utilizing Continuous Integration (CI) tools can improve developer efficiency drastically. They allow you to do things like scan new code for possible errors and automatically deploy new software.

This repository is home to the build instructions for a Docker container that is just one piece to the CI puzzle. Nearly all of [our CI pipeline Docker projects](https://gitlab.com/megabyte-labs/dockerfile/ci-pipeline) serve a single purpose.

Instead of using one of the countless pretty_name public Docker images available, we create it in-house so we know exactly what code is present in the container. We also ensure that all of our CI pipeline images are as small as possible so that our CI environment can download and run the specific task as quickly as possible. Using this repository as a base, you too can easily create your own in-house CI pipeline container image.

At first glance, you might notice that there are many files in this repository. Nearly all the files and folders that have a period prepended to them are development configurations. The tools that these files and folders configure are meant to make development easier and faster. They are also meant to improve team development by forcing developers to follow strict standards so that the same design patterns are used across all of our repositories.

<a href="#contributing" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://gitlab.com/megabyte-labs/docker/codeclimate/codeclimate-eslint/-/issues). If you would like to contribute, please take a look at the [contributing guide](https://gitlab.com/megabyte-labs/docker/codeclimate/codeclimate-eslint/-/blob/master/CONTRIBUTING.md).

<details>
<summary>Sponsorship</summary>
<br/>
<blockquote>
<br/>
I create open source projects out of love. Although I have a job, shelter, and as much fast food as I can handle, it would still be pretty cool to be appreciated by the community for something I have spent a lot of time and money on. Please consider sponsoring me! Who knows? Maybe I will be able to quit my job and publish open source full time.
<br/><br/>Sincerely,<br/><br/>

**_author_fullname_**<br/><br/>

</blockquote>

<a href="ProfessorManhattan">
  <img src="assets.patreon_image" width="160">
</a>

</details>

<a href="#license" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## License

Copyright © 2020-2021 [Megabyte LLC](https://megabyte.space). This project is [MIT](https://gitlab.com/megabyte-labs/docker/codeclimate/eslint/-/blob/master/LICENSE) licensed.
