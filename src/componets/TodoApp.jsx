import { useState, useEffect } from "react";
import styles from "./todoApp.module.css";
import TodoFrom from "./TodoForm/TodoForm";
import { Edit, SquarePen, Trash } from "lucide-react";
import EditNoteForm from "./EditNoteForm/EditNoteForm";
// (props)   | (propsComponets))
// {notaApp}
// const {notasApp = props}

function TodoApp() {
  const [notas, setNotas] = useState([]);
  const [notaEditadoId, setNotaEditadoId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://json-server-lpkb.onrender.com/notas");
        if (!response.ok) {
          throw new Error(`Error http: ${response.status}`);
        }
        const data = await response.json();
        setNotas(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const agregarNota = (nuevaNota) => {
    setNotas([...notas, nuevaNota]);
  };
  const eliminarNota = (id) =>{
    setNotas(notas.filter(nota => nota.id !== id))
    fetch(`https://json-server-lpkb.onrender.com/notas/${id}`, {
      method: "DELETE"
    } )
    .then(response =>{
      if (!response.ok) {
        throw new Error (`Error al eliminar la nota: ${response.status} `)
      }

      console.log("Nota eliminada correctamnete ")
    })
    .catch(error => console.error(error))
  }

const actualizarNota = (notaActualizada) => {
  setNotas(notas.map(nota=>{
     return nota.id === notaActualizada.id ? notaActualizada : nota;
  }))
}

const marcarCompletado = async (notaId) =>{
  try {
    const nota = notas.find(nota => nota.id == notaId)
    const response = await fetch (`https://json-server-lpkb.onrender.com/notas/${nota.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
      },
      body : JSON.stringify({ completed : !nota.completed})
    })
      if (!response.ok) {
        throw new Error (`Error al actualizar nota: ${response.status} `)
      }

      const notaActualizada = await response.json()
      setNotas(notas.map((nota) => nota.id === notaId ?notaActualizada: nota));
  } catch (error) {
    
  }
}
  return (
    <>
      <h1 className={styles.titulo}>Notas</h1>
      <TodoFrom onAgregarNota={agregarNota} />
      <ul className={styles.listaNota}>
        {notas.map((nota) => (
          <li className={styles.itemNota} key={nota.id}>
            
            <span>{nota.text} {nota.completed ? "✔️" : "❌"}</span>
            <div className={styles.icoContainer}>
              <button onClick={()=>marcarCompletado(nota.id)}>
                {nota.completed ? "Incompelta" : "Completada"}
              </button>
              <SquarePen  onClick={() =>setNotaEditadoId(nota.id)} size={26} absoluteStrokeWidth />
              <Trash onClick={()=> eliminarNota(nota.id) } size={26} absoluteStrokeWidth />
            </div>
            {
              notaEditadoId  === nota.id &&(
                <EditNoteForm
                  nota={nota}
                  onEditarNota={actualizarNota}
                  onCancelar={()=> setNotaEditadoId(null)}
                />
              )
            }
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoApp;
