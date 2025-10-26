# AiRA - AI Chat Companion

A modern React Native chat application with AI-powered conversations, memory features, and beautiful UI.

## 🚀 Quick Start

### Prerequisites

- Node.js (>= 20.0.0)
- React Native CLI
- iOS Simulator / Android Emulator
- Xcode (for iOS) / Android Studio (for Android)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd chatApp

# Install dependencies
npm install

# iOS
cd ios && pod install && cd ..
npm run ios

# Android
npm run android
```

## 🏗️ Architecture

### Tech Stack

- **React Native 0.82** - Cross-platform mobile development
- **React Navigation v6** - Navigation with stack and tab navigators
- **Zustand** - Lightweight state management
- **React Native SVG** - Custom icon system
- **React Native Animatable** - Smooth animations
- **TypeScript** - Type safety and better DX

### Key Features

- **Real-time AI Chat** - Streaming text responses with smooth animations
- **Memory System** - AI remembers context and user preferences
- **Modern UI** - Clean design with custom SVG icons and animations
- **Smart Suggestions** - Prefilled message suggestions
- **Responsive Design** - Adapts to keyboard and different screen sizes

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MessageBubble.tsx
│   ├── StreamingText.tsx
│   └── CustomIcon.tsx
├── screens/            # Screen components
│   ├── ChatScreen.tsx
│   ├── LoginScreen.tsx
│   └── MessageInputScreen.tsx
├── store/              # Zustand state management
│   ├── chatStore.ts
│   └── authStore.ts
├── navigation/         # Navigation configuration
└── theme/             # Design system
```

## 🎨 Design Choices

- **Custom SVG Icons** - Consistent, scalable iconography
- **Streaming Text** - Character-by-character animation for natural feel
- **Modal Input** - Half-height modal with keyboard-aware positioning
- **Memory Tags** - Visual indicators for AI context awareness
- **Smooth Animations** - Fade-in effects and responsive interactions

## 📱 Demo

### Key Screenshots

- **Chat Interface** - Clean conversation view with AI responses
- **Message Input** - Modal-based input with suggestions
- **Memory System** - Context-aware AI with memory tags
- **Empty State** - Welcoming interface with suggestion chips

### Demo Video

[2-3 minute demo showing key features]

## 🔧 Development

### Available Scripts

```bash
npm start          # Start Metro bundler
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run lint       # Run ESLint
```

### Environment Setup

Create `.env` file (see `.env.example`):

```env
# Add any required environment variables
```

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ using React Native**
