import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookie.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${process.env.REACT_APP_SERVERURL}/todos`, data)
        .then((response) => {
          if (response.status === 200) {
            console.log("WORKED");
            setShowModal(false);
            getData();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async (e) => {
    console.log(data);
    e.preventDefault();
    try {
      axios
        .put(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, data)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            setShowModal(false);
            getData();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));

    console.log(data);
  };

  return (
    <div className="overplay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} you task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form action="">
          <input
            required
            maxLength={30}
            placeholder=" Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            value="Submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
