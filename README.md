# AudioNoteTakerMobileApp

Mobile Application which allows users to record and organise short audio notes built using React Native and Redux. 

## Features
- Record and play back audio notes
- Assign tags for easy organization
- Search created audio notes by filtering based on title, created date and tags
- Register an account to have audio notes accessible from any mobile device 


### Authtication
Users sign-in with a email/password then an access token is requested from the server to ensure no private credentials are kept on the mobile device. 

### Play/Record audio notes
For playing and recording audio the react-native-audio-recorder-player package is used. The Player component provides simple controls to play audio, audio playing cabalintioes is provided by the higher order component withAudioPlayer. Recording is performed in the newRecording.Screen which provide easy controls to record audio. 

### Audio note storage and retrivel:
Audio is stored in two parts on the server, metadata and the actual audio file.  Both metadata and audio files are reteieved using the AudioApi class. This class exposes methods to perform actions on the server such as creating new audio files and getting audio metadata. 

### Search
Searching for previosuly created audio notes is available through the listRecordings.Screen. The audio title, audio tags and date range to search can be specfied. Each audio panel can be selected for further information on the the audio note or the audio note can be played directly. 

#### Features currently being worked on:
- Ability to set reminder alerts for certain audio notes
- Transcribe audio to text and allow user to send the text to there email address
- Improving UI/UX




