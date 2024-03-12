import "./Titles.css";

interface TitleType {
  title: string;
}
export function GeneralTitle({ title }: TitleType) {
  return (
    <>
      <h1 className="general-title">
        <div className="general-title__text">{title}</div>
      </h1>
    </>
  );
}
export function BlockTitle({ title }: TitleType) {
  return <h2 className="block-title">{title}</h2>;
}
