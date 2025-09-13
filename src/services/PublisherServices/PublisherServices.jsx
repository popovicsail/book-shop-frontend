import axiosService from '../axiosService'

export const getAllPublishers = async () => {
  const response = await axiosService.get('/publishers');
  return response.data;
};