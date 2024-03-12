import { http, HttpResponse } from "msw";
import { TaskType } from "../components/modules/TaskCard/TaskCard";
import { faker } from "@faker-js/faker";

const tasksList: Array<TaskType> = [];

faker.seed(0);
const tasksPerScroll: number = 15;
const taskCount: number = 5000;

for (let index = 0; index < 5000; index += 1) {
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
  http.get("./api/task", () => {
    return HttpResponse.json(tasksList);
  }),
  http.get("./api/task/count", () => {
    return HttpResponse.json(taskCount);
  }),
  http.get("./api/task/id=:id", ({ params }) => {
    const taskId: number = Number(params.id);

    return HttpResponse.json(tasksList.find((task) => task.id === taskId));
  }),
];
