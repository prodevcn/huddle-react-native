import api from '/api';
import { format } from '/util';

import {
  DISABLE_SHARED_LINKS,
  LOAD_SHARED_ITEM_SUCCESS,
  LOAD_SHARED_ITEM_FAILED,
  UPDATE_SHARED_LINK,
} from './share.types';

const fetchLinkData = (folderUniqueName) => async (dispatch) => {
  try {
    const { shareQueryItem } = await api.sharing.query(folderUniqueName);
    const linkData = shareQueryItem.map((sharedItem) => ({
      accessed: sharedItem.accessData.map((activity) => ({
        date: format.toMmmDate(activity.accessDate),
        dateRaw: activity.accessDate,
        time: format.toTime(activity.accessDate),
      })),
      created: format.toMmmDate(sharedItem.createTimestamp),
      createdRaw: format.toDate(sharedItem.createTimestamp),
      deleted: format.toMmmDate(sharedItem.deleteTimestamp),
      deletedRaw: format.toDate(sharedItem.deleteTimestamp),
      secure: sharedItem.secure,
      shareId: sharedItem.shareUniqueName,
    }));

    dispatch({
      linkData,
      type: LOAD_SHARED_ITEM_SUCCESS,
    });
  } catch (error) {
    dispatch({
      error,
      type: LOAD_SHARED_ITEM_FAILED,
    });
  }
};

const disableLinks = (shareIds) => ({
  shareIds,
  type: DISABLE_SHARED_LINKS,
});

const updateLink = (shareId, secure) => ({
  secure,
  shareId,
  type: UPDATE_SHARED_LINK,
});

export default {
  disableLinks,
  fetchLinkData,
  updateLink,
};
