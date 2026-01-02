import * as LocalAuthentication from 'expo-local-authentication';

export const checkBiometrics = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  return hasHardware && isEnrolled;
};
export const authenticate = async () => {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Unlock with fingerprint',
    fallbackLabel: 'Use PIN',
  });

  return result.success;
};
