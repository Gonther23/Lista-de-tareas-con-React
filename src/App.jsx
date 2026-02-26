import { useState } from "react";
import TodoApp from "./componets/TodoApp";
import "./index.css";

function App() {

  

  const titulosApp = {
    tituloApp: "soy Todo App",
    subtituloAPp:"Spy subtitulo App"
  }

  return (
    <section className="ContainerTodoApp">
      <TodoApp />
    </section>
  );
}

export default App;
