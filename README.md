# LendLoop

Get your stuff back without the awkward.

LendLoop is a tiny ledger for everything you have lent out: the drill, the tent, the ladder, the book. Log the item, the person, and a due-back window, and LendLoop keeps score - what is out there, what is due soon, and what is overdue - and writes the reminder text for you (friendly or direct, one tap to copy).

## Use it

Open `index.html` for the landing page, or go straight to `app.html`.

Everything runs client-side; loans are stored in your browser's localStorage. No account, no server.

## Files

- `index.html` - landing page
- `app.html` - the app
- `engine.js` - pure loan-tracking math (due dates, statuses, nudge texts), shared by the app and tests

Built by the hourly app factory.
