import Note from './models/Note'

export default (io) => {
  io.on('connection', (socket) => {
    const emitNotes = async () => {
      const notes = await Note.find()
      io.emit('server:loadnotes', notes)
    }

    emitNotes()

    socket.on('client:newnote', async (data) => {
      const newNote = new Note(data);
      const savedNote = await newNote.save();
      io.emit('server:newnote', savedNote)
    });

    socket.on('client:deleteNote', async (id) => {
      await Note.findByIdAndDelete(id);
      emitNotes();
    });

    socket.on('client:getnote', async (id) => {
      const note = await Note.findById(id);
      io.emit('server:selectednote', note);
    });

    socket.on('client:updatenote', async (note) => {

    })
  })
}