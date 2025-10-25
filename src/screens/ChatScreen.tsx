import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useChatStore} from '../store/chatStore';
import {useAuthStore} from '../store/authStore';
import MessageBubble from '../components/MessageBubble';
import EnhancedMessageInput from '../components/EnhancedMessageInput';
import BottomSheet from '../components/BottomSheet';
import SVGDecorations from '../components/SVGDecorations';
import {
  GeometricWarmBackground,
  OrganicNatureBackground,
  ModernArchitecturalBackground,
  FlowingOrganicBackground,
  BotanicalNatureBackground,
} from '../components/ArtisticBackgrounds';
import {
  GeometricWarmIcon,
  OrganicNatureIcon,
  ModernArchitecturalIcon,
  FlowingOrganicIcon,
  BotanicalNatureIcon,
} from '../components/ArtisticIcons';

const {width, height} = Dimensions.get('window');

const ChatScreen: React.FC = () => {
  const {
    messages,
    isTyping,
    currentStreamingMessage,
    sendMessage,
    stopGeneration,
  } = useChatStore();
  const {logout} = useAuthStore();
  const flatListRef = useRef<FlatList>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(0);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 100);
    }
  }, [messages.length, currentStreamingMessage]);

  const handleSendMessage = (text: string) => {
    sendMessage(text);
  };

  const handleStopGeneration = () => {
    stopGeneration();
  };

  const handleLogout = () => {
    logout();
  };

  const cycleBackground = () => {
    setCurrentBackground(prev => (prev + 1) % 5);
  };

  const renderArtisticBackground = () => {
    const backgrounds = [
      <GeometricWarmBackground key="geometric" opacity={0.15} />,
      <OrganicNatureBackground key="organic" opacity={0.15} />,
      <ModernArchitecturalBackground key="architectural" opacity={0.15} />,
      <FlowingOrganicBackground key="flowing" opacity={0.15} />,
      <BotanicalNatureBackground key="botanical" opacity={0.15} />,
    ];
    return backgrounds[currentBackground];
  };

  const renderMessage = ({item, index}: {item: any; index: number}) => {
    const isLastMessage = index === messages.length - 1;
    const isStreaming =
      isLastMessage && currentStreamingMessage?.id === item.id;

    return <MessageBubble message={item} isStreaming={isStreaming} />;
  };

  const renderStreamingMessage = () => {
    if (currentStreamingMessage) {
      return (
        <MessageBubble message={currentStreamingMessage} isStreaming={true} />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <SVGDecorations />
      {renderArtisticBackground()}

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}>
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
              <View style={styles.headerRight}>
                <TouchableOpacity
                  onPress={cycleBackground}
                  style={styles.artisticButton}>
                  {currentBackground === 0 && (
                    <GeometricWarmIcon size={20} color="#D4A574" />
                  )}
                  {currentBackground === 1 && (
                    <OrganicNatureIcon size={20} color="#90EE90" />
                  )}
                  {currentBackground === 2 && (
                    <ModernArchitecturalIcon size={20} color="#708090" />
                  )}
                  {currentBackground === 3 && (
                    <FlowingOrganicIcon size={20} color="#FFB6C1" />
                  )}
                  {currentBackground === 4 && (
                    <BotanicalNatureIcon size={20} color="#8FBC8F" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleLogout}
                  style={styles.settingsButton}>
                  <Text style={styles.settingsIcon}>⚙</Text>
                </TouchableOpacity>
              </View>
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
              data={messages}
              renderItem={renderMessage}
              keyExtractor={item => item.id}
              style={styles.messagesList}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <View style={styles.emptyAvatar}>
                    <Text style={styles.emptyAvatarText}>💬</Text>
                  </View>
                  <Text style={styles.emptyTitle}>Start a conversation</Text>
                  <Text style={styles.emptySubtitle}>
                    Ask me anything or just say hello!
                  </Text>
                </View>
              }
            />
            {renderStreamingMessage()}
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
              onPress={() => setShowBottomSheet(true)}>
              <Text style={styles.inputPlaceholder}>Type your message...</Text>
              <View style={styles.sendButton}>
                <Text style={styles.sendIcon}>→</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Enhanced Bottom Sheet */}
      <BottomSheet
        visible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}>
        <EnhancedMessageInput
          onSendMessage={text => {
            handleSendMessage(text);
            setShowBottomSheet(false);
          }}
          disabled={isTyping}
          isGenerating={isTyping}
          onStopGeneration={handleStopGeneration}
        />
      </BottomSheet>
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
  keyboardView: {
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  artisticButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDECE3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4A574',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDECE3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 18,
    color: '#4F4D4C',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
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
  emptyAvatarText: {
    fontSize: 32,
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
  },
  inputTrigger: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  inputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBFAF0',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    marginLeft: 12,
  },
  sendIcon: {
    color: '#FAF9EF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ChatScreen;
