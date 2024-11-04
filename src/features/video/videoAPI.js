import axios from "../../utils/axios";
export const getVideo = async (videoId) => {
  const response = await axios.get(`/videos/${videoId}`);

  return response.data;
};
