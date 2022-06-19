import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../../model/book';

const booksRouter = new Router();

booksRouter.post('/', async (req, res, next) => {
  try {
    const { name, gender, synopsis } = req.body;

    const create = await Book.create({
      id: uuidv4(),
      name,
      gender,
      synopsis,
      createdAt: new Date(),
    })

    console.log(create)

    return res.status(200).json('Book is sussefuly created.');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

booksRouter.get('/', async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

booksRouter.put('/', async (req, res) => {
  try {
    const { name, gender, synopsis } = req.body;
    const { bookId } = req.query;

    if(!bookId){
      return res.status(500).json('The bookId is required to edit a book data.')
    }

    const update = await Book.update({
      name,
      gender,
      synopsis,
      updateAt: new Date()
    }, { where: {id: bookId}})

    console.log(update)

    return res.status(200).json('Book is sussefuly updated.');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

booksRouter.delete('/', async (req, res) => {
  try {
    const { bookId } = req.query;

    if(!bookId){
      return res.status(500).json('The bookId is required to delete a book.')
    }

    const data = await Book.destroy({ where: {id: bookId}})

    return res.status(200).json('Book is sussefuly deleted.');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

export { booksRouter };
