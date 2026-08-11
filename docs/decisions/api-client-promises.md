

# Promise chaining in the API client

**Status:** Accepted
**Date:** 2026-08-10
**Scope:** `src/lib/api.js`



## Decision

The shared API client uses promise chaining (`.then()`) rather than `async`/`await`.

## Context

All HTTP calls to the Spring Boot API go through a single module, `src/lib/api.js`.
It exposes `get`, `post`, `put`, and `delete`, and owns the base URL so components
never construct one. Each method is a single `fetch` with no dependent calls.

## Rationale

- Each method is one request with one transformation — response check, then `.json()`.
  There is no sequencing between calls, which is where `await` earns its readability.
- The chain stays short enough to read at a glance, so the flatter control flow that
  `await` provides has nothing to flatten here.
- Rejections propagate to the caller either way. Components handle failure at the call
  site, so the client itself needs no `try`/`catch`.

## Trade-offs

`async`/`await` is the more common style in current React codebases and reads
top-to-bottom, which matters once calls depend on one another. If a method later needs
sequenced requests, retry logic, or a shared `try`/`catch`, that method should be
rewritten with `await` — the two styles interoperate, so this can happen per-method
rather than as a rewrite.

## Notes

Both styles are promises underneath; `await` is syntax over the same mechanism. This is
a readability decision, not a behavioural one.