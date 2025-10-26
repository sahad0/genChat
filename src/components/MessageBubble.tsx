import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomIcon from './CustomIcon';
import * as Animatable from 'react-native-animatable';
import StreamingText from './StreamingText';

import {Message} from '../types';
import {useTheme} from '../context/ThemeContext';
import {typography, spacing} from '../theme';

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
        {message.memoryTags && message.memoryTags.length > 0 && !isUser && (
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
              <Text
                style={[styles.memoryTagText, {color: theme.memoryTagText}]}>
                Remembered: {message.memoryTags.join(', ')}
              </Text>
            </TouchableOpacity>
          </View>
        )}

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
                speed={50}
              />
            ) : (
              <Text style={[styles.aiText, {color: theme.aiText}]}>
                {message.text}
              </Text>
            )}
          </View>
        )}
      </View>

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
    marginVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'flex-end',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  aiContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginRight: spacing.md,
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '100%',
  },
  aiBubbleContent: {
    borderRadius: spacing.radiusLg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.messagePadding,
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '100%',
    flex: 1,
  },
  userText: {
    ...typography.body,
    fontWeight: '500',
    lineHeight: 22,
  },
  aiText: {
    ...typography.body,
    lineHeight: 22,
    flex: 1,
    flexWrap: 'wrap',
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
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
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
    fontSize: 11,
  },
  userAvatarContainer: {
    marginLeft: spacing.md,
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
