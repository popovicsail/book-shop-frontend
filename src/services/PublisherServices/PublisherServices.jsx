import axiosService from '../axiosService'

export const getAllPublishers = async (orderBy) => {
  const response = await axiosService.get('/publishers', {
    params: {
      orderBy: orderBy
    }
  });
  return response.data;
};