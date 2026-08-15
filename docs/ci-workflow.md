# CI workflow status

The API repo has a GitHub Actions workflow that runs the Java tests
automatically on pull requests (`.github/workflows/maven.yml`). It currently
only exists on the `main` branch, not on `development`.

Because almost every pull request in this project targets `development`,
that means tests aren't actually running automatically on those PRs yet —
the workflow file has to exist on the branch a PR is opened against for
GitHub to pick it up.

Fix is small: copy that one file over to `development` (or make `main` the
branch everyone branches from and PRs into, which would close this gap on
its own since `main` already has it).
