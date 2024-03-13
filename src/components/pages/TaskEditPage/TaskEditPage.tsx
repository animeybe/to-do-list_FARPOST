import { BackButton, ActiveButton } from "../../modules/Buttons/Buttons";
import { BlockTitle, GeneralTitle } from "../../modules/Titles/Titles";
import { TaskType } from "../../modules/TaskCard/TaskCard";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./TaskEditPage.css";

export default function TaskEditPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewTask, setIsNewTask] = useState<boolean>();
  const [isCreation, setIsCreation] = useState<boolean>();
  const [currentTaskTitle, setCurrentTaskTitle] = useState<string>("");
  const [currentTaskDateСreation, setCurrentTaskDateСreation] = useState<Date>(
    new Date()
  );
  const [currentTaskPriority, setCurrentTaskPriority] = useState<string>("low");
  const [currentTaskMarks, setCurrentTaskMarks] = useState<Array<string>>([]);
  const [currentTaskDescription, setCurrentTaskDescription] =
    useState<string>("");

  const params = useParams();
  const taskID: number = Number(params.id);

  useEffect(() => {
    setIsLoading(true);
    fetch(`./api/task/id=${taskID}`)
      .then((response: Response) => response.json())
      .then((task: TaskType | null) => {
        if (task === null) {
          setIsNewTask(true);
        } else {
          setCurrentTaskTitle(task.title);
          setCurrentTaskDateСreation(task.dateСreation);
          setCurrentTaskDescription(task.description);
          setCurrentTaskPriority(task.priority);
          setCurrentTaskMarks(task.marks);
          setIsNewTask(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClickSave() {
    const newTask: TaskType = {
      id: taskID,
      title: currentTaskTitle,
      description: currentTaskDescription,
      dateСreation: currentTaskDateСreation,
      priority: currentTaskPriority,
      marks: currentTaskMarks,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    };

    fetch("./api/task/new", requestOptions);
  }

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
              defaultValue={currentTaskTitle}
              onChange={({ target: { value } }) => {
                setCurrentTaskTitle(value);
              }}
            />
            <BlockTitle title="Приоритет" />
            <select
              defaultValue={currentTaskPriority}
              onChange={({ target: { value } }) => {
                setCurrentTaskPriority(value);
              }}
              className="task-edit-block__input-priority"
            >
              <option className="input-priority__item" value="low">
                low
              </option>
              <option className="input-priority__item" value="normal">
                normal
              </option>
              <option className="input-priority__item" value="high">
                high
              </option>
            </select>
            <BlockTitle title="Отметки" />
            <div className="task-edit-block__input-marks">
              <div
                onClick={(e) => {
                  e.currentTarget.classList.toggle("input-marks__mark_select");
                  if (
                    e.currentTarget.classList.contains(
                      "input-marks__mark_select"
                    )
                  ) {
                    const newMarks: Array<string> = [
                      ...currentTaskMarks,
                      "research",
                    ];
                    setCurrentTaskMarks(newMarks);
                  } else {
                    const newMarks: Array<string> = currentTaskMarks.filter(
                      (mark: string) => {
                        return mark !== "research";
                      }
                    );
                    setCurrentTaskMarks(newMarks);
                  }
                }}
                className={`input-marks__mark${
                  currentTaskMarks.some((item) => item === "research") &&
                  !isNewTask
                    ? " input-marks__mark_select"
                    : ""
                }`}
              >
                research
              </div>
              <div
                onClick={(e) => {
                  e.currentTarget.classList.toggle("input-marks__mark_select");
                  if (
                    e.currentTarget.classList.contains(
                      "input-marks__mark_select"
                    )
                  ) {
                    const newMarks: Array<string> = [
                      ...currentTaskMarks,
                      "design",
                    ];
                    setCurrentTaskMarks(newMarks);
                  } else {
                    const newMarks: Array<string> = currentTaskMarks.filter(
                      (mark: string) => {
                        return mark !== "design";
                      }
                    );
                    setCurrentTaskMarks(newMarks);
                  }
                }}
                className={`input-marks__mark${
                  currentTaskMarks.some((item) => item === "design") &&
                  !isNewTask
                    ? " input-marks__mark_select"
                    : ""
                }`}
              >
                design
              </div>
              <div
                onClick={(e) => {
                  e.currentTarget.classList.toggle("input-marks__mark_select");
                  if (
                    e.currentTarget.classList.contains(
                      "input-marks__mark_select"
                    )
                  ) {
                    const newMarks: Array<string> = [
                      ...currentTaskMarks,
                      "development",
                    ];
                    setCurrentTaskMarks(newMarks);
                  } else {
                    const newMarks: Array<string> = currentTaskMarks.filter(
                      (mark: string) => {
                        return mark !== "development";
                      }
                    );
                    setCurrentTaskMarks(newMarks);
                  }
                }}
                className={`input-marks__mark${
                  currentTaskMarks.some((item) => item === "development") &&
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
            <ActiveButton
              onClick={isNewTask ? handleClickSave : () => {}}
              text="Сохранить"
            />
          </div>
        )}
      </main>
    </>
  );
}
