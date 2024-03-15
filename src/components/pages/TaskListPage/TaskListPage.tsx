import SelectionBlock from "../../modules/SelectionBlock/SelectionBlock";
import { TaskType, TaskCard } from "../../modules/TaskCard/TaskCard";
import { ActiveButton } from "../../modules/Buttons/Buttons";
import { GeneralTitle } from "../../modules/Titles/Titles";
import Loading from "../../modules/Loading/Loading";
import { useState, useEffect, ReactElement } from "react";
import { Link } from "react-router-dom";
import "./TaskListPage.css";

type responseData = {
  selectedList: Array<TaskType>;
};

export default function TaskListPage(): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(true); // Происходит ли загрузка данных
  const [isSorting, setIsSorting] = useState<boolean>(false); // Мы запрашиваем элементы(TaskType) для сортировка или отображения
  const [isFetching, setIsFetching] = useState<boolean>(true); // Нужно ли подгрузить ещё данных (для динамической пагинации)
  const [isLastPage, setIsLastPage] = useState<boolean>(false); // Нужно ли подгрузить ещё данных (для динамической пагинации)
  const [tasksCount, setTasksCount] = useState<number>(); // Общее число задач
  const [tasksToShow, setTasksToShow] = useState<Array<TaskType>>([]); // Список задач для отображения
  const [numPage, setNumPage] = useState<number>(1); // Номер текущей страницы (для динамической пагинации)
  const [typeSort, setTypeSort] = useState<string>(""); // Тип сортировки ("Новые", "Старые")
  const [filterPriority, setFilterPriority] = useState<Array<string>>([]); // Приоритет, по которому происходит выборка задач
  const [filterMarks, setFilterMarks] = useState<Array<string>>([]); // Отметки, по которым происходит выборка задач

  useEffect((): void => {
    if (isFetching || isSorting) {
      // Данные для передачи на сервер
      const filterData = {
        page: numPage,
        sort: typeSort,
        filterMarks: filterMarks,
        filterPriority: filterPriority,
        isSorting: isSorting
      };
      // Опции запроса
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(filterData),
      };

      if (!tasksToShow) setIsLoading(true);
      const url: string = "https://example.com/task";

      fetch(`${url}`, requestOptions)
        .then((response: Response) => response.json())
        .then((data: responseData): void => {
          if (isSorting) {
            setTasksToShow(data.selectedList);
            setIsSorting(false);
          } else {
            setTasksToShow([...tasksToShow, ...data.selectedList]);
            if (data.selectedList.length === 15) {
              setNumPage(() => numPage + 1);
            } else {
              setIsLastPage(true);
            }
          }
        })
        .catch((error: string): void => console.log(`Error - ${error}`))
        .finally((): void => {
          setIsFetching(false);
          setIsLoading(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isSorting]);

  useEffect((): void => {
    const url: string = "https://example.com/task";

    fetch(`${url}/count`)
      .then((response: Response) => response.json())
      .then((tasksCount: number): void => {
        setTasksCount(tasksCount);
      })
      .catch((error: string): void => console.log(`Error - ${error}`));
  }, []);

  useEffect((): (() => void) | void => {
    if (isLastPage) return;

    const LoadingTasks = (): void => {
      // Если расстояние от нижней части видимой области до нижней части всего документа < 100px
      if (
        // Высота всего элемента с учётом скролла
        document.documentElement.scrollHeight -
          // (Высота видимой области экрана) + (расстояния от вершины элемента до видимого содержимого)
          (window.innerHeight + document.documentElement.scrollTop) <
        100
      ) {
        setIsFetching(true);
      }
    };

    // Создаём прослукшку скролла для динамческой пагинации
    window.addEventListener("scroll", LoadingTasks);
    return (): void => {
      window.removeEventListener("scroll", LoadingTasks);
    };
  }, [isLastPage]);

  return (
    <>
      <GeneralTitle title="Список зачач" />

      <main className="main-task-list-content">
        <div className="left-block">
          {/* Блок отвечающий за сортировку элементов */}
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
          {/* Создание новой задачи */}
          <Link to={`/${tasksCount}/edit`}>
            <div className="right-block__button">
              <ActiveButton text="Добавить задачу" />
            </div>
          </Link>
          {isLoading ? (
            // Компонент загрузки (Пока подгружаются файлы)
            <div className="loading">
              <Loading />
            </div>
          ) : (
            // Вывод списка задач
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
