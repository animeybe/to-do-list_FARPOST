import {
  CloseButton,
  BackButton,
  ActiveButton,
} from "../../modules/Buttons/Buttons";
import { TaskType } from "../../modules/TaskCard/TaskCard";
import { BlockTitle, GeneralTitle } from "../../modules/Titles/Titles";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./TaskPage.css";

export default function TaskPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTask, setCurrentTask] = useState<TaskType>();

  const params = useParams();
  const taskID: number = Number(params.id);
  const currentTaskDateСreation: Date = new Date(
    String(currentTask?.dateСreation)
  );

  useEffect(() => {
    setIsLoading(true);
    fetch(`./api/task/id=${taskID}`)
      .then((response: Response) => response.json())
      .then((task: TaskType) => {
        setCurrentTask(task);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <GeneralTitle title="Просмотр" />
      <main className="main-task-content">
        <div className="buttons-block">
          <div className="buttons-block-left">
            <div className="buttons-block__back">
              <Link to="/">
                <BackButton text="Назад" />
              </Link>
            </div>
            <div className="buttons-block__edit">
              <Link to={`/${taskID}/edit`}>
                <ActiveButton text="Редактировать" />
              </Link>
            </div>
          </div>
          <div className="buttons-block__delete">
            <Link to={`/${taskID}/edit`}>
              <CloseButton text="Удалить" />
            </Link>
          </div>
        </div>
        {isLoading ? (
          "LOADING..."
        ) : (
          <div className="task-block">
            <BlockTitle title="Название задачи" />
            <div className="task-block__title">{currentTask?.title}</div>
            <BlockTitle title="Дата создания" />
            <div className="task-block__date-creation">
              {`${currentTaskDateСreation.toLocaleString("ru", {
                month: "long",
                day: "numeric",
              })} ${currentTaskDateСreation.getFullYear()}, ${currentTaskDateСreation.getHours()}:${currentTaskDateСreation.getMinutes()}`}
            </div>
            <BlockTitle title="Приоритет" />
            <div className="task-block__priority">{currentTask?.priority}</div>
            <BlockTitle title="Отметки" />
            <div className="task-block__marks">
              {currentTask?.marks.join(", ")}
            </div>
            <BlockTitle title="Описание" />
            <div className="task-block__description">
              {currentTask?.description}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
