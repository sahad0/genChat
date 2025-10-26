import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EnhancedMessageInput from '../components/EnhancedMessageInput';
import {useChatStore} from '../store/chatStore';

interface MessageInputScreenProps {
  navigation: any;
  route: any;
}

const MessageInputScreen: React.FC<MessageInputScreenProps> = ({
  navigation,
  route,
}) => {
  const {sendMessage, isTyping, stopGeneration} = useChatStore();
  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const screenHeight = Dimensions.get('window').height;
  const prefilledText = route.params?.prefilledText || '';

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const handleSendMessage = (text: string) => {
    sendMessage(text);
    navigation.goBack();
  };

  const handleStopGeneration = () => {
    stopGeneration();
  };

  // Calculate modal height based on keyboard
  const modalHeight =
    keyboardHeight > 0
      ? screenHeight - keyboardHeight - insets.bottom + 30 // Add extra 20px buffer
      : screenHeight * 0.5;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => navigation.goBack()}
      />
      <View style={[styles.modal, {height: modalHeight}]}>
        <SafeAreaView style={styles.safeArea}>
          <View style={[styles.content, {paddingBottom: 24 + insets.bottom}]}>
            <EnhancedMessageInput
              onSendMessage={handleSendMessage}
              disabled={isTyping}
              isGenerating={isTyping}
              onStopGeneration={handleStopGeneration}
              autoFocus={true}
              initialText={prefilledText}
            />
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  modal: {
    width: '100%',
    backgroundColor: '#FBFAF0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: '#EDECE3',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
});

export default MessageInputScreen;
