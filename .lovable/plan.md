

# Features Worth Adding from ShelfSync — Filtered for SHELF

After comparing the ShelfSync prompt against what SHELF already has, here are the ideas that genuinely complement our app's warm, personal aesthetic and existing architecture:

---

## 1. Custom Lists
**What:** Let users create named lists like "2026 Watchlist," "Top Sci-Fi," "Comfort Shows."
**Why it fits:** SHELF already has a shelf metaphor — lists are like curated sub-shelves. It adds depth without complexity.
**Implementation:** New `ListsPage` with create/edit, a `lists` data structure, and a way to add items to lists from the Item Detail page.

## 2. "This Week" Queue on Home Page
**What:** A dedicated row on the Home page showing 3-5 items the user has queued for the current week, separate from the general "Continue" section.
**Why it fits:** Gives the Home dashboard more intentionality — not just "what's in progress" but "what I plan to consume this week." Fits the cozy, editorial vibe.
**Implementation:** Add a `queued` flag or a "This Week" built-in list, render as a horizontal scroll row on HomePage.

## 3. Tags on Items
**What:** User-defined tags (e.g. "cozy," "dark," "short") on each shelf item, filterable on the My Shelf page.
**Why it fits:** More personal than genre alone. Lets users organize by feel, not just category. Already have genre on items — tags layer on top naturally.
**Implementation:** Add `tags: string[]` to `ShelfItem`, tag input on Item Detail, tag filter chips on MyShelfPage.

## 4. Dates (Started / Finished)
**What:** Track when the user started and finished an item.
**Why it fits:** Essential for stats ("time to complete"), year-in-review, and personal journaling. The Stats page already exists but lacks temporal data.
**Implementation:** Add `startedAt` and `finishedAt` fields to `ShelfItem`, date pickers on Item Detail, use in Stats calculations.

## 5. AI "What Should I Watch/Read Next?" (Future, needs Cloud)
**What:** A conversational recommendation feature — "Based on your completed items, try X."
**Why it fits:** SHELF's home page already has a "Suggestions" concept stub. An AI-powered version using Lovable AI or Perplexity would make it actually useful.
**Implementation:** Would require Lovable Cloud. A "Suggest Next" button that sends completed items + ratings to an edge function for recommendations.

---

## What I'd Skip from ShelfSync

| Feature | Why skip |
|---|---|
| Landing + pricing page | SHELF is a personal tool, not a SaaS product |
| Stripe / Plus tier | No monetization needed for a personal tracker |
| Family sharing | Adds complexity without matching SHELF's solo, cozy feel |
| Trakt OAuth sync | Heavy integration, better saved for post-MVP |
| TMDB attribution page | Only needed if using TMDB API in production — not yet |
| Encrypted integrations table | Over-engineered for current scope |

---

## Recommended Build Order

1. **Tags on items** — small data model change, big usability win
2. **Started/Finished dates** — unlocks meaningful stats
3. **Custom Lists page** — new screen, high value
4. **"This Week" queue on Home** — polishes the dashboard
5. **AI recommendations** — future enhancement once Cloud is connected

All of these can be built with mock data first (matching current approach) and later wired to Supabase when the backend is connected.

