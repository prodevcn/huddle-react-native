export default (mimeType) => {
  // Figure out which icon we want to use
  let icon = 'file-o';
  if (mimeType.match(/sheet/i)) {
    icon = 'file-excel-o';
  } else if (mimeType.match(/pdf/i)) {
    icon = 'file-pdf-o';
  } else if (mimeType.match(/msdoc/i)) {
    icon = 'file-word-o';
  } else if (mimeType.match(/video/i)) {
    icon = 'file-video-o';
  } else if (mimeType.match(/audio/i)) {
    icon = 'file-audio-o';
  } else if (mimeType.match(/zip/i)) {
    icon = 'file-zip-o';
  }

  return icon;
};
