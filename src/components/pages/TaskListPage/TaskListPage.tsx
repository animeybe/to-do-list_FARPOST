import SelectionBlock from "../../modules/SelectionBlock/SelectionBlock";
import { ActiveButton } from "../../modules/Buttons/Buttons";
import { GeneralTitle } from "../../modules/Titles/Titles";
import { TaskType, TaskCard } from "../../modules/TaskCard/TaskCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TaskListPage.css";

export default function TaskListPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tasksCount, setTasksCount] = useState<number>();
  const [currentSortingType, setCurrentSortingType] = useState<string>(); //default, new, old
  const [limitedTasksList, setTasksToShow] = useState<Array<TaskType>>([]);
  const [numPage, setNumPage] = useState<number>(1);

  useEffect(() => {
    if (!limitedTasksList) setIsLoading(true);
    fetch(`./api/task/page=${numPage}`)
      .then((response: Response) => response.json())
      .then((data: Array<TaskType>) => {
        setTasksToShow([...limitedTasksList, ...data]);
      })
      .finally(() => {
        setIsLoading(false);
      });
    fetch(`./api/task/count`)
      .then((response: Response) => response.json())
      .then((tasksCount: number) => {
        setTasksCount(tasksCount);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPage]);

  useEffect(() => {
    window.addEventListener("scroll", LoadingTasks);
    return () => {
      window.removeEventListener("scroll", LoadingTasks);
    };
  }, []);

  const LoadingTasks = (): void => {
    if (
      document.documentElement.scrollHeight -
        (window.innerHeight + document.documentElement.scrollTop) <
      100
    ) {
      setNumPage((numPage) => numPage + 1);
    }
  };

  useEffect(() => {
    if (currentSortingType) {
      console.log(currentSortingType);
      let sorted;
      if (currentSortingType === "new") {
        sorted = limitedTasksList?.sort((a: TaskType, b: TaskType) => {
          const A: Date = new Date(a.dateСreation);
          const B: Date = new Date(b.dateСreation);
          return B.getTime() - A.getTime();
        });
      } else {
        sorted = limitedTasksList?.sort((a: TaskType, b: TaskType) => {
          const A: Date = new Date(a.dateСreation);
          const B: Date = new Date(b.dateСreation);
          return A.getTime() - B.getTime();
        });
      }
      setTasksToShow(sorted);
    }
  }, [currentSortingType, limitedTasksList]);

  return (
    <>
      <GeneralTitle title="Список зачач" />

      <main className="main-task-list-content">
        <div className="left-block">
          <SelectionBlock setCurrentSortingType={setCurrentSortingType} />
        </div>
        <div className="right-block">
          <Link to={`/${tasksCount}/edit`}>
            <div className="right-block__button">
              <ActiveButton text="Добавить задачу" />
            </div>
          </Link>
          {isLoading ? (
            <div className="loading">LOADING...</div>
          ) : (
            <div className="tasksSection">
              {limitedTasksList?.map((task: TaskType) => (
                <TaskCard key={task.id} {...task} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
