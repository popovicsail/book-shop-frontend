import axiosService from '../axiosService'

export const getAllBooks = async () => {
  const response = await axiosService.get('/books');
  return response.data;
};

export const getBookById = async (id) => {
  const response = await axiosService.get(`/books/${id}`);
  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await axiosService.put(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axiosService.delete(`/books/${id}`);
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await axiosService.post(`/books`, bookData);
  return response.data;
};