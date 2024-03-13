import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TaskCard.css";

export type TaskType = {
  id: number;
  title: string;
  description: string;
  dateСreation: Date;
  priority: string;
  marks: Array<string>;
}

export function TaskCard({
  id,
  title,
  dateСreation,
  priority,
  marks,
}: TaskType) {
  const [dateСreationAsString, setDateСreationAsString] = useState<string>();

  useEffect(() => {
    const dateTask: Date = new Date(dateСreation);
    const dateNow: Date = new Date();
    if (Math.abs(dateNow.getTime() - dateTask.getTime()) / 36e5 < 21) {
      setDateСreationAsString(
        `${Math.round(
          Math.abs(dateNow.getTime() - dateTask.getTime()) / 36e5
        )} часов назад`
      );
    } else {
      setDateСreationAsString(
        `${dateTask.toLocaleString("ru", {
          month: "long",
          day: "numeric",
        })} ${dateTask.getFullYear()}, ${dateTask.getHours()}:${dateTask.getMinutes()}`
      );
    }
  }, []);

  return (
    <Link to={`/${id}`}>
      <div className="task-card">
        <div className="task-card__title">{title}</div>
        <div className="task-card__creation-date">
          Создано: {dateСreationAsString}
        </div>
        <div className="task-card__priority">Приоритет: {priority}</div>
        <div className="task-card__marks">Отметки: {marks.join(", ")}</div>
      </div>
    </Link>
  );
}
