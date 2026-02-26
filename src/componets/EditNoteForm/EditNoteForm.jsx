import { useState } from "react";
import styles from "../todoApp.module.css";

const EditNoteForm = ({ nota, onEditarNota, onCancelar }) => {

  const [textoEditado, setTextoEditado] = useState(nota.text);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://json-server-lpkb.onrender.com/notas/${nota.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: textoEditado })
        }
      );

      if (!response.ok) {
        throw new Error(`error http: ${response.status}`);
      }

      const notaActualizada = await response.json();
      onEditarNota(notaActualizada);
      onCancelar();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editForm}>
      <input 
        type="text"
        value={textoEditado}
        onChange={(e) => setTextoEditado(e.target.value)}
        className={styles.editInput}
        
      />

      <button type="submit" className={styles.saveButton}>
        Guardar
      </button>

      <button
        type="button"
        onClick={onCancelar}
        className={styles.cancelButton}
      >
        Cancelar
      </button>
    </form>
  );
};

export default EditNoteForm;