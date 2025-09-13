import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const emptyBookFormValues = {
  id: '1', //Iz nekog razloga, ovde moram da stavim neki random value da bih mogao da posaljem http post zahtev
  title: '',
  pageCount: '',
  publishedDate: '',
  isbn: '',
  authorId: '',
  publisherId: ''
};

const BookForm = ({ onBookSubmit, bookToEdit }) => {

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: bookToEdit || emptyBookFormValues
  });

  useEffect(() => {
    if (bookToEdit) {
      reset(bookToEdit);
    } else {
      reset(emptyBookFormValues);
    }
  }, [bookToEdit, reset]);

  const onSubmit = (data) => {
    onBookSubmit(data)
    reset()
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit(onSubmit)}>

      <input type="hidden" {...register('id')} />

      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          {...register('title')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="pageCount">PageCount:</label>
        <input
          type="number"
          id="pageCount"
          name="pageCount"
          {...register('pageCount')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="publishedDate">Date:</label>
        <input
          type="date"
          id="publishedDate"
          name="publishedDate"
          {...register('publishedDate')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="number"
          id="isbn"
          name="isbn"
          {...register('isbn')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="authorId">AuthorId:</label>
        <input
          type="number"
          id="authorId"
          name="authorId"
          {...register('authorId')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="publisherId">PublisherId:</label>
        <input
          type="text"
          id="publisherId"
          name="publisherId"
          {...register('publisherId')}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default BookForm