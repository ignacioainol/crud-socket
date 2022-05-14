import Note from './models/Note'

export default (io) => {
  io.on('connection', (socket) => {
    const emitNotes = async () => {
      const notes = await Note.find()
      io.emit('loadnotes', notes)
    }

    emitNotes()

    socket.on('newnote', async (data) => {
      const newNote = new Note(data);
      const savedNote = await newNote.save();
      console.log(savedNote)
    })
  })
}