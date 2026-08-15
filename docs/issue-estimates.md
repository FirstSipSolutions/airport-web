# Issue estimates — airport-web

Points are relative, not hours. 1 is a config change, 3 is a page, 5 is
something that needs design decisions made along the way.

| Issue | Points | Status |
|---|---|---|
| Install router and Supabase client | 1 | done |
| Set up app layout and nav | 2 | done |
| Create shared API helper | 2 | done |
| Airports list page | 3 | done |
| Loading and error states | 2 | done |
| Airports create, edit, delete | 3 | done |
| Cities page and CRUD | 3 | done |
| Aircraft page and CRUD | 3 | done |
| Passengers page and CRUD | 3 | done |
| Flights page and CRUD | 3 | done |
| Arrivals and departures board | 5 | not started |
| Login page | 3 | done |
| Attach token to API calls | 2 | blocked — API does not validate tokens yet |
| Redirect if not logged in | 2 | not started |
| User stories in README | 1 | done |
| Deploy frontend | 3 | done |

Total: 41 points.

## Notes on the sizing

The four entity pages are 3 each rather than 3 for the first and 1 for the
rest. They were built as deliberate copies — same state, same fetch on mount,
same guards, same table — so each one carries the same weight even though the
later ones went faster.

Loading and error states are their own issue at 2 because the pattern was
built once on the airports page and then copied into every page after it.
Splitting it across five issues would have hidden that.

The board is 5 because it is the only screen without an obvious shape. The
CRUD pages all follow the same template; the board needs decisions about
what to show, how to sort it, and how often to refresh.

Attaching the token is only 2 because the API client is centralised — the
header goes in one place rather than at every call site.
