import express from 'express';
import { Book } from './models/bookModel.js';

const router = express.Router();


// Route for save a new Book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields : title,authour,publishYear'
            });
        }

        // Asynchronous operation (saving the book to the database)
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({
            message: 'error.massage'
        });
    }
});

// Route the Get all books frm database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route the Get all books frm database by id
router.get('/:_id', async (request, response) => {
    try {

        const { _id } = request.params;

        const book = await Book.find({ _id });

        return response.status(200).json(book);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route for update a Book
router.put('/:_id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields : title,authour,publishYear'
            });
        }

        const { _id } = request.params;

        const result = await Book.findByIdAndUpdate(_id, request.body);

        if (!result) {
            return response.status(400).json({ message: 'Book not found' });
        }
        else {
            return response.status(200).send({ message: 'Book update successfully' });
        }
    }

    catch (error) {
        console.log(error.massage);
        response.status(500).send({ message: error.massage });
    }
});

// Route for delete a book
router.delete('/:_id', async (request, response) => {
    try {
        const { _id } = request.params;

        const result = await Book.findByIdAndDelete(_id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        else {
            return response.status(200).send({ message: 'Book delete successfully' });
        }

    }
    catch (error) {
        console.error(error);
        response.status(500).send({ message: error.message });
    }
});


export default router;