import Alert from '/overlay/Alert';
import api from '/api';

export default () => {
  Alert.error(api.userMessages.offline.needConnection);
};
