import axiosService from '../axiosService'

export const getAuthors = async () => {
  const response = await axiosService.get('/authors')
  return response.data;
}

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