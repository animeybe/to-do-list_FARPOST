import { http, HttpResponse } from "msw";
import { TaskType } from "../components/modules/TaskCard/TaskCard";
import { fakerRU as faker } from "@faker-js/faker";

const tasksList: Array<TaskType> = [];

faker.seed(0);
const tasksPerScroll: number = 15;
let taskCount: number = 50;

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

export const handlers = [
  http.get("./api/task/page=:page", ({ params }) => {
    const page: number = Number(params.page);
    const start: number = (page - 1) * tasksPerScroll;
    const end: number = start + tasksPerScroll;

    return HttpResponse.json(tasksList.slice(start, end));
  }),
  http.get("./api/task/id=:id", ({ params }) => {
    const taskId: number = Number(params.id);
    const currentTask: TaskType | undefined = tasksList.find(
      (task) => task.id === taskId
    );
    return HttpResponse.json(currentTask ? currentTask : null);
  }),
  http.get("./api/task/count", () => {
    return HttpResponse.json(taskCount);
  }),
  http.post("./api/task/new", async ({ request }) => {
    const newTask = await request.json();
    tasksList.push(newTask);
    taskCount += 1;

    return HttpResponse.json(taskCount);
  }),
];
