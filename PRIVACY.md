# Privacy Policy for OpenTaqwā

Last updated: **11 September 2025**

## Overview

OpenTaqwā ("Extension") respects your privacy. This privacy policy explains how we handle your information when you use our Chrome extension.

## Information We Don't Collect

- We do NOT collect any personal information
- We do NOT track your browsing history
- We do NOT use analytics or tracking cookies
- We do NOT sell, rent, or share any data with third parties

## Information Used Locally

### Location Data

- Your location is requested ONLY to calculate accurate prayer times
- Location data is processed locally and cached in your browser's localStorage
- Location information is NEVER sent to our servers (we don't have any)
<!-- - You can deny location access and manually select your location -->

### User Preferences

- Language preferences
- Display settings
- Cached prayer times
- All stored locally in your browser using Chrome's storage API

## Third-Party Services

The Extension makes requests to these services:

1. **Aladhan Prayer Times API** (https://api.aladhan.com)

   - Purpose: Calculate prayer times
   - Data sent: Coordinates or city name
   - Privacy: [Aladhan Privacy Policy](https://aladhan.com/privacy)

2. **OpenStreetMap Nominatim** (https://nominatim.openstreetmap.org)

   - Purpose: Convert coordinates to city names
   - Data sent: GPS coordinates
   - Privacy: [OSM Privacy Policy](https://wiki.osmfoundation.org/wiki/Privacy_Policy)

3. **Al Quran Cloud API** (https://api.alquran.cloud)

   - Purpose: Fetch Quranic verses
   - Data sent: Verse references only
   - Privacy: Public API, no personal data sent

4. **Reminder.dev API** (https://reminder.dev/api)
   - Purpose: Islamic reminders
   - Data sent: None
   - Privacy: Public API, no personal data sent

## Chrome Permissions

### Required Permissions:

- **geolocation**: To determine your location for prayer times (optional - you can deny)
- **storage**: To save your preferences locally

### Why These Permissions:

- All data stays on your device
- No external servers receive your data
- You maintain full control

## Data Security

- All data is stored locally on your device
- We recommend using Chrome's built-in security features
- The extension uses HTTPS for all external API calls

## Children's Privacy

This Extension does not knowingly collect any information from children under 13.

## Changes to Privacy Policy

We may update this privacy policy. Changes will be posted on our GitHub repository.

## Contact

For privacy concerns or questions:

- Create an issue on [GitHub](https://github.com/khan-rasul/open-taqwa/issues)
- Email: [your-email@example.com]

## Your Rights

You have the right to:

- Use the extension without providing location data
- Clear all locally stored data via Chrome settings
- Uninstall the extension at any time

---

_This extension is open source. You can review our code at https://github.com/khan-rasul/open-taqwa_
