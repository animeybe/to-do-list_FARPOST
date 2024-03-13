import {
  CloseButton,
  BackButton,
  ActiveButton,
} from "../../modules/Buttons/Buttons";
import { BlockTitle, GeneralTitle } from "../../modules/Titles/Titles";
import { TaskType } from "../../modules/TaskCard/TaskCard";
import Loading from "../../modules/Loading/Loading";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
    const url: string = "https://example.com/task";
    fetch(`${url}/id=${taskID}`)
      .then((response: Response) => response.json())
      .then((task: TaskType) => {
        setCurrentTask(task);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => console.log(`Error - ${error}`));
  }, [taskID]);

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
          <Loading />
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
