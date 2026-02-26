import { useState } from "react";
import styles from "./TodoFrom.module.css";
import { Plus } from "lucide-react";

const TodoFrom = ({ onAgregarNota }) => {
  const [textNote, SetTextNote] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(textNote);

    //Se agregan notas

    if (textNote === "") {
      console.log("NO se peudeagregar una nota vacia");
      return;
    }
    const newNote = {
      text: textNote,
      completed: false,
    };
    fetch("https://json-server-lpkb.onrender.com/notas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => {
        onAgregarNota(data);
        SetTextNote("");
      });
  };

  const handleChange = (e) => {
    SetTextNote(e.target.value);
  };
  return (
    <div className={styles.fromContainer}>
      <h2>Todo from</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nota"
          id="nota"
          value={textNote}
          onChange={handleChange}
        />
        <button type="submit">
          <Plus />
          Crear Nota
        </button>
      </form>
    </div>
  );
};

export default TodoFrom;
