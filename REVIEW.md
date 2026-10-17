# Code Review — VeeLion Full-Stack Assessment

## Overview

I reviewed the starter code to understand how the backend and frontend work. I ran
the application, checked the main features, and tried different API requests,
including invalid requests.

I also used AI as a second reviewer to help me find problems I might have missed. I
checked the findings against the code before deciding what to change.

The findings below are grouped by the type of problem. For each finding, I explain
what was wrong, why it matters, and how it was improved.

## Backend

### Bugs

**1. Task updates allowed fields that should not be changed — Fixed**

**Problem**

The task update API checked the `title` and `completed` fields, but it did not
reject other fields. It merged the full request body into the saved task.

For example, a request like `{"title":"ok","id":"INJECTED"}` could change the task
ID. The create API did not have the same behavior because it ignored extra fields.

**Why it matters**

The ID is used to find a task. Changing it can break later requests. It also means
clients can change fields that the API was not designed to let them change.

**Fix**

I connected the existing `taskValidator.js` to both create and update. It now
checks the allowed fields and their types, trims the title, and rejects unknown
fields with a `400` response. Only validated fields reach the save logic.

**2. Creating and updating tasks used different validation rules — Fixed**

**Problem**

Creating a task accepted a one-letter title such as `"a"`, while updating a task
required at least two letters.

**Why it matters**

The same value could work during creation but fail during an update. This makes the
API rules confusing.

**Fix**

I made both APIs use the same validation rules. A title must be a non-empty string
after trimming spaces.

**3. Activity creation accepted invalid data — Fixed**

**Problem**

`POST /activity` accepted request bodies without a valid `action`. For example, `{}`
or `{"info":"x"}` could still create an activity. It also accepted body types that
were not expected.

The route did not follow the same error-handling approach as the rest of the
backend.

**Why it matters**

The API could report success while saving incomplete data. This also forced the
frontend to handle missing fields.

**Fix**

I added an activity validator. It requires a non-empty `action`, allows optional
text in `info`, and rejects unknown fields. I also connected the route to the
shared error-handling approach.

**4. Activity IDs could be duplicated — Fixed**

**Problem**

Activity IDs were created using `String(Date.now())`. Two entries created during
the same millisecond could receive the same ID.

**Why it matters**

When two records share an ID, the API may return, update, or delete the wrong
record.

**Fix**

I reused the shared `createId()` helper, which creates random IDs and has a
fallback method.

**5. Activity was missing some CRUD endpoints — Fixed**

**Problem**

The activity API supported listing and creating entries, but it did not support
getting one entry, updating an entry, or deleting an entry.

**Why it matters**

The frontend could not provide complete activity management, even after the backend
was extended.

**Fix**

I added the missing endpoints:

- `GET /activity/:id`
- `PATCH /activity/:id`
- `DELETE /activity/:id`

I also added the required validation and error handling for these operations.

**6. API response formats were different — Fixed**

**Problem**

The tasks API returned responses inside a `{ data }` object, while the activity API
returned raw objects and arrays.

**Why it matters**

The frontend needed different handling for different modules. This also made the
API harder to understand and maintain.

**Fix**

I made both modules use the same `{ data }` response format and updated the API
documentation.

**7. The Reports feature was missing — Added**

**Problem**

The starter application did not have a Reports API or a Reports page.

**Why it matters**

Users could not see a summary of their tasks and recent activity.

**Fix**

I added `GET /reports/tasks-summary` and connected it to the new Reports page. The
API returns the total number of tasks, task counts by status, and the number of
recent activities.

### Performance

**8. Activity file operations blocked the server — Fixed**

**Problem**

The activity module used synchronous file operations such as `readFileSync`,
`writeFileSync`, and `existsSync`. The tasks module already used the asynchronous
helper in `utils/jsonStore.js`.

**Why it matters**

Synchronous file operations block the Node.js event loop while they run. During
that time, the server cannot process other requests normally.

**Fix**

I moved activity storage to the shared asynchronous JSON storage helper. Both
modules now use the same approach.

### Security

**9. Request data was not limited to allowed fields — Fixed**

**Problem**

The task update API accepted fields outside the documented update fields. This is
the same issue described in finding 1, but it is also a security concern.

**Why it matters**

Request data comes from the client and should not be trusted. Allowing unexpected
fields can let users change internal data that the API should control.

**Fix**

I added an allow-list for task fields and reject unknown fields. The activity API
follows the same approach.

**10. The API had no request limit — Added**

**Problem**

