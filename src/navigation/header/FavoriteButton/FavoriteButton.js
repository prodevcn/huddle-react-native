// This FavoriteButton can be mounted in the header and will live update a
// an the item is (un)favorited. This lets us update the button without
// needing to implicitly update the header
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '/navigation/header/HeaderButton';
import Alert from '/overlay/Alert';
import { clickHandler } from '/util/offlineMode';

import { selectors, actions } from '/state/folders';
import api from '/api';

const FavoriteButton = ({ itemId, right }) => {
  const dispatch = useDispatch();

  const favorites = useSelector(selectors.favoritesSelector);
  const isFavorite = favorites.indexOf(itemId) > -1;

  const handlePress = async () => {
    const action = isFavorite ? actions.removeFavorite : actions.addFavorite;

    try {
      await dispatch(action(itemId));
    } catch (e) {
      if (e.status === api.errorCodes.FOLDER_NOT_FOUND) {
        Alert.error(api.userMessages.folder.notFound);
      } else if (e.status === api.errorCodes.FOLDER_USER_NOT_FOUND) {
        Alert.error(api.userMessages.folder.userNotFound);
      } else {
        Alert.showGenericError();
      }
    }
  };

  return (
    <HeaderButton
      icon={isFavorite ? 'star-filled' : 'star'}
      right={right}
      onPress={clickHandler(handlePress)}
    />
  );
};

export default FavoriteButton;
