import React, { useState } from "react";
import "../css/display.css";

const Display: React.FC = () => {
  const [noteData, setNoteData] = useState<Note[]>([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<Note>({
    id: 0,
    title: "",
    content: "",
  });
  const [editNoteId, setEditNoteId] = useState<number | null>(null); // Track the ID of the note being edited

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
    setEditNoteId(null); // Reset editNoteId when hiding the form
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editNoteId !== null) {
      // Update existing note
      const updatedNotes = noteData.map((note) => {
        if (note.id === editNoteId) {
          return { ...newNote, id: editNoteId };
        }
        return note;
      });

      setNoteData(updatedNotes);
      setEditNoteId(null); // Reset editNoteId after updating
    } else {
      // Add new note
      setNoteData([...noteData, newNote]);
    }

    setIsFormVisible(false);
    setNewNote({
      id: 0,
      title: "",
      content: "",
    });
  };

  const handleEditNote = (noteId: number) => {
    const noteToEdit = noteData.find((note) => note.id === noteId);
    if (noteToEdit) {
      setNewNote({
        id: noteToEdit.id,
        title: noteToEdit.title,
        content: noteToEdit.content,
      });
      setIsFormVisible(true);
      setEditNoteId(noteId);
    }
  };

  const handleDeleteNote = (noteId: number) => {
    const updatedNotes = noteData.filter((note) => note.id !== noteId);
    setNoteData(updatedNotes);
  };

  return (
    <div>
      <h1>Note Taker</h1>  
      <div className="notes-add-form">
        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="id"
              value={newNote.id}
              placeholder="Enter Note Number"
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="title"
              value={newNote.title}
              placeholder="Enter Title"
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="content"
              value={newNote.content}
              placeholder="Enter Content"
              onChange={handleInputChange}
              required
            />
            <button type="submit">
              {editNoteId !== null ? "Update" : "Save"}
            </button>
          </form>
        )}
      </div>
      <div className="notes-grid">
        {noteData.map((note) => (
          <div className="grid-item" key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleEditNote(note.id)}>Edit</button>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="right-corner-button">
        <button onClick={handleButtonClick}>+</button>
      </div>
    </div>
  );
};

export default Display;
