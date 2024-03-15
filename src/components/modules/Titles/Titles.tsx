import { ReactElement } from "react";
import "./Titles.css";

type TitleType = {
  className?: string;
  title: string;
};

export function GeneralTitle({ title, className }: TitleType): ReactElement {
  return (
    <>
      <h1 className="general-title">
        <div className={`general-title__text ${className}`}>{title}</div>
      </h1>
    </>
  );
}
export function BlockTitle({ title, className }: TitleType): ReactElement {
  return <h2 className={`block-title ${className}`}>{title}</h2>;
}
