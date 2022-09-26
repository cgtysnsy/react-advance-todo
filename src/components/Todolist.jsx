import { useState } from "react";
import Button from "@mui/material/Button";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

export default function Todolist({
  todolist,
  editInput,
  editHandler,
  submitEdit,
  deleteHandler,
  completed,
}) {
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const notTodo = todolist.filter((t) => t.done === false).length;

  return (
    <div className="todolist-container">
      <h1>Pending Tasks ({notTodo})</h1>
      {todolist.map((todo, index) => {
        const crossed = todo.done ? "crossed" : "";
        return (
          <div key={index} className="listitem-container">
            <form onSubmit={(event) => submitEdit(index, event)}>
              <Accordion open={open} toggle={toggle}>
                <AccordionItem>
                  <AccordionHeader targetId={todo.id} className={crossed}>
                    <p>{todo.name}</p>
                  </AccordionHeader>

                  <AccordionBody accordionId={todo.id}>
                    <input
                      className="accordion-input"
                      value={editInput}
                      onChange={(event) => editHandler(index, event)}
                    />
                    <div className="accordion-buttons">
                      <Button onClick={(event) => submitEdit(index, event)}>
                        Edit
                      </Button>

                      <Button
                        className="buttons-header"
                        onClick={(event) => deleteHandler(index)}
                      >
                        Delete
                      </Button>
                      <Button onClick={() => completed(index)}>Done</Button>
                    </div>
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
            </form>
          </div>
        );
      })}
    </div>
  );
}
