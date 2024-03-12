import { http, HttpResponse } from "msw";
import { TaskType } from "../components/modules/TaskCard/TaskCard";
import { faker } from "@faker-js/faker";

const tasksList: Array<TaskType> = [];

for (let index = 0; index < 20; index += 1) {
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
  http.get("./api/task", () => {
    return HttpResponse.json(tasksList);
  }),
];