The backend accepted any number of requests from the same client. Nothing slowed
down or stopped repeated requests, such as a script sending hundreds of calls in a
short time.

**Why it matters**

Without a limit, one caller can overload the server and the JSON files with it,
making the application slow or unavailable for everyone else.

**Fix**

I installed and added `express-rate-limit`. Each IP address can now make 100
requests per minute. Extra requests receive a `429` response using the same
`{ error: { message } }` format as the rest of the API.

**11. Request bodies had no size limit — Added**

**Problem**

`express.json()` accepted request bodies of any size.

**Why it matters**

A very large body can use a lot of server memory and slow down the whole
application. The API only expects short text fields, so large bodies are never
useful.

**Fix**

I set a `10kb` limit on `express.json()`. Larger bodies are rejected with a `413`
response before any route runs.

### Maintainability

**12. The existing task validator was not used — Fixed**

**Problem**

`taskValidator.js` already existed, but the routes did not use it. The controller
and service also had their own validation checks with different rules.

**Why it matters**

When the same rules are written in several places, one part can be updated while
another part stays incorrect. This also makes the code harder to understand.

**Fix**

I connected the existing validator to the task write operations and removed the
repeated checks. The validation rules now have one main source.

**13. Activity had repeated storage code — Fixed**

**Problem**

The activity module contained two copies of the same data-loading function,
`loadDataA` and `loadDataB`. It also used a different storage approach from the
tasks module.

**Why it matters**

Repeated code takes longer to maintain and can become inconsistent when changes are
made.

**Fix**

I removed the repeated functions and reused `utils/jsonStore.js` for reading and
writing data.

**14. Activity names were difficult to understand — Fixed**

**Problem**

Some names, such as `get_activity`, `aSvc`, `x`, `one`, and `bodyData`, did not
clearly explain their purpose.

**Why it matters**

Clear names help developers understand the code without having to follow every
function in detail.

**Fix**

I used clearer names that follow the style of the tasks module, such as
`activityController`, `activityService`, `listActivity`, and `createActivity`.

### Code quality

**15. API documentation did not match the code — Fixed**

**Problem**

The API guide contained old information:

- It used port 4000, while the backend runs on port 3000.
- It listed only the `GET` and `POST` activity endpoints.
- It said activity input was not validated.
- It described the old title validation rule.
- It did not list the frontend proxy routes.

**Why it matters**

Incorrect documentation makes setup harder and can lead developers to use the API
incorrectly.

**Fix**

I updated `frontend/docs/backend-endpoints.md` to match the current API. It now
includes the correct port, response format, validation rules, activity endpoints,
frontend proxy routes, and the request limits.

**16. The API error handling needed a consistent approach — Improved**

**Problem**

The activity routes did not follow the same error-handling pattern as the other
routes. This made invalid requests and unexpected errors harder to handle
consistently.

**Why it matters**

Different error-handling patterns can produce different responses for similar
problems. This also makes the code harder to maintain.

**Fix**

I connected the activity routes to the shared error-handling helpers and used the
existing async route-handling approach.

## Frontend

### Bugs

**17. Unexpected API responses could break the tasks page — Fixed**

**Problem**

The tasks hook used `body.data` without checking whether the response contained the
expected field.

**Why it matters**

If the API returned an unexpected response, the page could receive `undefined`
instead of a list. The page could then crash when trying to filter the tasks.

**Fix**

I added a shared API layer and API types. List functions now handle a missing
`data` field safely, while request errors are handled separately.

**18. API errors appeared as empty activity lists — Fixed**

**Problem**

The activity page used a catch handler that replaced the list with an empty array
when a request failed.

**Why it matters**

Users could not tell the difference between having no activities and having a
problem loading them.

**Fix**

I moved the request handling into the shared store and added a clear error state
with a Retry button.

**19. The frontend used the wrong backend port — Fixed**

**Problem**

`.env.example`, the fallback URL in `lib/constants.ts`, and the API documentation
used port 4000, while the backend runs on port 3000.

**Why it matters**

A developer following the setup instructions could start the application but still
have every API request fail.

**Fix**

I corrected the URLs and updated the README with the frontend and backend setup
steps.

**20. Activity entries appeared in the wrong order — Fixed**

**Problem**

The page said the newest activities would appear first, but the displayed order
placed older entries at the top.

**Why it matters**

The page did not behave as its title promised, making recent events harder to find.

**Fix**

I sorted activities by date in the store so the newest entries appear first.

### Performance

**21. The activity page updated every 1.4 seconds without a clear reason — Fixed**

