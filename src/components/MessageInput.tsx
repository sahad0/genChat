import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import CustomIcon from './CustomIcon';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {useTheme} from '../context/ThemeContext';
import {typography, spacing, shadows} from '../theme';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const {theme} = useTheme();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.nativeEvent.key === 'Enter' && !event.nativeEvent.shiftKey) {
      handleSend();
    }
  };

  const isSendDisabled = !message.trim() || disabled;

  return (
    <Animatable.View
      animation="slideInUp"
      duration={300}
      style={[
        styles.container,
        {backgroundColor: theme.surface, borderTopColor: theme.border},
      ]}>
      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputWrapper,
            {backgroundColor: theme.surfaceElevated, borderColor: theme.border},
          ]}>
          <TextInput
            style={[styles.textInput, {color: theme.text}]}
            placeholder="Type a message..."
            placeholderTextColor={theme.textTertiary}
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
            editable={!disabled}
            onKeyPress={handleKeyPress}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              isSendDisabled && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={isSendDisabled}>
            <LinearGradient
              colors={
                isSendDisabled
                  ? [theme.border, theme.textTertiary]
                  : [theme.primary, theme.primaryLight]
              }
              style={styles.sendButtonGradient}>
              <CustomIcon name="send" size={20} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    ...shadows.light,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: spacing.radiusXl,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    ...shadows.input,
  },
  textInput: {
    flex: 1,
    ...typography.body,
    maxHeight: 100,
    minHeight: 20,
    paddingVertical: spacing.sm,
  },
  sendButton: {
    borderRadius: spacing.radiusXl,
    ...shadows.medium,
  },
  sendButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: spacing.radiusXl,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageInput;
