import * as LocalAuthentication from 'expo-local-authentication';
import { Alert, Button, View } from 'react-native';

export default function FingerprintAuth() {

  const authenticate = async () => {
    // Check if device supports biometrics
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert('Error', 'Biometric hardware not supported');
      return;
    }

    // Check if fingerprints are enrolled
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert('Error', 'No fingerprints enrolled');
      return;
    }

    // Authenticate
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with fingerprint',
      fallbackLabel: 'Use PIN',
    });

    if (result.success) {
      Alert.alert('Success', 'Authenticated successfully');
    } else {
      Alert.alert('Failed', 'Authentication failed');
    }
  };

  return (
    <View style={{height:300}}>
      <Button title="Login with Fingerprint" onPress={authenticate} />
    </View>
  );
}
