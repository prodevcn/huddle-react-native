import { useState } from 'react';

// useItemUpload - A helper hook to isolate the image upload logic
export default (defaultUploads = []) => {
  const newUploads = defaultUploads.filter((upload) => upload.newImage);
  const [docs, setDocs] = useState(defaultUploads);
  const [newDocs, setNewDocs] = useState(newUploads);
  const [docsToRemove, setDocsToRemove] = useState([]);

  const addDoc = (image) => {
    setDocs([
      image,
      ...docs,
    ]);
    setNewDocs([
      image,
      ...newDocs,
    ]);
  };

  const removeDoc = (index, docUniqueName, uploadId) => {
    setDocs([
      ...docs.slice(0, index),
      ...docs.slice(index + 1, docs.length),
    ]);

    // Did we remove a doc that already exists on the server?
    if (docUniqueName) {
      setDocsToRemove([
        docUniqueName,
        ...docsToRemove,
      ]);
    }

    // Did we remove a file that hasn't been uploaded yet?
    if (uploadId) {
      setNewDocs(newDocs.filter((image) => image.uploadId !== uploadId));
    }
  };

  return {
    docs,
    addDoc,
    removeDoc,
    newDocs,
    docsToRemove,
  };
};