**Problem**

A timer changed a state value every 1.4 seconds. This caused the page to recalculate
lists and create new copies of activity data even when nothing had changed.

**Why it matters**

The page did extra work without showing any useful change. It also made the data
flow harder to understand.

**Fix**

I removed the timer and unnecessary state updates. The page now updates when its
data or filters change.

**22. Pages requested the same data more than needed — Improved**

**Problem**

The tasks and activity pages loaded data in separate effects. Moving between pages
could cause repeated requests, and data was not managed in one shared place.

**Why it matters**

Repeated requests add unnecessary work and can cause loading flickers. Different
pages can also show different versions of the same data.

**Fix**

I used Redux Toolkit to keep the shared data in one store. The request logic checks
whether data is already loaded before fetching it again. Save actions also update
the store and refresh the Reports data.

### UX issues

**23. Loading, empty, and error states were not consistent — Fixed**

**Problem**

Tasks displayed a basic loading message, activity sometimes showed nothing while
loading, and empty states were not clear. The pages also handled errors differently.

**Why it matters**

Users may think the application is broken or may not understand whether data is
loading, missing, or unavailable because of an error.

**Fix**

I added shared components for loading, empty, and error states. These include
skeleton rows, clear messages, and a Retry button when a request fails.

**24. Users could not add or edit records from the UI — Fixed**

**Problem**

The original frontend mainly supported viewing, filtering, and completing tasks.
Users could not create or edit tasks and activity entries through the interface.

**Why it matters**

The interface did not provide the full management features expected from these
modules. It also made it harder to test the write operations through the
application.

**Fix**

I added forms and modals for creating and editing tasks and activity entries. I
connected these actions to the API and store and added the required frontend proxy
routes.

The modal also supports closing with Escape and clicking outside, and it manages
page scrolling and keyboard focus.

**25. The Reports page was missing — Added**

**Problem**

There was no page to display the task summary and recent activity count.

**Why it matters**

Users had to open other pages and count the information themselves.

**Fix**

I added a Reports page with summary cards and status bars. It loads data from the
Reports API and shows loading and error states.

**26. Styling and accessibility were inconsistent — Improved**

**Problem**

Pages used different inline styles and hard-coded colors. Some form fields depended
on placeholder text instead of proper labels. Keyboard focus and accessible status
information also needed improvement.

**Why it matters**

Inconsistent styles make future UI changes harder. Missing labels and focus
indicators can make the application difficult to use with a keyboard or screen
reader.

**Fix**

I added shared styles and a common color theme. I also improved form labels, visible
focus styles, accessible status information, and keyboard support.

### React best practices

**27. The activity page stored several copies of the same data — Fixed**

**Problem**

The activity page kept `allActivity`, `shownActivity`, and `forcedList` as separate
states. Effects were used to keep these lists in sync. It also had duplicate
time-formatting and filtering functions.

**Why it matters**

When the same data is stored in several places, one copy can become outdated. Extra
effects also make it harder to understand why the UI changed.

**Fix**

I moved shared activity data into Redux Toolkit and removed the unnecessary copies
and duplicate functions. The page now uses the shared data and applies the selected
filters to display the list.

**28. Pages handled API requests and UI logic together — Improved**

**Problem**

The activity page called `fetch` directly, while the tasks hook handled HTTP
requests, errors, and task logic together.

**Why it matters**

When each page handles requests differently, it becomes harder to reuse logic, test
behavior, and keep error handling consistent.

**Fix**

I separated the frontend into clear parts:

- `lib/` handles HTTP requests and API calls.
- `store/` manages shared data and actions.
- `hooks/` connects page components to the store.
- `components/` contains reusable UI elements.

**29. Reusable UI components were missing — Improved**

**Problem**

Pages created their own loading, empty, error, and header elements. Similar UI
behavior was repeated in several files.

**Why it matters**

Repeated markup makes updates slower and can cause the pages to look or behave
differently.

**Fix**

I created shared components such as `ErrorBanner`, `EmptyState`, `PageHeader`,
`Modal`, and `LedgerSkeleton`.

**30. API data types were repeated or missing — Improved**

**Problem**

Some API response shapes were written again inside request functions, while
activity request and response types were missing.

**Why it matters**

If the frontend and backend expect different data shapes, errors can happen at
runtime. Repeated types also make updates harder.

**Fix**

I added shared types in `types/api.ts`, including task updates, activity input and
updates, and report data. The API layer now handles the request and response shapes
in one place.
