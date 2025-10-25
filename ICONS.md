# Custom Icon System

This project uses a custom Fontello icon system for consistent, beautiful icons throughout the app.

## Available Icons

### Navigation Icons

- `chat` - Chat interface icon
- `memory` - Memory/brain icon
- `user` - User profile icon
- `home` - Home icon
- `settings` - Settings icon

### Chat Icons

- `send` - Send message icon
- `message` - Message icon
- `typing` - Typing indicator
- `online` - Online status
- `offline` - Offline status

### Memory Icons

- `brain` - Brain/memory icon
- `bookmark` - Bookmark icon
- `tag` - Tag icon
- `calendar` - Calendar icon
- `clock` - Clock icon

### UI Icons

- `heart` - Heart/like icon
- `star` - Star icon
- `like` - Like icon
- `dislike` - Dislike icon
- `share` - Share icon
- `copy` - Copy icon

### Action Icons

- `edit` - Edit icon
- `delete` - Delete icon
- `add` - Add icon
- `remove` - Remove icon
- `search` - Search icon
- `filter` - Filter icon

### Status Icons

- `check` - Check/success icon
- `cross` - Cross/error icon
- `warning` - Warning icon
- `info` - Info icon
- `question` - Question icon

### Navigation Arrows

- `arrow-left` - Left arrow
- `arrow-right` - Right arrow
- `arrow-up` - Up arrow
- `arrow-down` - Down arrow

### Media Icons

- `image` - Image icon
- `video` - Video icon
- `audio` - Audio icon
- `file` - File icon
- `folder` - Folder icon

### Tech Icons

- `wifi` - WiFi icon
- `bluetooth` - Bluetooth icon
- `battery` - Battery icon
- `signal` - Signal icon

## Usage

```tsx
import CustomIcon from '../components/CustomIcon';

// Basic usage
<CustomIcon name="chat" size={24} color="#6366f1" />

// With custom styling
<CustomIcon
  name="memory"
  size={32}
  color="#8b5cf6"
  style={{ marginRight: 8 }}
/>
```

## Customization

To add new icons:

1. Visit [Fontello](https://fontello.com/)
2. Select your desired icons
3. Download the font package
4. Replace the `fontello.ttf` file in `assets/fonts/`
5. Update the `iconMap` in `src/components/CustomIcon.tsx`
6. Update the config in `assets/fonts/fontello-config.json`

## Font Setup

The app expects the Fontello font to be named `fontello` in the font family. Make sure your font file is properly linked in your React Native project.

For React Native 0.60+, the font should be automatically linked if placed in the correct directory structure.
