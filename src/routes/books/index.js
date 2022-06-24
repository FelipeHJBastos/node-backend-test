import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../../model/book';
import { RentedBooks } from '../../model/rentedBooks';

const booksRouter = new Router();

booksRouter.post('/', async (req, res, next) => {
  try {
    const { name, gender, synopsis } = req.body;

    await Book.create({
      id: uuidv4(),
      name,
      gender,
      synopsis
    })

    return res.status(200).json('Book is sussefuly created.');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

booksRouter.get('/', async (req, res) => {
  try {
    const books = await Book.findAndCountAll({ attributes: ['id', 'name'] });

    return res.status(200).json(books)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

booksRouter.get('/detail', async (req, res) => {
  try {
    const { bookId } = req.query;

    //Book verification
    const book = await Book.findOne({ where: { id: bookId } });
    if (!book)
      return res.status(401).json({ message: 'Book not exist.' })

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

booksRouter.put('/', async (req, res) => {
  try {
    const { name, gender, synopsis } = req.body;
    const { bookId } = req.query;

    if (!bookId) {
      return res.status(500).json('The bookId is required to edit a book data.')
    }

    //Book verification
    const book = await Book.findOne({ where: { id: bookId } });
    if (!book)
      return res.status(401).json({ message: 'Book not exist.' })

    //Verification if book is already rented
    const rentedBooks = await RentedBooks.findAll({ where: { bookId } });
    if (rentedBooks.length > 0)
      return res.status(401).json({ message: 'It is not possible edit books who are rented.' })

    const update = await Book.update({
      name,
      gender,
      synopsis,
      updateAt: new Date()
    }, { where: { id: bookId } })

    return res.status(200).json('Book is sussefuly updated.');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

booksRouter.delete('/', async (req, res) => {
  try {
    const { bookId } = req.query;

    if (!bookId) {
      return res.status(500).json('The bookId is required to delete a book.')
    }

    //Book verification
    const book = await Book.findOne({ where: { id: bookId } });
    if (!book)
      return res.status(401).json({ message: 'Book not exist.' })

    //Verification if book is already rented
    const rentedBooks = await RentedBooks.findAll({ where: { bookId } });
    if (rentedBooks.length > 0)
      return res.status(401).json({ message: 'It is not possible edit delete who are rented.' })

    await Book.destroy({ where: { id: bookId } })

    return res.status(200).json('Book is sussefuly deleted.');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

export { booksRouter };
