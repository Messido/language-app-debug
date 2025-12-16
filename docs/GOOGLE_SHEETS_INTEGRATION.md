# Google Sheets Integration Proposal

## Overview

This document outlines how we can connect the language learning app to a **private Google Sheet** maintained by the client, allowing vocabulary data to be updated without code changes.

---

## How It Works

```
┌─────────────┐              ┌─────────────────┐              ┌───────────────┐
│   User's    │   requests   │     Backend     │   fetches    │    Google     │
│   Browser   │  ─────────►  │     Server      │  ─────────►  │    Sheets     │
│   (App)     │  ◄─────────  │    (FastAPI)    │  ◄─────────  │   (Private)   │
└─────────────┘   JSON data  └─────────────────┘   live data  └───────────────┘
```

1. **Client updates the Google Sheet** with new vocabulary
2. **User opens the app** and requests flashcard data
3. **Backend server fetches** the latest data from Google Sheets
4. **App displays** the updated vocabulary

> **Key Benefit:** Changes in the Google Sheet appear in the app immediately — no code deployment required.

---

## Security & Privacy

### The Google Sheet Stays Private

| Concern                      | Solution                                                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| "Will our sheet be public?"  | **No.** The sheet remains private. Only a special service account (like a read-only robot) can access it. |
| "Who can see the data?"      | Only the sheet owner and the service account. No one else.                                                |
| "Can someone edit our data?" | **No.** The service account has **read-only** access. It cannot modify, delete, or share the sheet.       |

### How Authentication Works

We use **Google's official Service Account** method — the same approach used by enterprise companies:

1. We create a "robot user" in Google Cloud (a Service Account)
2. We share the Google Sheet with this robot (Viewer access only)
3. The robot's credentials are stored securely on our server
4. The frontend app never sees or handles any credentials

### Security Features

| Feature                        | Description                                                |
| ------------------------------ | ---------------------------------------------------------- |
| **No passwords exposed**       | Uses cryptographic keys, not passwords                     |
| **Minimal permissions**        | Read-only access to one specific sheet                     |
| **Credentials on server only** | Never sent to the browser                                  |
| **Industry standard**          | Same method used by Google, Microsoft, and major companies |
| **Auditable**                  | Google logs all access for review                          |

---

## Benefits

### For the Client

- ✅ Update vocabulary anytime via familiar Google Sheets interface
- ✅ Changes appear in the app without waiting for developers
- ✅ No need to learn new tools or systems
- ✅ Sheet remains private and under their control

### For the Development Team

- ✅ Single source of truth for vocabulary data
- ✅ No manual data syncing or CSV exports needed
- ✅ Less maintenance — data updates don't require code changes
- ✅ Easy to add new features (filtering by level, categories, etc.)

### For Users

- ✅ Always see the latest vocabulary content
- ✅ No app updates needed for new words
- ✅ Consistent learning experience

---

## What We Need from the Client

1. **Share the Google Sheet** with our service account email (one-time setup)
2. **Provide the Sheet URL** so we can configure the connection

That's it. No other access or permissions required.

---

## Frequently Asked Questions

### Will the sheet be visible to the public?

**No.** The sheet remains private. We only request "Viewer" access for our service account — it cannot make the sheet public or share it with others.

### What if the client changes the sheet structure?

We'll coordinate on the column names upfront. As long as the column headers remain consistent, the app will continue to work.

### How quickly do changes appear?

Immediately. Each time a user opens a lesson, the app fetches the current data from the sheet.

### Is there a cost for using Google Sheets API?

No. Google provides a generous free tier (300 requests/minute) which is more than sufficient for this application.

### What happens if Google Sheets is down?

This is extremely rare (Google guarantees 99.9% uptime). If it happens, users would see a friendly error message and can retry shortly.

### Can we add caching to reduce API calls?

Yes. We can cache data for a configurable period (e.g., 5 minutes) to reduce calls while still reflecting updates quickly.

---

## Comparison: Why Not Other Approaches?

| Approach             | Drawback                                    |
| -------------------- | ------------------------------------------- |
| Public Google Sheet  | ❌ Anyone can see the data                  |
| Manual CSV exports   | ❌ Requires code deployment for each update |
| Copy-paste into code | ❌ Error-prone, requires developer time     |
| Separate database    | ❌ Client needs to learn new interface      |
| **Our approach**     | ✅ Private, automatic, familiar interface   |

---

## Technical Summary (for reference)

| Component      | Technology             |
| -------------- | ---------------------- |
| Frontend       | React (existing app)   |
| Backend        | FastAPI (Python)       |
| Authentication | Google Service Account |
| Data Source    | Google Sheets API v4   |
| Security       | OAuth 2.0 / JWT tokens |

---

## Next Steps

1. ✅ Confirm this approach is acceptable
2. ⬜ Set up Google Cloud project and service account
3. ⬜ Client shares sheet with service account
4. ⬜ Develop and test the integration
5. ⬜ Deploy to production

---

_Document prepared for stakeholder review_
