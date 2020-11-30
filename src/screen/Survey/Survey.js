import React, { useState, useRef, useEffect } from 'react';
import SurveyMonkey from 'react-native-survey-monkey';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '/state/surveys';
import api from '/api';
import Alert from '/overlay/Alert';
import FullScreenSpinner from '/partial/FullScreenSpinner';

const Survey = () => {
  const { hash, onComplete } = useSelector((state) => state.surveys);
  const surveyRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hash) return;

    if (!surveyRef) {
      Alert.error(api.userMessages.survey.cannotShow);
    } else {
      // Showing the loader because the SurveyMonkey component can take a really long
      // time to show itself. It seems really undeterministic, even though showing the
      // loader when the survey shows immediately is a bit jarring... I think this is best
      setLoading(true);
      surveyRef.current.showSurveyMonkey(hash);
    }
  }, [hash]);

  const handleEndSurvey = (data) => {
    // Clear the current survey when the
    dispatch(actions.setSurvey(null));
    setLoading(false);
    if (!data.error && onComplete) {
      onComplete();
    }
  };

  return (
    <>
      <FullScreenSpinner visible={loading} />
      <SurveyMonkey
        key={hash || 'empty'}
        ref={surveyRef}
        onRespondentDidEndSurvey={handleEndSurvey}
      />
    </>
  );
};

export default Survey;
