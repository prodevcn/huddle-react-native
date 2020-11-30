import RNFS from 'react-native-fs';

const documentDir = RNFS.DocumentDirectoryPath;

const directories = {
  thumbnails: `${documentDir}/thumbnails`,
  cache: `${documentDir}/cache`,
};

export default {
  directories,
};
