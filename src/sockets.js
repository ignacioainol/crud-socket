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
      socket.emit('server:newnote', savedNote)
    })
  })
}