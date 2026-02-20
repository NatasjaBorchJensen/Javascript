const storageKey= "mmd_crud";

let notes = loadNotes();

const createForm = document.getElementById("createForm");
const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");

function loadNotes(){
    const raw = localStorage.getItem(storageKey);

    if(raw === null){
    return[
        {id: 1, text: "klik 'rediger' for at ændre noten✏️", done: false},
        {id: 2, text: "klik 'done' for at markere færdig✔️️", done: true}
       ];
    }

    try{
        const parsed =JSON.parse(raw);
        if(!Array.isArray(parsed)) return [];
        return parsed;
    } catch (error) {
        return[];
    }
}

  function saveNotes(){
    localStorage.setItem(storageKey, JSON.stringify(notes));
  }

  function generateId(){
    if(notes.length === 0) return 1;
    const ids = notes.map(n => n.id);
    return Math.max(...ids) + 1;
  }

  function renderNotes(){
    notesList.innerHTML=" ";
    if (notes.length === 0){
        notesList.innerHTML = "<li class='muted'> ingen noter endnu. Tilføj en⬆️</li>"
        return;
    }

    notes.forEach(note=>{
        const li = document.createElement("li");

        const doneBtn = document.createElement("button");
       doneBtn.className="small";
       doneBtn.textContent=note.done ? "Undone" : "done";

       doneBtn.addEventListener("click", () => {
           toggleDone(note.id);
       });
       li.appendChild(doneBtn);

       if(note.editing === true){
           const editInput= document.createElement("inout")
           editInput.valye = note.text
           editInput.setAttribute("aria-label","rediger note");

               const saveBTN = document.createElement("button");
           saveBtn.className = "small";
           saveBtn.textContent = "gem";

           const cancelBtn = document.createElement("button");
           cancelBtn.className = "small";
           cancelBtn.textContent = "Annuller";

           saveBtn.addEventListener("click", () => {
               saveEdit(note.id, editInput.value);
           });

           cancelBtn.addEventListener("click", () => {
               cancelEdit(note.id, editInput.value);
           });
           editInput.classname ="note-text";
           li.appendChild(editInput);
           li.appendChild(saveBtn);
           li.appendChild(cancelBtn);
       }
       notesList.appendChild(li);
    });
  }

  function addNote(text) {
    if(text.trim() === " "){
        alert("Du skal skrive noget før du kan tilføje en note!");
    }
    const newNote = {
        id:generateId(),
        text: text.trim(),
        done: false
    };
    notes.push(newNote);
    saveNotes();
    renderNotes();
  }

  function deleteNote(id){
    const ok = confirm("Er du sikker på at du vil slette noget?");
    if (!ok) return;
    notes = notes.filter(n=>n.id !== id);
    saveNotes();
    renderNotes();
  }

  function toogleDone(id) {
    const note = notes.find(n=>n.id===id);
    if(!no) return;

    note.done = !note.done
    saveNotes();
    renderNotes();
  }

  function startEdit(id){
    notes.forEach(n=> n.editing = false);

    const note = notes.find(n=>n.id===id);
    if(!note) return;

    note.editing = true;
    renderNotes();
  }

  function saveEdit(id, newText){
    if(newText.trim()=== " ");{
        alert("noten må ikke være tom!");
        return;
      }
      const note = notes.find(n => n.id === id);
    if(!note) return

      note.text = newText.trim();
    note.editing = false;
    saveNotes();
    renderNotes();

  }

  function cancelEdit(id){
    const noe = notes.find(n=> n.id ===id);
    if (!note) return;

    note.editing = false;
    renderNotes();
  }

  createForm.addEventListener("submit", (evet) => {
      event.preventDefault();

      addNote(noteInput.value);

      noteInput.value = " ";
      noteInput.focus();
  })

renderNotes();
