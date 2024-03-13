import SelectionBlock from "../../modules/SelectionBlock/SelectionBlock";
import { ActiveButton } from "../../modules/Buttons/Buttons";
import { GeneralTitle } from "../../modules/Titles/Titles";
import { TaskType, TaskCard } from "../../modules/TaskCard/TaskCard";
import { useState, useEffect } from "react";
import Loading from "../../modules/Loading/Loading";
import { Link } from "react-router-dom";
import "./TaskListPage.css";

type responseData = {
  selectedList: Array<TaskType>;
};

export default function TaskListPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [tasksCount, setTasksCount] = useState<number>();
  const [tasksToShow, setTasksToShow] = useState<Array<TaskType>>([]);
  const [numPage, setNumPage] = useState<number>(1);
  const [typeSort, setTypeSort] = useState<string>("default"); // default, new, old
  const [filterMarks, setFilterMarks] = useState<Array<string>>([]);
  const [filterPriority, setFilterPriority] = useState<Array<string>>([]);

  useEffect(() => {
    if (isFetching || isSorting) {
      const filterData = {
        page: numPage,
        sort: typeSort,
        filterMarks: filterMarks,
        filterPriority: filterPriority,
        isSorting: isSorting,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filterData),
      };

      if (!tasksToShow) setIsLoading(true);
      const url: string = "https://example.com/task";

      fetch(`${url}`, requestOptions)
        .then((response: Response) => response.json())
        .then((data: responseData) => {
          if (isSorting) {
            setTasksToShow(data.selectedList);
            setIsSorting(false);
          } else {
            setTasksToShow([...tasksToShow, ...data.selectedList]);
            setNumPage(() => numPage + 1);
          }
        })
        .catch((error) => console.log(`Error - ${error}`))
        .finally(() => {
          setIsFetching(false);
          setIsLoading(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isSorting]);

  useEffect(() => {
    const url: string = "https://example.com/task";
    fetch(`${url}/count`)
      .then((response: Response) => response.json())
      .then((tasksCount: number) => {
        setTasksCount(tasksCount);
      })
      .catch((error) => console.log(`Error - ${error}`));
  }, []);

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
      setIsFetching(true);
    }
  };

  return (
    <>
      <GeneralTitle title="Список зачач" />

      <main className="main-task-list-content">
        <div className="left-block">
          <SelectionBlock
            typeSort={typeSort}
            setTypeSort={setTypeSort}
            setFilterMarks={setFilterMarks}
            filterMarks={filterMarks}
            setFilterPriority={setFilterPriority}
            filterPriority={filterPriority}
            setIsSorting={setIsSorting}
          />
        </div>
        <div className="right-block">
          <Link to={`/${tasksCount}/edit`}>
            <div className="right-block__button">
              <ActiveButton text="Добавить задачу" />
            </div>
          </Link>
          {isLoading ? (
            <div className="loading">
              <Loading />
            </div>
          ) : (
            <div className="tasksSection">
              {tasksToShow.map((task: TaskType) => (
                <TaskCard key={task.id} {...task} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
