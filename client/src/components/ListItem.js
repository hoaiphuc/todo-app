import { useState } from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";
import axios from "axios";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    try {
      axios
        .delete(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`)
        .then((res) => {
          getData();
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={() => handleDelete()}>
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </li>
  );
};

export default ListItem;
