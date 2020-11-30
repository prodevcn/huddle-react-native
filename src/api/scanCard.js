import api from '/api/index';

export default async (userId, imageData) => {
  try {
    const response = await api.tool.scanning({
      data: imageData.base64,
      userId,
    });

    return response.scanImageInfo;
  } catch (error) {
    throw new Error(error);
  }
};
