import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./redux/rootReducer";
import { thunk } from "redux-thunk";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import HOC from "./components/HOC";
import UserDashboard from "./components/UserDashboard";
import ManageProfile from "./components/ManageProfile";
import ManageProject from "./components/ManageProject";
import CreateProject from "./components/CreateProject";
import EditProject from "./components/EditProject";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import MyTask from "./components/MyTask";
import AllActivity from "./components/AllActivity";

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store} className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={<HOC component={<UserDashboard />} />}
          />
          <Route
            path="/profile"
            element={<HOC component={<ManageProfile />} />}
          />
          <Route
            path="/projects"
            element={<HOC component={<ManageProject />} />}
          />
          <Route
            path="/create-project"
            element={<HOC component={<CreateProject />} />}
          />
          <Route
            path="/create-task"
            element={<HOC component={<CreateTask />} />}
          />
          <Route
            path="/edit-project/:id"
            element={<HOC component={<EditProject />} />}
          />
          <Route
            path="/edit-task/:id"
            element={<HOC component={<EditTask />} />}
          />
          <Route
            path="/activity"
            element={<HOC component={<AllActivity />} />}
          />
          <Route path="/my-task" element={<HOC component={<MyTask />} />} />
          <Route path="*" element={<h2>Page not found!</h2>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
