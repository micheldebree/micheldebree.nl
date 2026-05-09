---
title: "A simpler setup for this site"
date: 2023-03-15T00:00:00+02:00
tags: ["coding"]
---

I simplified the development of this site a bit, making the setup I described in
my [welcome post](/posts/welcome) obsolete.

The most important changes:

- Use one github repository instead of two
- Do not store build artifacts in the repository, but build and deploy with
  Github actions
- Do not use submodules because they are a pain to work with

You can read about the complex setup in the welcome post. To make it simpler, I:

- Ditched the original source repository, and made the Github pages repository
  [`micheldebree.github.io`](https://github.com/micheldebree/micheldebree.github.io)
  the source repository. I removed all build artifacts and added them to
  `.gitignore`.
- Removed the hugo-coder theme as submodule, and added it as a
  [subtree](https://www.atlassian.com/git/tutorials/git-subtree)
- Set up a Github action by following the [instructions on the hugo
  site](https://gohugo.io/hosting-and-deployment/hosting-on-github/), in short:
  - Create `.github/workflows/hugo.yaml` as described
  - In the settings of the repository, set it to build and deploy using a Github
    action

I now edit and test the site locally, and when I push the sources, the Github
action kicks in and builds and deploys the site. No more messing with two
repositories, submodules, and adding build artifacts to version control.

## Another setup

I also tried another setup with just one repo. I still built the site locally
and pushed the build artifacts to the repo. I could do this because I noticed
Github _can_ in fact host the site from a subfolder of the repository, as long
as it is the `/docs` folder.

To make this work I added the following line to hugo's `config.toml`:

```toml
publishDir = docs
```

and in the Github pages settings, set it to deploy from the `/docs` folder.
