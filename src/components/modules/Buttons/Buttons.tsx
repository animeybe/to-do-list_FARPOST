import { ReactElement } from "react";
import "./Buttons.css";

type ButtonType = {
  onClick?: () => void;
  text: string;
};

export function ActiveButton({ text, onClick }: ButtonType): ReactElement {
  return (
    <button onClick={onClick} className="active-button">
      {text}
    </button>
  );
}
export function BackButton({ text, onClick }: ButtonType): ReactElement {
  return (
    <button onClick={onClick} className="back-button">
      {text}
    </button>
  );
}
export function CloseButton({ text, onClick }: ButtonType): ReactElement {
  return (
    <button onClick={onClick} className="close-button">
      {text}
    </button>
  );
}
