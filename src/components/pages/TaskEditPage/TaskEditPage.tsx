import { BackButton, ActiveButton } from "../../modules/Buttons/Buttons";
import { BlockTitle, GeneralTitle } from "../../modules/Titles/Titles";
import {
  Link,
  useParams,
  Params,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";
import { TaskType } from "../../modules/TaskCard/TaskCard";
import { useState, useEffect, ReactElement } from "react";
import { Error } from "../../modules/Errors/Errors";
import Loading from "../../modules/Loading/Loading";
import "./TaskEditPage.css";

export interface RequestSaveTask extends TaskType {
  isNewTask: boolean;
}

export default function TaskEditPage(): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewTask, setIsNewTask] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");
  const [currentTaskTitle, setCurrentTaskTitle] = useState<string>("");
  const [currentTaskDateСreation, setCurrentTaskDateСreation] = useState<Date>(
    new Date()
  );
  const [currentTaskPriority, setCurrentTaskPriority] = useState<string>("low");
  const [currentTaskMarks, setCurrentTaskMarks] = useState<Array<string>>([]);
  const [currentTaskDescription, setCurrentTaskDescription] =
    useState<string>("");

  const params: Readonly<Params<string>> = useParams();
  const taskID: number = Number(params.id);

  const navigate: NavigateFunction = useNavigate();

  useEffect((): void => {
    setIsLoading(true);
    const url: string = "https://example.com/task";
    fetch(`${url}/id=${taskID}`)
      .then((response: Response) => response.json())
      .then((task: TaskType | null): void => {
        if (task === null) {
          setIsNewTask(true);
        } else {
          setIsNewTask(false);
          setCurrentTaskTitle(task.title);
          setCurrentTaskDateСreation(task.dateСreation);
          setCurrentTaskDescription(task.description);
          setCurrentTaskPriority(task.priority);
          setCurrentTaskMarks(task.marks);
          setIsNewTask(false);
        }
      })
      .catch((error: string): void => console.log(`Error - ${error}`))
      .finally((): void => {
        setIsLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect((): void => {
    if (isNewTask !== undefined) {
      const url: string = "https://example.com/task";

      fetch(`${url}/count`)
        .then((response: Response) => response.json())
        .then((tasksCount: number): void => {
          if (tasksCount - 1 < taskID && tasksCount !== taskID && isNewTask) {
            navigate("/");
          }
        })
        .catch((error: string): void => console.log(`Error - ${error}`));
    }
  }, [isNewTask]);

  const handleClickSave = (): Response | null => {
    const newTask: RequestSaveTask = {
      id: taskID,
      title: currentTaskTitle,
      description:
        currentTaskDescription.length !== 0 ? currentTaskDescription : "...",
      dateСreation: currentTaskDateСreation,
      priority: currentTaskPriority,
      marks: currentTaskMarks,
      isNewTask: isNewTask,
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(newTask),
    };

    const url: string = "https://example.com/task";
    fetch(`${url}/new`, requestOptions)
      .then((response: Response) => response.json())
      .then((data: { status: number }): void => {
        if (data.status === 200) {
          navigate("/");
        }
      })
      .catch((error: string): void => console.log(`Error - ${error}`));
    return null;
  };

  const validationForm = (): void => {
    if (currentTaskTitle.length === 0)
      setIsError("Поле -Название задачи- не может быть пустым");
    else handleClickSave();
  };

  return (
    <>
      <main className="main-task-edit-content">
        <GeneralTitle
          title={isNewTask ? "Редактирование (создание)" : "Редактирование"}
        />
        <div className="upper-block">
          <div className="buttons-edit-block">
            <Link to={isNewTask ? "/" : `/${taskID}`}>
              <BackButton text="Назад" />
            </Link>
          </div>
          {isError.length !== 0 && (
            <div className="error-block">
              <Error errorText={isError} />
            </div>
          )}
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="task-edit-block">
            <BlockTitle className="obligatory" title="Название задачи" />
            <input
              type="text"
              className="task-edit-block__input-title"
              defaultValue={currentTaskTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setCurrentTaskTitle(e.target.value);
              }}
            />
            <BlockTitle className="obligatory" title="Приоритет" />
            <select
              defaultValue={currentTaskPriority}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => {
                setCurrentTaskPriority(e.target.value);
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
                onClick={(e: React.MouseEvent): void => {
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
                      (mark: string): boolean => {
                        return mark !== "research";
                      }
                    );
                    setCurrentTaskMarks(newMarks);
                  }
                }}
                className={`input-marks__mark${
                  currentTaskMarks.some(
                    (item: string): boolean => item === "research"
                  ) && !isNewTask
                    ? " input-marks__mark_select"
                    : ""
                }`}
              >
                research
              </div>
              <div
                onClick={(e: React.MouseEvent): void => {
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
                      (mark: string): boolean => {
                        return mark !== "design";
                      }
                    );
                    setCurrentTaskMarks(newMarks);
                  }
                }}
                className={`input-marks__mark${
                  currentTaskMarks.some(
                    (item: string): boolean => item === "design"
                  ) && !isNewTask
                    ? " input-marks__mark_select"
                    : ""
                }`}
              >
                design
              </div>
              <div
                onClick={(e: React.MouseEvent): void => {
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
                      (mark: string): boolean => {
                        return mark !== "development";
                      }
                    );
                    setCurrentTaskMarks(newMarks);
                  }
                }}
                className={`input-marks__mark${
                  currentTaskMarks.some(
                    (item: string): boolean => item === "development"
                  ) && !isNewTask
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setCurrentTaskDescription(e.target.value);
              }}
            />
            <ActiveButton onClick={validationForm} text="Сохранить" />
          </div>
        )}
      </main>
    </>
  );
}
