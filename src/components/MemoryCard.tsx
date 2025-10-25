import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomIcon from './CustomIcon';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import {Memory} from '../types';
import {useTheme} from '../context/ThemeContext';
import {typography, spacing, shadows} from '../theme';

interface MemoryCardProps {
  memory: Memory;
  onPress?: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({memory, onPress}) => {
  const {theme} = useTheme();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'About You':
        return [theme.info, '#1d4ed8'];
      case 'Preferences':
        return [theme.success, '#059669'];
      case 'Conversations':
        return [theme.warning, '#d97706'];
      default:
        return [theme.primary, theme.primaryDark];
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'About You':
        return 'person';
      case 'Preferences':
        return 'star';
      case 'Conversations':
        return 'chat-bubble';
      default:
        return 'brain';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={300}
      delay={Math.random() * 200}>
      <TouchableOpacity
        style={[
          styles.container,
          {backgroundColor: theme.surface, borderColor: theme.border},
        ]}
        onPress={onPress}
        activeOpacity={0.7}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.categoryText, {color: theme.textSecondary}]}>
              {memory.category}
            </Text>
            <Text style={[styles.dateText, {color: theme.textTertiary}]}>
              {formatDate(memory.date)}
            </Text>
          </View>

          <View style={styles.memoryContent}>
            <View style={styles.memoryIconContainer}>
              <CustomIcon
                name={memory.icon}
                size={16}
                color={theme.textSecondary}
              />
            </View>
            <Text style={[styles.memoryText, {color: theme.text}]}>
              {memory.text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderWidth: 1,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryText: {
    ...typography.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.0,
    fontSize: 12,
  },
  dateText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '400',
    opacity: 0.8,
  },
  memoryContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  memoryIconContainer: {
    marginTop: 2,
    opacity: 0.7,
    flexShrink: 0,
  },
  memoryText: {
    flex: 1,
    ...typography.body,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0.2,
    fontSize: 15,
  },
});

export default MemoryCard;
