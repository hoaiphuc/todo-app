import ListHeader from "./components/ListHeader";
import axios from "axios";
import ListItem from "./components/ListItem";
import { useState, useEffect } from "react";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const authToken = cookie.AuthToken;
  const userEmail = cookie.Email;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  //sort by date
  // const sortedTasks = tasks?.sort((a, b) => a.date.compareTo(b.date));
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"🏝️ Holiday tick list"} getData={getData} />
          <p className="user-email">Welcome back {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
      <p className="copyright">© Creative Code</p>
    </div>
  );
};

export default App;
