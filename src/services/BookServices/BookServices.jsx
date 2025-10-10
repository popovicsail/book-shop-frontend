import axiosService from '../axiosService'

export const getAllBooks = async (queryParams) => {
  const response = await axiosService.get('/books', { params: queryParams })
  return response.data;
};

export const getPagedBooks = async (queryParams) => {
  const response = await axiosService.get('/books/paged', { params: queryParams }) //Lepsi nacin za params, implementiracu ovako i za ostale
  return response.data;
}

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