import { http, HttpResponseResolver, HttpResponse } from "msw";
import { TaskType } from "../components/modules/TaskCard/TaskCard";
import { fakerRU as faker } from "@faker-js/faker";

const tasksList: Array<TaskType> = [];

faker.seed(0);
const tasksPerScroll: number = 15;
let taskCount: number = 5000;

for (let index = 0; index < taskCount; index += 1) {
  tasksList.push({
    id: index,
    title: faker.lorem.sentence({ min: 2, max: 5 }),
    description: faker.lorem.sentence({ min: 2, max: 12 }),
    dateСreation: faker.date.recent({ days: 365 }),
    priority: faker.helpers.arrayElement(["low", "normal", "high"]),
    marks: faker.helpers.arrayElements(["research", "design", "development"], {
      min: 1,
      max: 3,
    }),
  });
}

type SdkRequestGetTask = {
  page: number;
  sort: string;
  filterMarks: Array<string>;
  filterPriority: Array<string>;
  isSorting: boolean;
};

type SdkResponseGetTask = {
  selectedList: Array<TaskType>;
};

function handleSdkRequestGetTask(
  resolver: HttpResponseResolver<never, SdkRequestGetTask, SdkResponseGetTask>
) {
  return http.post("https://example.com/task", resolver);
}
function handleSdkRequestNewTask(
  resolver: HttpResponseResolver<never, TaskType>
) {
  return http.post("https://example.com/task/new", resolver);
}

export const handlers = [
  handleSdkRequestGetTask(async ({ request }) => {
    const filterData = await request.json();

    let page: number = filterData.page;
    const sort: string = filterData.sort;
    const filterMarks: Array<string> = filterData.filterMarks;
    const filterPriority: Array<string> = filterData.filterPriority;
    const isSorting: boolean = filterData.isSorting;

    if (isSorting) page -= 1;

    const start: number = (page - 1) * tasksPerScroll;
    const end: number = start + tasksPerScroll;

    function SortByDate(Type: string): Array<TaskType> {
      let sorted;
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
      ListToSend = ListToSend.filter((task) => {
        return (
          task.marks.length === filterMarks.length &&
          task.marks.every((element) => {
            return filterMarks.indexOf(element) !== -1;
          })
        );
      });
    }
    if (filterPriority.length !== 0) {
      ListToSend = ListToSend.filter((task) => {
        return filterPriority.some((element) => {
          return element === task.priority;
        });
      });
    }

    console.log(`PAGE - ${page}`);

    return HttpResponse.json({
      selectedList: ListToSend.slice(start, end),
    });
  }),

  handleSdkRequestNewTask(async ({ request }) => {
    const newTask = await request.json();
    tasksList.push(newTask);
    taskCount += 1;
  }),

  http.get("https://example.com/task/id=:id", ({ params }) => {
    const taskId: number = Number(params.id);
    const currentTask: TaskType | undefined = tasksList.find(
      (task) => task.id === taskId
    );
    return HttpResponse.json(currentTask ? currentTask : null);
  }),

  http.get("https://example.com/task/count", () => {
    return HttpResponse.json(taskCount);
  }),
];
