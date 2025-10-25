import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomIcon from './CustomIcon';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import StreamingText from './StreamingText';
import TypingIndicator from './TypingIndicator';

import {Message} from '../types';
import {useTheme} from '../context/ThemeContext';
import {typography, spacing, shadows} from '../theme';

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isStreaming = false,
}) => {
  const {theme} = useTheme();
  const isUser = message.isUser;

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={300}
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
      ]}>
      {!isUser && (
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, {backgroundColor: theme.primary}]}>
            <CustomIcon name="ai" size={20} color="#ffffff" />
          </View>
        </View>
      )}

      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        {isUser ? (
          <View
            style={[
              styles.userBubbleContent,
              {backgroundColor: theme.userBubble},
            ]}>
            <Text style={[styles.userText, {color: theme.userText}]}>
              {message.text}
            </Text>
          </View>
        ) : (
          <View
            style={[styles.aiBubbleContent, {backgroundColor: theme.aiBubble}]}>
            {isStreaming ? (
              <StreamingText
                text={message.text}
                isStreaming={isStreaming}
                speed={30}
              />
            ) : (
              <Text style={[styles.aiText, {color: theme.aiText}]}>
                {message.text}
              </Text>
            )}
            {isStreaming && <TypingIndicator isVisible={isStreaming} />}
          </View>
        )}
      </View>

      {message.memoryTags && message.memoryTags.length > 0 && (
        <View style={styles.memoryTagContainer}>
          <TouchableOpacity
            style={[
              styles.memoryTag,
              {
                backgroundColor: theme.memoryTag,
                borderColor: theme.memoryTagBorder,
              },
            ]}>
            <CustomIcon name="memory" size={12} color={theme.memoryTagText} />
            <Text style={[styles.memoryTagText, {color: theme.memoryTagText}]}>
              Remembered: {message.memoryTags.join(', ')}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isUser && (
        <View style={styles.userAvatarContainer}>
          <View style={[styles.userAvatar, {backgroundColor: theme.surface}]}>
            <CustomIcon name="user" size={16} color={theme.primary} />
          </View>
        </View>
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: spacing.messageMargin,
    paddingHorizontal: spacing.md,
    alignItems: 'flex-end',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  aiContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: spacing.radiusLg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.messagePadding,
  },
  userBubble: {
    marginLeft: 'auto',
  },
  aiBubble: {
    borderBottomLeftRadius: spacing.radiusXs,
  },
  userBubbleContent: {
    borderRadius: spacing.radiusLg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.messagePadding,
  },
  aiBubbleContent: {
    borderRadius: spacing.radiusLg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.messagePadding,
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '100%',
  },
  userText: {
    ...typography.body,
    fontWeight: '500',
    lineHeight: 22,
    borderLeftWidth: 3,
    borderLeftColor: '#2E2E2C',
    paddingLeft: spacing.sm,
    marginLeft: -spacing.sm,
  },
  aiText: {
    ...typography.body,
    lineHeight: 22,
    flex: 1,
    flexWrap: 'wrap',
    borderLeftWidth: 3,
    borderLeftColor: '#E5E5E5',
    paddingLeft: spacing.sm,
    marginLeft: -spacing.sm,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  dot1: {
    // Animation delay handled by Animated API
  },
  dot2: {
    // Animation delay handled by Animated API
  },
  dot3: {
    // Animation delay handled by Animated API
  },
  memoryTagContainer: {
    marginTop: spacing.sm,
    marginLeft: 48,
  },
  memoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.radiusSm,
    borderWidth: 1,
  },
  memoryTagText: {
    ...typography.caption,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
  userAvatarContainer: {
    marginLeft: spacing.sm,
    marginBottom: spacing.xs,
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
});

export default MessageBubble;
