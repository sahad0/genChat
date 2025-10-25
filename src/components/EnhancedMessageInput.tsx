import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Animated,
  Text,
} from 'react-native';

interface EnhancedMessageInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
  isGenerating?: boolean;
  onStopGeneration?: () => void;
}

const EnhancedMessageInput: React.FC<EnhancedMessageInputProps> = ({
  onSendMessage,
  disabled = false,
  isGenerating = false,
  onStopGeneration,
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleSend = () => {
    if (message.trim() && !disabled && !isGenerating) {
      onSendMessage(message.trim());
      setMessage('');
      Keyboard.dismiss();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(scaleAnim, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleKeyPress = (event: any) => {
    if (event.nativeEvent.key === 'Enter' && !event.nativeEvent.shiftKey) {
      handleSend();
    }
  };

  const isSendDisabled = !message.trim() || disabled || isGenerating;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputWrapper,
            {
              borderColor: isFocused ? '#2E2E2C' : '#EDECE3',
            },
          ]}>
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            placeholder="Type your message..."
            placeholderTextColor="#5D5C5B"
            value={message}
            onChangeText={setMessage}
            onFocus={handleFocus}
            onBlur={handleBlur}
            multiline
            maxLength={500}
            editable={!disabled && !isGenerating}
            onKeyPress={handleKeyPress}
          />

          {isGenerating ? (
            <TouchableOpacity
              style={styles.stopButton}
              onPress={onStopGeneration}
              activeOpacity={0.8}>
              <Text style={styles.stopButtonText}>⏹</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.sendButton,
                isSendDisabled && styles.sendButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={isSendDisabled}
              activeOpacity={0.8}>
              <Text style={styles.sendButtonText}>→</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FBFAF0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FAF9EF',
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginRight: 12,
    minHeight: 56,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#2E2E2C',
    fontWeight: '400',
    maxHeight: 100,
    minHeight: 24,
    paddingVertical: 0,
    textAlignVertical: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2E2E2C',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#EDECE3',
  },
  sendButtonText: {
    color: '#FAF9EF',
    fontSize: 18,
    fontWeight: '600',
  },
  stopButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5D5C5B',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  stopButtonText: {
    color: '#FAF9EF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EnhancedMessageInput;
