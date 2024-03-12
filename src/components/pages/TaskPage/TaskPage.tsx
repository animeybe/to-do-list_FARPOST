import { CloseButton, ActiveButton } from "../../modules/Buttons/Buttons";
import { TaskType } from "../../modules/TaskCard/TaskCard";
import { BlockTitle } from "../../modules/Titles/Titles";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./TaskPage.css";

export default function TaskPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTask, setCurrentTask] = useState<TaskType>();

  const params = useParams();
  const taskID: number = Number(params.id);

  useEffect(() => {
    setIsLoading(true);
    fetch(`./api/task`)
      .then((response: Response) => response.json())
      .then((tasks: Array<TaskType>) => {
        setCurrentTask(tasks[taskID]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="main-task-content">
      <div className="buttons-block">
        <Link to="/">
          <CloseButton text="Назад" />
        </Link>
        <Link to="/{taskID}/edit">
          <ActiveButton text="Редактировать" />
        </Link>
      </div>
      <div className="task-block">
        <BlockTitle title="Название задачи" />
        <div className="task-block__title">{currentTask?.title}</div>
        <BlockTitle title="Дата создания" />
        <div className="task-block__date-creation">{}</div>
        <BlockTitle title="Приоритет" />
        <div className="task-block__priority">{currentTask?.priority}</div>
        <BlockTitle title="Отметки" />
        <div className="task-block__marks">{currentTask?.marks}</div>
        <BlockTitle title="Описание" />
        <div className="task-block__description">
          {currentTask?.description}
        </div>
      </div>
    </main>
  );
}
