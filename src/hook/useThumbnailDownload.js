import { useState } from 'react';

import api from '/api';
import { thumbnailsHelper } from '/util';

const useThumbnailDownload = (thumbnailDocUniqueName) => {
  const [tempUri, setTempUri] = useState(null);
  const [thumbnailFetchFailed, setThumbnailFetchFailed] = useState(false);

  const fetchThumbnail = async () => {
    if (thumbnailDocUniqueName && !tempUri) {
      try {
        await api.document.fetchThumbnail(thumbnailDocUniqueName);
        const path = thumbnailsHelper.getPath(thumbnailDocUniqueName);
        // Set the tempUri to refresh the list item after we download the thumbnail
        setTempUri(path);
      } catch (e) {
        setThumbnailFetchFailed(true);
      }
    } else {
      setThumbnailFetchFailed(true);
    }
  };


  return {
    tempThumbnailUri: tempUri,
    thumbnailFetchFailed,
    fetchThumbnail,
  };
};

export default useThumbnailDownload;
