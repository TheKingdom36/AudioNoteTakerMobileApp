import PermissionsAndroid, {
  requestMultiple,
  PERMISSIONS,
} from 'react-native-permissions';

export function RequestRecordPermissions() {
  //Android need runtime permission to record audio https://github.com/hyochan/react-native-audio-recorder-player#android-1
  if (Platform.OS === 'android') {
    try {
      const grants = requestMultiple(
        Platform.OS === 'ios'
          ? [PERMISSIONS.IOS.CAMERA]
          : [
              PERMISSIONS.ANDROID.RECORD_AUDIO,
              PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
              PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            ],
      ).then(result => {
        console.log('permission', result);
      });

      console.log('write external stroage', grants);

      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PERMISSIONS.ANDROID.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PERMISSIONS.ANDROID.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PERMISSIONS.ANDROID.GRANTED
      ) {
        console.log('Permissions granted');
      } else {
        console.log('All required permissions not granted');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
}
