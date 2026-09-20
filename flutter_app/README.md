# EduAttend - Anjali House NGO Student Attendance App

A production-ready Flutter mobile application for teachers at **Anjali House (Siem Reap, Cambodia)** to record daily student attendance, monitor class rates, and sync records.

---

## 🚀 How to Run in VS Code (Visual Studio Code)

### Prerequisites:
1. Install **Flutter SDK** (https://docs.flutter.dev/get-started/install)
2. Install the **Flutter** extension in VS Code:
   - Open VS Code → Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`)
   - Search for `Flutter` and click **Install** (this automatically installs the `Dart` extension too).

---

### Step 1: Open the Project in VS Code
1. In VS Code, go to **File > Open Folder...**
2. Select the `flutter_app` folder.

---

### Step 2: Get Dependencies
Open the integrated terminal in VS Code (`Ctrl + ~` or Terminal > New Terminal) and run:
```bash
flutter pub get
```

---

### Step 3: Choose Device & Run
1. Look at the bottom-right status bar in VS Code and select your target device:
   - **Chrome** (Web)
   - **Android Emulator / Connected Phone**
   - **iOS Simulator / iPhone** (macOS only)
   - **Windows / macOS / Linux Desktop**

2. Press **`F5`** (or go to **Run > Start Debugging**).

That's it! The application will compile and launch the Anjali House EduAttend app with Hot Reload enabled.

---

## 📁 Project Architecture & File Tree

```
flutter_app/
├── .vscode/
│   └── launch.json            # One-click F5 debug config for VS Code
├── lib/
│   ├── main.dart              # Application entry point & theme
│   ├── models/
│   │   ├── student.dart       # Student model (Khmer & English names, status enum)
│   │   └── attendance_session.dart # Classes & session models
│   ├── screens/
│   │   ├── splash_screen.dart # Anjali House welcome screen
│   │   ├── home_screen.dart   # Bottom navigation & teacher dashboard
│   │   ├── attendance_screen.dart # Interactive attendance marking & stats
│   │   ├── classes_screen.dart # Class roster list
│   │   ├── reports_screen.dart # NGO stats & export
│   │   └── profile_screen.dart # Teacher profile & offline toggles
│   └── widgets/
│       └── student_card.dart  # Custom interactive 4-button student row
├── pubspec.yaml               # Project dependencies & metadata
├── analysis_options.yaml      # Dart analyzer rules
└── README.md                  # Setup guide
```
