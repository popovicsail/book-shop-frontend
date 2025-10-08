import axiosService from '../axiosService'

export const getAuthorsPaged = async (pageNumber, pageSize, orderBy) => {
  const response = await axiosService.get('/authors', {
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy
    }
  });
  return response.data;
};