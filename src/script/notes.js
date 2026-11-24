function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function loadNotes() {
  const saved = localStorage.getItem(NOTES_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function addNote(){
    const noteInput = document.getElementById("noteInput").value;

    if (!noteInput){
      document.getElementById("messageDisplay").textContent = "Please enter note text.";
      return;
    }
    
    document.getElementById("messageDisplay").textContent = "";
    notes.push({
      id: crypto.randomUUID(),
      noteText: noteInput
  });
  saveNotes(notes);
}

function renderNotes() {
  noteList.replaceChildren();
  let noteCount = 0;

  for (const note of notes) {
    const item = document.createElement("div");
    const noteContent = document.createElement("p");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete"
    deleteButton.addEventListener("click", () => {
      notes = notes.filter((item) => item.id !== note.id);
      saveNotes(notes);
      renderNotes();
    });

    noteCount += 1;

    noteContent.textContent = note.noteText;

    item.className = "note"

    item.append(noteContent, deleteButton);
    noteList.append(item);
  }
  document.getElementById("count").textContent = "You have " + noteCount + " notes."

}

const NOTES_KEY = "personal-dashboard-notes";
const inputForm = document.getElementById("addNote");
const noteList = document.getElementById("noteList");

let notes = loadNotes();
renderNotes();

inputForm.addEventListener("submit", function(event) {
    event.preventDefault();
    addNote();
    renderNotes();
    inputForm.reset();
});

saveNotes(notes);
