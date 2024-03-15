import TaskListPage from "../src/components/pages/TaskListPage/TaskListPage.tsx";
import TaskEditPage from "../src/components/pages/TaskEditPage/TaskEditPage.tsx";
import TaskPage from "../src/components/pages/TaskPage/TaskPage.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ReactElement } from "react";
import "./IncludeFonts.css";
import "./App.css";

export default function App(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={TaskListPage} />
        <Route path="/:id/edit" Component={TaskEditPage} />
        <Route path="/:id" Component={TaskPage} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
