const Note = require('../models/note');
const helper = require('./test_helper');


beforeEach(async () => {
    await Note.deleteMany({});
    for (let note of helper.initialNotes) {
        let noteObject = new Note(note);
        await noteObject.save();
    }
});

describe('get all notes', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all notes are returned', async () => {
        const response = await api.get('/api/notes');

        expect(response.body).toHaveLength(helper.initialNotes.length);
    });

    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes');

        const contents = response.body.map(r => r.content);

        expect(contents).toContain(helper.initialNotes[1].content);
    });
});

describe('create a note', () => {
    test('a valid note can be added', async () => {
        const newNote = {
            content: 'async/await simplifies making async calls',
            important: true,
            date: new Date()
        };

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const notes = await helper.notesInDb();

        const contents = notes.map(n => n.content);

        expect(notes).toHaveLength(helper.initialNotes.length+1);
        expect(contents).toContain(newNote.content);
    });

    test('note without content is not added', async () => {
        const newNote = {
            important: true,
            date: new Date()
        };

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400);

        const notes = await helper.notesInDb();

        expect(notes).toHaveLength(helper.initialNotes.length);
    });
});

describe('get a note', () => {
    test('a specific note can be viewed', async () => {
        const notesAtStart = await helper.notesInDb();

        const noteToView = notesAtStart[0];

        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        chaiExpect(resultNote.body).excluding('date').to.deep.equal(noteToView);
    });
});

describe('delete a note', () => {
    test('a note can be deleted', async () => {
        const notesAtStart = await helper.notesInDb();
        const noteToDelete = notesAtStart[0];

        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204);

        const notesAtEnd = await helper.notesInDb();

        expect(notesAtEnd).toHaveLength(
            helper.initialNotes.length - 1
        );

        const contents = notesAtEnd.map(r => r.content);

        expect(contents).not.toContain(noteToDelete.content);
    });
});

afterAll(() => {
    mongoose.connection.close();
});