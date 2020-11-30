import Url from 'url-parse';

import { actions } from '/state/surveys';
import { store } from '/state/store';

export default (navigation, URL) => {
  const parsed = new Url(URL, true);
  const surveyHash = parsed.pathname.replace(/\//g, '');

  store.dispatch(actions.setSurvey(surveyHash));
};
