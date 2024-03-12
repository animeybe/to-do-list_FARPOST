import { BackButton, ActiveButton } from "../../modules/Buttons/Buttons";
import { BlockTitle, GeneralTitle } from "../../modules/Titles/Titles";
import { TaskType } from "../../modules/TaskCard/TaskCard";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./TaskEditPage.css";

export default function TaskEditPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewTask, setIsNewTask] = useState<boolean>();
  const [currentTask, setCurrentTask] = useState<TaskType>();
  const [currentTaskTitle, setCurrentTaskTitle] = useState<string>();
  const [currentTaskDescription, setCurrentTaskDescription] =
    useState<string>();

  const params = useParams();
  const taskID: number = Number(params.id);

  useEffect(() => {
    setIsLoading(true);
    let isNewTask = true;
    fetch(`./api/task/1`)
      .then((response: Response) => response.json())
      .then((tasks: Array<TaskType>) => {
        tasks.map((task: TaskType): void => {
          if (task.id === taskID) {
            setCurrentTask(tasks[taskID]);
            setCurrentTaskTitle(tasks[taskID].title);
            setCurrentTaskDescription(tasks[taskID].description);
            isNewTask = false;
            return;
          }
        });
        setIsNewTask(isNewTask);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="main-task-edit-content">
        <GeneralTitle
          title={isNewTask ? "Редактирование (создание)" : "Редактирование"}
        />
        <div className="buttons-block">
          <Link to={isNewTask ? "/" : `/${taskID}`}>
            <BackButton text="Назад" />
          </Link>
        </div>
        {isLoading ? (
          "LOADING..."
        ) : (
          <div className="task-edit-block">
            <BlockTitle title="Название задачи" />
            <input
              type="text"
              className="task-edit-block__input-title"
              value={currentTaskTitle}
              onChange={({ target: { value } }) => {
                setCurrentTaskTitle(value);
              }}
            />
            <BlockTitle title="Приоритет" />
            <select className="task-edit-block__input-priority">
              <option
                className="input-priority__item"
                value="low"
                selected={currentTask?.priority === "low"}
              >
                low
              </option>
              <option
                className="input-priority__item"
                value="normal"
                selected={currentTask?.priority === "normal"}
              >
                normal
              </option>
              <option
                className="input-priority__item"
                value="high"
                selected={currentTask?.priority === "high"}
              >
                high
              </option>
            </select>
            <BlockTitle title="Отметки" />
            <div className="task-edit-block__input-marks">
              <div
                className={`input-marks__mark${
                  currentTask?.marks.some((item) => item === "research") &&
                  !isNewTask
                    ? " input-marks__mark_select"
                    : ""
                }`}
              >
                research
              </div>
              <div
                className={`input-marks__mark${
                  currentTask?.marks.some((item) => item === "design") &&
                  !isNewTask
                    ? " input-marks__mark_select"
                    : ""
                }`}
              >
                design
              </div>
              <div
                className={`input-marks__mark${
                  currentTask?.marks.some((item) => item === "development") &&
                  !isNewTask
                    ? " input-marks__mark_select"
                    : ""
                }`}
              >
                development
              </div>
            </div>
            <BlockTitle title="Описание" />
            <input
              type="text"
              className="task-edit-block__input-description"
              value={currentTaskDescription}
              onChange={({ target: { value } }) => {
                setCurrentTaskDescription(value);
              }}
            />
            <ActiveButton text="Сохранить" />
          </div>
        )}
      </main>
    </>
  );
}
