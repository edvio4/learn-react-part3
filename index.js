require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/note');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

const errorHandler = (error, request, response, next) => {
    console.log(JSON.stringify(error.reason));

    if (error.name === 'CastError' && error.path === '_id') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error);
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response, next) => {
    Note.find({})
        .then(notes => {
            response.json(notes);
        })
        .catch(next);
});

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            response.json(note);
        })
        .catch(next);
});

app.use(errorHandler);

app.post('/api/notes', (request, response, next) => {
    const body = request.body;

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        });
    }

    const note = new Note({
        content: body.content,
        date: new Date(),
        important: body.important,
    });

    note.save()
        .then(savedNote => {
            response.json(savedNote);
        })
        .catch(next);;
});

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body;

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(request.params.id, note, {new: true})
        .then(updatedNote => {
            response.json(updatedNote);
        })
        .catch(next);

});

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
        .then(() => response.status(204).end())
        .catch(next);

});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
