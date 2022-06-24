import { Router } from 'express';
import { User } from '../../model/user';
import { Book } from '../../model/book';
import { RentedBooks } from '../../model/rentedBooks';

import { v4 as uuidv4 } from 'uuid';

const rentRouter = new Router();

rentRouter.post('/', async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    //User verification
    const users = await User.findAll({ where: { id: userId } });
    if (!users)
      return res.status(401).json({ message: 'User not exist.' })

    //Book verification
    const books = await Book.findAll({ where: { id: bookId } });
    if (!books)
      return res.status(401).json({ message: 'Book not exist.' })

      //Verification if book is already rented
    const rentedBooks = await RentedBooks.findAll({ where: { bookId } });
    if (rentedBooks.length > 0)
      return res.status(401).json({ message: 'It is not possible to rent books already rented.' })

    await RentedBooks.create({
      id: uuidv4(),
      bookId,
      userId
    })

    return res.status(200).json('Book is sussefuly rented.');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

export { rentRouter };
