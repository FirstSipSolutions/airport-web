# Demo video script

~4-5 minutes. Read loosely, don't recite word for word.

## 1. Intro (20s)

"This is Airport Board — a live arrivals and departures app. Two repos:
`airport-web`, a React frontend, and `airport-api`, a Spring Boot backend.
Five entities — City, Airport, Aircraft, Passenger, and Flight — with
relationships between all of them: a city has airports, a flight links an
aircraft and two airports, a passenger belongs to a city."

## 2. The board (30s)

Open the deployed Vercel URL, land on `/board`.

"This is the live board — it pulls flights from the API and refreshes
automatically every 30 seconds. Status is color-coded: green for on time,
amber for delayed, red for cancelled."

## 3. CRUD walkthrough (90s)

Pick two pages, not all five — Airports and Flights are enough to prove the pattern.

- Airports: show the list, add one, edit it, delete it.
- Flights: show the list, add one with a departure/arrival time, point out
  the gate/terminal/aircraft fields.

"Every entity page follows the same shape — fetch on load, loading and error
states, then create/edit/delete. That consistency is deliberate, it's in the
issue estimates doc."

## 4. Backend architecture (30s)

Switch to the `airport-api` repo/IDE.

"Spring Boot, layered — Controller, Service, Repository per entity. MySQL
behind it. Full CRUD on every endpoint, matching the frontend."

## 5. Tests (20s)

"Each entity has its own endpoint test class." Show the `src/test` folder,
or run `mvn test` briefly.

## 6. Docker (20s)

"The API runs in Docker — `docker compose up` brings up the app and the
database together." Show `docker-compose.yml` or run it briefly.

## 7. Git workflow (30s)

Show GitHub: branches, a merged PR, the issue estimates table.

"We branch per feature, PR into development, and size work with story
points before starting — that table's in the repo."

## 8. Auth — be direct about where it stands (20s)

"Login is built on the frontend using Supabase — email/password, no roles.
Right now the API doesn't validate that token server-side yet — that's the
one piece still in progress. The frontend and the contract are both ready
for it."

Don't dodge this one. Naming it precisely reads better than hoping nobody notices.

## 9. Deployment (20s)

"Frontend's on Vercel, API's on Render, both live off the `main` branch."
Show both URLs loading.

## 10. Close (10s)

"That's Airport Board — five entities, full CRUD, deployed, and built
by two people over one sprint."
