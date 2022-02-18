<div align="center">
  <h4 align="center">
    <a href="{{ website.homepage }}" title="Megabyte Labs homepage" target="_blank">
      <img src="https://gitlab.com/megabyte-labs/assets/-/raw/master/svg/home-solid.svg" />
    </a>
    <a href="{{ repository.group.dockerfile }}/{{ subgroup }}/{{ slug }}/-/blob/master/CONTRIBUTING.md" title="Learn about contributing" target="_blank">
      <img src="https://gitlab.com/megabyte-labs/assets/-/raw/master/svg/contributing-solid.svg" />
    </a>
    <a href="{{ chat_url }}" title="Slack chat room" target="_blank">
      <img src="https://gitlab.com/megabyte-labs/assets/-/raw/master/svg/chat-solid.svg" />
    </a>
    <a href="{{ profile.github }}/docker-{{ slug_full }}" title="GitHub mirror" target="_blank">
      <img src="https://gitlab.com/megabyte-labs/assets/-/raw/master/svg/github-solid.svg" />
    </a>
    <a href="{{ repository.group.dockerfile }}/{{ subgroup }}/{{ slug }}" title="GitLab repository" target="_blank">
      <img src="https://gitlab.com/megabyte-labs/assets/-/raw/master/svg/gitlab-solid.svg" />
    </a>
  </h4>
  <p align="center">
    <a href="https://hub.docker.com/repository/docker/megabytelabs/{{ slug_full }}" target="_blank">
      <img alt="Version" src="https://img.shields.io/docker/v/megabytelabs/{{ slug_full }}?logo=docker&logoColor=white&sort=date&style={{ badge_style }}" />
    </a>
    <a href="https://hub.docker.com/repository/docker/megabytelabs/{{ slug_full }}" target="_blank">
      <img alt="DockerHub image size: {{ pretty_name }}" src="https://img.shields.io/docker/image-size/megabytelabs/{{ slug_full }}?logo=docker&sort=date&logoColor=white&style={{ badge_style }}">
    </a>
    <a href="https://hub.docker.com/repository/docker/megabytelabs/{{ slug_full }}" target="_blank">
      <img alt="DockerHub pulls: {{ pretty_name }}" src="https://img.shields.io/docker/pulls/megabytelabs/{{ slug_full }}?logo=docker&logoColor=white&style={{ badge_style }}" />
    </a>
    <a href="https://hub.docker.com/repository/docker/megabytelabs/{{ slug_full }}" target="_blank">
      <img alt="DockerHub stars: {{ pretty_name }}" src="https://img.shields.io/docker/stars/megabytelabs/{{ slug_full }}?logo=docker&logoColor=white&style={{ badge_style }}" />
    </a>
    <a href="{{ repository.group.dockerfile }}/{{ subgroup }}/{{ slug }}/-/commits/master" target="_blank">
      <img alt="GitLab pipeline status" src="https://gitlab.com/megabyte-labs/dockerfile/{{ subgroup }}/{{ slug }}/badges/master/pipeline.svg?style={{ badge_style }}" />
    </a>
    <a href="{{ repository.group.dockerfile }}/{{ subgroup }}/{{ slug }}/-/raw/master/LICENSE" target="_blank">
      <img alt="License: {{ license }}" src="https://img.shields.io/badge/License-{{ license }}-yellow.svg?style={{ badge_style }}" />
    </a>
  </p>
</div>
