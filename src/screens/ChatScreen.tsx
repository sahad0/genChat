import React, {useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useChatStore} from '../store/chatStore';
import {useAuthStore} from '../store/authStore';
import MessageBubble from '../components/MessageBubble';
import SVGDecorations from '../components/SVGDecorations';
import CustomIcon from '../components/CustomIcon';
import {spacing} from '../theme';

interface ChatScreenProps {
  navigation: any;
}

const ChatScreen: React.FC<ChatScreenProps> = ({navigation}) => {
  const {messages, isTyping, currentStreamingMessage} = useChatStore();
  const {logout} = useAuthStore();
  const flatListRef = useRef<FlatList>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Combine messages with streaming message for FlatList
  const allMessages = currentStreamingMessage
    ? [...messages, currentStreamingMessage]
    : messages;

  useEffect(() => {
    // Animate in on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-scroll to bottom when new messages arrive
    if (allMessages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 100);
    }
  }, [allMessages.length, fadeAnim, slideAnim]);

  // Auto-scroll during streaming
  useEffect(() => {
    if (currentStreamingMessage) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 50);
    }
  }, [currentStreamingMessage?.text]);

  const handleOpenMessageInput = () => {
    navigation.navigate('MessageInput');
  };

  const handleSuggestionPress = (suggestion: string) => {
    navigation.navigate('MessageInput', {prefilledText: suggestion});
  };

  const handleLogout = () => {
    logout();
  };

  const renderMessage = ({item, index}: {item: any; index: number}) => {
    const isStreaming = item.isStreaming || false;
    return <MessageBubble message={item} isStreaming={isStreaming} />;
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <SVGDecorations />

      <SafeAreaView style={styles.safeArea}>
        {/* Artistic Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.headerAvatar}>
                <Text style={styles.avatarText}>AI</Text>
              </View>
              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>AiRA</Text>
                <Text style={styles.headerSubtitle}>
                  {isTyping ? 'Thinking...' : 'Your AI companion'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.settingsButton}>
              <CustomIcon name="settings" size={20} color="#5D5C5B" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Messages List */}
        <Animated.View
          style={[
            styles.messagesContainer,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <FlatList
            ref={flatListRef}
            data={allMessages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => {
              if (currentStreamingMessage) {
                setTimeout(() => {
                  flatListRef.current?.scrollToEnd({animated: true});
                }, 50);
              }
            }}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <View style={styles.emptyAvatar}>
                  <CustomIcon name="robot" size={48} color="#2E2E2C" />
                </View>
                <Text style={styles.emptyTitle}>Welcome to AiRA</Text>
                <Text style={styles.emptySubtitle}>
                  Your AI companion is ready to help. Start by saying "hi" or
                  ask me anything!
                </Text>
                <View style={styles.suggestionChips}>
                  <TouchableOpacity
                    style={styles.suggestionChip}
                    onPress={() => handleSuggestionPress('hi')}>
                    <Text style={styles.suggestionText}>Say hello</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.suggestionChip}
                    onPress={() => handleSuggestionPress('Get help')}>
                    <Text style={styles.suggestionText}>Get help</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.suggestionChip}
                    onPress={() =>
                      handleSuggestionPress('Tell me about startups')
                    }>
                    <Text style={styles.suggestionText}>
                      Tell me about startups
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
        </Animated.View>

        {/* Artistic Input Trigger */}
        <Animated.View
          style={[
            styles.inputTrigger,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <TouchableOpacity
            style={styles.inputButton}
            onPress={handleOpenMessageInput}>
            <Text style={styles.inputPlaceholder}>Type your message...</Text>
            <View style={styles.sendButton}>
              <Text style={styles.sendIcon}>→</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9EF',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(251, 250, 240, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#EDECE3',
    paddingHorizontal: 24,
    paddingVertical: 20,
    shadowColor: '#2E2E2C',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
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
  headerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2E2E2C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#2E2E2C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    color: '#FAF9EF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E2E2C',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#5D5C5B',
    marginTop: 2,
    fontWeight: '400',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDECE3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl + 100, // Much more space for streaming text
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FBFAF0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EDECE3',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2E2E2C',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#5D5C5B',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
    marginBottom: spacing.lg,
  },
  suggestionChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  suggestionChip: {
    backgroundColor: '#F0EFE8',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.radiusFull,
    borderWidth: 1,
    borderColor: '#E2E2DA',
    marginHorizontal: spacing.xs,
    marginVertical: spacing.xs,
  },
  suggestionText: {
    fontSize: 14,
    color: '#4F4D4C',
    fontWeight: '500',
  },
  inputTrigger: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  inputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBFAF0',
    borderRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: '#EDECE3',
    shadowColor: '#2E2E2C',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#5D5C5B',
    fontWeight: '400',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2E2E2C',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  sendIcon: {
    color: '#FAF9EF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ChatScreen;
