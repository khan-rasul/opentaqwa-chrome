# OpenTaqwā - Companion for the Ummah

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg?style=for-the-badge)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?style=for-the-badge)](https://github.com/khan-rasul/open-taqwa)
[![Status](https://img.shields.io/badge/Status-Preview_Available-green.svg?style=for-the-badge)](https://github.com/khan-rasul/open-taqwa)
[![Development](https://img.shields.io/badge/Development-Open_for_Testing-orange.svg?style=for-the-badge)](https://github.com/khan-rasul/open-taqwa)

A beautiful Chrome extension that provides Adhan times, Duas, Ayahs and more in an elegant side panel interface.

![OpenTaqwā Screenshot](public/screenshot.png)

## ✨ Features

- **Live Prayer Times**: Accurate prayer times based on your location using the Aladhan API
- **Automatic Location Detection**: GPS-based location detection with city/country names
- **Smart Caching**: Instant loading with localStorage caching for better performance
- **Beautiful UI**: Modern, responsive design
- **Islamic Content**:
  - Daily Quranic verses
  - Asma Ul Husna
  - Essential Duas
  - Dhikr collections
  - Durood/Salawat
- **Side Panel Integration**: Seamless Chrome side panel experience
- **Offline Support**: Cached data works even when offline

## 🚀 Installation

### From Chrome Web Store

_[Coming soon - Currently in preview phase]_

### 🔍 Try it Now - Development Preview

**The extension is currently available for preview and testing!**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/khan-rasul/opentaqwa-chrome.git
    cd opentaqwa-chrome
    ```
2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Build the extension:**

    ```bash
    npm run build
    ```

4.  **Load in Chrome:**

- Open Chrome and go to chrome://extensions/
- Enable "Developer mode"
- Click "Load unpacked" and select the `dist` folder

## 🛠️ Development

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Chrome browser

### Local Development

1. **Clone and install:**

   ```bash
   git clone https://github.com/khan-rasul/opentaqwa-chrome.git
   cd opentaqwa-chrome
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**

   ```bash
   npm run build
   ```

### Tech Stack

- Frontend: React 19, Tailwind CSS 4.1
- Icons: Lucide React
- HTTP Client: Axios
- Build Tool: Vite
- APIs: Aladhan, Al Quran Cloud, Reminder.dev, OpenStreetMap Nominatim

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
1. Create a feature branch: `git checkout -b feature/amazing-feature`
1. Make your changes and test thoroughly
1. Commit your changes: `git commit -m 'Add amazing feature'`
1. Push to the branch: `git push origin feature/amazing-feature`
1. Open a Pull Request

### Areas where we need help:

- 🐛 Finding and fixing bugs
- 📱 UI/UX improvements
- ⚡ Performance optimizations
<!-- - 📚 Documentation improvements -->

## 🙏 Feedback & Support

- Issues: [GitHub Issues](https://github.com/khan-rasul/opentaqwa-chrome/issues)
- Feature Requests: [GitHub Discussions](https://github.com/khan-rasul/opentaqwa-chrome/discussions)
- Questions: Feel free to open an issue with the `question` label

## 📜 License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. See the LICENSE file for details.

## 🙏 Acknowledgments

- **APIs:** Aladhan, Al Quran Cloud, Reminder.dev, OpenStreetMap Nominatim
- **Libraries:** React, Tailwind CSS, Lucide React, Axios
- **AI tools:** Anthropic’s Claude Sonnet 4

---

Made with ❤️ for the Ummah

OpenTaqwā - With Īmān as light and Taqwā as guide
