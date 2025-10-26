import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import * as Animatable from 'react-native-animatable';

import {useMemoryStore} from '../store/memoryStore';
import {useAuthStore} from '../store/authStore';
import MemoryCard from '../components/MemoryCard';
import {useTheme} from '../context/ThemeContext';
import {typography, spacing, shadows} from '../theme';
import {Memory} from '../types';
import {
  GeometricWarmBackground,
  OrganicNatureBackground,
  ModernArchitecturalBackground,
  FlowingOrganicBackground,
  BotanicalNatureBackground,
} from '../components/ArtisticBackgrounds';

const MemoryScreen: React.FC = () => {
  const {theme} = useTheme();
  const {memories, categories, getMemoriesByCategory} = useMemoryStore();
  const {logout} = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentBackground, setCurrentBackground] = useState(2); // Start with architectural theme

  const handleLogout = () => {
    logout();
  };

  const renderArtisticBackground = () => {
    const backgrounds = [
      <GeometricWarmBackground key="geometric" opacity={0.1} />,
      <OrganicNatureBackground key="organic" opacity={0.1} />,
      <ModernArchitecturalBackground key="architectural" opacity={0.1} />,
      <FlowingOrganicBackground key="flowing" opacity={0.1} />,
      <BotanicalNatureBackground key="botanical" opacity={0.1} />,
    ];
    return backgrounds[currentBackground];
  };

  const filteredMemories =
    selectedCategory === 'All'
      ? memories
      : getMemoriesByCategory(selectedCategory);

  const renderMemory = ({item}: {item: Memory}) => <MemoryCard memory={item} />;

  const renderCategoryFilter = () => (
    <View style={styles.categoryContainer}>
      <FlatList
        data={['All', ...categories]}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              {
                backgroundColor: theme.surfaceElevated,
                borderColor: theme.border,
              },
              selectedCategory === item && {
                backgroundColor: theme.primary,
                borderColor: theme.primary,
              },
            ]}
            onPress={() => setSelectedCategory(item)}>
            <Text
              style={[
                styles.categoryText,
                {color: theme.textSecondary},
                selectedCategory === item && {color: '#ffffff'},
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        contentContainerStyle={styles.categoryContent}
      />
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      {renderArtisticBackground()}
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Animatable.View
          animation="fadeInDown"
          duration={600}
          delay={0}
          style={[
            styles.header,
            {backgroundColor: theme.surface, borderBottomColor: theme.border},
          ]}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View
                style={[styles.headerIcon, {backgroundColor: theme.primary}]}>
                <CustomIcon name="brain" size={20} color="#ffffff" />
              </View>
              <View style={styles.headerText}>
                <Text style={[styles.headerTitle, {color: theme.text}]}>
                  Memory Panel
                </Text>
                <Text
                  style={[styles.headerSubtitle, {color: theme.textSecondary}]}>
                  {memories.length} memories stored
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              style={[
                styles.logoutButton,
                {backgroundColor: theme.surfaceElevated},
              ]}>
              <Text style={[styles.logoutButtonText, {color: theme.text}]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Category Filter */}
        <Animatable.View animation="fadeInDown" duration={600} delay={100}>
          {renderCategoryFilter()}
        </Animatable.View>

        {/* Memories List */}
        <Animatable.View
          animation="fadeInDown"
          duration={600}
          delay={200}
          style={styles.memoriesContainer}>
          {filteredMemories.length > 0 ? (
            <FlatList
              data={filteredMemories}
              renderItem={renderMemory}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.memoriesContent}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <View
                style={[styles.emptyIcon, {backgroundColor: theme.primary}]}>
                <CustomIcon name="brain" size={32} color="#ffffff" />
              </View>
              <Text style={[styles.emptyTitle, {color: theme.text}]}>
                No memories yet
              </Text>
              <Text
                style={[styles.emptySubtitle, {color: theme.textSecondary}]}>
                Start chatting to build your memory profile
              </Text>
            </View>
          )}
        </Animatable.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#EDECE3',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: '#EDECE3',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    ...typography.h4,
    fontWeight: '700',
  },
  headerSubtitle: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  logoutButton: {
    padding: spacing.sm,
    borderRadius: spacing.radiusSm,
    borderWidth: 1,
    borderColor: '#EDECE3',
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  categoryContainer: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryContent: {
    paddingHorizontal: spacing.md,
  },
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.radiusXl,
    borderWidth: 1,
    marginRight: spacing.sm,
  },
  categoryText: {
    ...typography.label,
    fontWeight: '500',
  },
  memoriesContainer: {
    flex: 1,
  },
  memoriesContent: {
    padding: spacing.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#EDECE3',
  },
  emptyTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default MemoryScreen;
