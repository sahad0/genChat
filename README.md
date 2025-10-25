# AiRA Chat Mobile Experience

A sophisticated React Native chat application that simulates an AI companion with memory awareness, built for the AiRA technical challenge. This app demonstrates modern mobile development practices with TypeScript, Zustand state management, and beautiful UI animations.

## 🚀 Features

### Authentication Screen

- **Modern Login Interface**: Clean, gradient-based design with email/password fields
- **Form Validation**: Real-time validation with visual feedback
- **Demo Credentials**: Pre-filled with test credentials for easy testing
- **Password Toggle**: Show/hide password functionality
- **Loading States**: Smooth loading animations during authentication

### Chat Interface

- **Conversational UI**: User messages right-aligned, AI messages left-aligned with avatar
- **Streaming Simulation**: AI responses appear word-by-word with typing indicators
- **Memory Indicators**: Subtle tags showing when AI "remembers" information
- **Smart Responses**: Keyword-based AI responses with contextual memory
- **Real-time Typing**: Animated typing indicators during AI response generation

### Memory Panel

- **Categorized Memories**: Organized into "About You", "Preferences", and "Conversations"
- **Visual Memory Cards**: Beautiful cards with icons, dates, and category indicators
- **Filter System**: Category-based filtering for easy memory navigation
- **Memory Statistics**: Display of total memories stored

## 🛠 Technology Stack

### Core Framework

- **React Native 0.82.1**: Latest stable version with TypeScript support
- **TypeScript**: Full type safety throughout the application
- **React Navigation 6**: Modern navigation with stack and tab navigators

### State Management

- **Zustand 5.0.2**: Lightweight, modern state management
- **Separated Stores**: Dedicated stores for auth, chat, and memory state
- **Type-safe Actions**: All actions are fully typed

### UI & Styling

- **React Native Vector Icons**: Comprehensive icon library
- **Linear Gradients**: Beautiful gradient backgrounds and buttons
- **React Native Animatable**: Smooth animations and transitions
- **Custom Components**: Reusable, well-designed UI components

### Navigation & Gestures

- **React Navigation**: Stack and tab navigation
- **Gesture Handler**: Smooth gesture interactions
- **Safe Area Context**: Proper handling of device safe areas

## 📱 Architecture & Design Choices

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MessageBubble.tsx
│   ├── MessageInput.tsx
│   └── MemoryCard.tsx
├── screens/            # Screen components
│   ├── AuthScreen.tsx
│   ├── ChatScreen.tsx
│   └── MemoryScreen.tsx
├── store/              # Zustand state stores
│   ├── authStore.ts
│   ├── chatStore.ts
│   └── memoryStore.ts
├── navigation/          # Navigation configuration
│   └── AppNavigator.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
└── utils/              # Utility functions
```

### State Management Architecture

- **Auth Store**: Handles user authentication, login/logout, and error states
- **Chat Store**: Manages messages, streaming simulation, and typing states
- **Memory Store**: Manages AI memories, categories, and memory operations

### Design System

- **Color Palette**: Modern purple/blue gradient theme (#6366f1, #8b5cf6)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle elevation for depth and hierarchy
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Setup Instructions

### Prerequisites

- Node.js >= 20
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone and Navigate**

   ```bash
   cd chatApp
   ```

2. **Install Dependencies**

   ```bash
   yarn install
   ```

3. **iOS Setup** (macOS only)

   ```bash
   cd ios && pod install && cd ..
   ```

4. **Android Setup**
   - Open Android Studio
   - Open the `android` folder
   - Sync Gradle files
   - Create a virtual device or connect a physical device

### Running the App

#### Development Mode

```bash
# Start Metro bundler
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios
```

#### Production Build

```bash
# Android
yarn build:android

# iOS
yarn build:ios
```

## 🎯 Key Features Implementation

### Streaming AI Responses

The app simulates real AI streaming by:

- Breaking responses into words
- Displaying each word with a delay
- Showing typing indicators during streaming
- Maintaining smooth animations

### Memory System

- **Smart Categorization**: Automatically categorizes memories
- **Contextual Tags**: Shows when AI "remembers" information
- **Visual Indicators**: Clear memory tags in chat interface

### Authentication Flow

- **Mock Authentication**: Hardcoded success for demo credentials
- **Form Validation**: Real-time email and password validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Smooth loading animations

## 📸 Demo Screenshots

### Authentication Screen

- Clean gradient background
- Modern form design with validation
- Demo credentials pre-filled
- Smooth animations

### Chat Interface

- User messages on the right (blue gradient)
- AI messages on the left (gray background)
- AI avatar with gradient background
- Memory tags for contextual responses
- Typing indicators during streaming

### Memory Panel

- Categorized memory cards
- Filter system by category
- Beautiful card design with icons
- Date formatting and statistics

## 🔧 Development Features

### TypeScript Integration

- Full type safety across the application
- Interface definitions for all data structures
- Type-safe store actions and state

### Modern React Patterns

- Functional components with hooks
- Custom hooks for store integration
- Proper component separation

### Performance Optimizations

- FlatList for efficient message rendering
- Memoized components where appropriate
- Optimized animations and transitions

## 🎨 UI/UX Highlights

### Design Philosophy

- **Minimalist**: Clean, uncluttered interface
- **Intuitive**: Natural user interactions
- **Accessible**: Proper contrast and touch targets
- **Responsive**: Adapts to different screen sizes

### Animation Strategy

- **Micro-interactions**: Subtle feedback for user actions
- **Smooth Transitions**: Fluid navigation between screens
- **Loading States**: Clear feedback during async operations
- **Gesture Feedback**: Visual response to user interactions

## 🚀 Future Enhancements

### Potential Improvements

- **Real AI Integration**: Connect to actual AI services
- **Push Notifications**: Real-time message notifications
- **Offline Support**: Local storage and sync
- **Voice Messages**: Audio recording and playback
- **File Sharing**: Image and document sharing
- **Themes**: Dark mode and custom themes

### Technical Debt

- **Testing**: Unit and integration tests
- **Error Boundaries**: Better error handling
- **Performance**: Memory optimization for large chat histories
- **Accessibility**: Enhanced screen reader support

## 📝 Demo Credentials

For testing the authentication:

- **Email**: test@aira.ai
- **Password**: password

## 🤝 Contributing

This project was built as a technical challenge demonstration. The codebase follows modern React Native best practices and can serve as a foundation for a production chat application.

## 📄 License

This project is created for the AiRA technical challenge and demonstrates modern mobile development practices with React Native and TypeScript.
