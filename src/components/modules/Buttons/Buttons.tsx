import "./Buttons.css";

interface ButtonType {
  text: string;
}

export function ActiveButton({ text }: ButtonType) {
  return <button className="active-button">{text}</button>;
}
export function CloseButton({ text }: ButtonType) {
  return <button className="close-button">{text}</button>;
}
