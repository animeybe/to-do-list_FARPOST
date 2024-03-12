import {
  CloseButton,
  BackButton,
  ActiveButton,
} from "../../modules/Buttons/Buttons";
import { BlockTitle, GeneralTitle } from "../../modules/Titles/Titles";
import { TaskType } from "../../modules/TaskCard/TaskCard";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./TaskEditPage.css";

export default function TaskEditPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewTask, setIsNewTask] = useState<boolean>();
  const [currentTask, setCurrentTask] = useState<TaskType>();

  const params = useParams();
  const taskID: number = Number(params.id);

  useEffect(() => {
    setIsLoading(true);
    let isNewTask = true;
    fetch(`./api/task`)
      .then((response: Response) => response.json())
      .then((tasks: Array<TaskType>) => {
        tasks.map((task) => {
          if (task.id === taskID) {
            setCurrentTask(tasks[taskID])
            isNewTask = false;
            return;
          }
        });
        setIsNewTask(isNewTask);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <main className="main-task-edit-content">
        <GeneralTitle title="Редактирование" />
        <div className="buttons-block">
          <Link to={isNewTask ? "/" : `/${taskID}`}>
            <BackButton text="Назад" />
          </Link>
        </div>
        <div className="task-edit-block">
          <BlockTitle title="Название задачи" />
          <input type="text" className="task-edit-block__input-title"  />
          <BlockTitle title="Приоритет" />
          <select className="task-edit-block__input-priority">
            <option className="input-priority__item" value="low">low</option>
            <option className="input-priority__item" value="normal">normal</option>
            <option className="input-priority__item" value="high">high</option>
          </select>
          <BlockTitle title="Отметки" />
          <div className="task-edit-block__input-marks">
            <div className="input-marks__mark">research</div>
            <div className="input-marks__mark">design</div>
            <div className="input-marks__mark">development</div>
          </div>
          <BlockTitle title="Описание" />
          <input type="text" className="task-edit-block__input-description" />
          <ActiveButton text="Сохранить" />
        </div>
      </main>
    </>
  );
}
