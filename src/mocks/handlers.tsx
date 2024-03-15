import { http, HttpResponseResolver, HttpResponse, HttpHandler } from "msw";
import { RequestSaveTask } from "../components/pages/TaskEditPage/TaskEditPage";
import { TaskType } from "../components/modules/TaskCard/TaskCard";
import { fakerRU as faker } from "@faker-js/faker";

let tasksList: Array<TaskType> = [];

faker.seed(0);

const tasksPerScroll: number = 15; // Количество задач для подгрузке при скролле (для динамической пагинации)
let taskCount: number = 5000; // Изначальное количество задач

// Генерирую рандомные данные
for (let index: number = 0; index < taskCount; index += 1) {
  tasksList.push({
    id: index,
    title: `Тестовая задача №${index + 1}`,
    description: `Описание задачи №${index + 1}`,
    dateСreation: faker.date.recent({ days: 365 }),
    priority: faker.helpers.arrayElement(["low", "normal", "high"]),
    marks: faker.helpers.arrayElements(["research", "design", "development"], {
      min: 1,
      max: 3,
    }),
  });
}

type RequestGetTask = {
  page: number;
  sort: string;
  filterMarks: Array<string>;
  filterPriority: Array<string>;
};

function handleRequestGetTask(
  resolver: HttpResponseResolver<
    never,
    RequestGetTask,
    { selectedList: Array<TaskType> }
  >
): HttpHandler {
  return http.post("https://example.com/task", resolver);
}
function handleRequestDeleteTask(
  resolver: HttpResponseResolver<never, { taskID: number }, { status: number }>
): HttpHandler {
  return http.delete("https://example.com/task/delete", resolver);
}
function handleRequestSaveTask(
  resolver: HttpResponseResolver<never, RequestSaveTask, { status: number }>
): HttpHandler {
  return http.post("https://example.com/task/new", resolver);
}

export const handlers = [
  handleRequestGetTask(async ({ request }) => {
    const filterData: RequestGetTask = await request.json();

    const page: number = filterData.page;
    const sort: string = filterData.sort;
    const filterMarks: Array<string> = filterData.filterMarks;
    const filterPriority: Array<string> = filterData.filterPriority;

    console.log(page);

    const start: number = (page - 1) * tasksPerScroll;
    const end: number = start + tasksPerScroll;

    function SortByDate(Type: string): Array<TaskType> {
      let sorted: Array<TaskType>;
      if (Type === "new" || Type === "old") {
        sorted = tasksList.sort((a: TaskType, b: TaskType) => {
          const A: Date = new Date(a.dateСreation);
          const B: Date = new Date(b.dateСreation);
          return Type === "new"
            ? B.getTime() - A.getTime()
            : A.getTime() - B.getTime();
        });
      } else {
        sorted = tasksList.sort((a: TaskType, b: TaskType) => {
          return a.id - b.id;
        });
      }
      return sorted;
    }

    let ListToSend: Array<TaskType> = SortByDate(sort);

    if (filterMarks.length !== 0) {
      ListToSend = ListToSend.filter((task: TaskType): boolean => {
        return task.marks.some((element: string): boolean => {
          return filterMarks.indexOf(element) !== -1;
        });
      });
    }
    if (filterPriority.length !== 0) {
      ListToSend = ListToSend.filter((task: TaskType): boolean => {
        return filterPriority.some((element: string): boolean => {
          return element === task.priority;
        });
      });
    }

    return HttpResponse.json({
      selectedList: ListToSend.slice(start, end),
    });
  }),

  handleRequestSaveTask(async ({ request }) => {
    const data = await request.json();

    const transferedTask: TaskType = {
      id: data.id,
      title: data.title,
      description: data.description,
      dateСreation: data.dateСreation,
      priority: data.priority,
      marks: data.marks,
    };

    if (data.isNewTask) {
      tasksList.push(transferedTask);
      taskCount += 1;
    } else {
      tasksList.map((task: TaskType, index: number): void => {
        if (task.id === data.id) {
          tasksList[index] = transferedTask;
        }
      });
    }

    return HttpResponse.json({ status: 200 });
  }),
  handleRequestDeleteTask(async ({ request }) => {
    const { taskID } = await request.json();

    // Удаление задачи по ID
    tasksList = tasksList.filter((task: TaskType): boolean => {
      return task.id !== taskID;
    });

    // Смещение ID
    tasksList.forEach((task: TaskType, index: number): void => {
      task.id = index;
    });

    console.log(tasksList);

    return HttpResponse.json({ status: 200 });
  }),

  http.get("https://example.com/task/id=:id", ({ params }) => {
    const taskId: number = Number(params.id);
    const currentTask: TaskType | undefined = tasksList.find(
      (task: TaskType): boolean => task.id === taskId
    );
    return HttpResponse.json(currentTask ? currentTask : null);
  }),

  http.get("https://example.com/task/count", () => {
    return HttpResponse.json(taskCount);
  }),
];
