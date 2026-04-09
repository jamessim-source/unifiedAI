# Build Instructions — Mana AI Tutor Android APK

## Prerequisites (install once)

1. **Node.js 20+** — https://nodejs.org (download LTS, run installer)
2. **Android Studio** — https://developer.android.com/studio
   - During setup, install: Android SDK, Android SDK Platform-Tools, Android Emulator
   - Accept all SDK licences when prompted
3. **Java 17+** — bundled with Android Studio (no separate install needed)

---

## Steps to build the APK

Open a terminal in this folder (`unifiedai-app/`) and run:

### 1. Install dependencies
```bash
npm install
```

### 2. Build the web app
```bash
npm run build
```

### 3. Add Android platform (first time only)
```bash
npm run cap:add
```

### 4. Sync web build into Android project
```bash
npm run cap:sync
```

### 5. Open in Android Studio
```bash
npm run cap:open
```

### 6. Build the APK in Android Studio
- In Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
- APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`
- Transfer to your phone via USB or AirDrop/Google Drive and install it

---

## Quick dev preview (in browser first)
```bash
npm run dev
```
Opens at http://localhost:5173 — use Chrome DevTools mobile emulation (iPhone 14 Pro) to preview.

---

## Install APK on Android phone
1. On your phone: Settings → Security → Enable "Install from unknown sources"
2. Copy `app-debug.apk` to your phone
3. Open the file on your phone and tap Install

---

## Troubleshooting
- `SDK location not found` → Open Android Studio → SDK Manager → copy the SDK path → create `android/local.properties` with: `sdk.dir=C:\\Users\\YourName\\AppData\\Local\\Android\\Sdk`
- `JAVA_HOME not set` → Android Studio bundles JDK at: `C:\Program Files\Android\Android Studio\jbr`
