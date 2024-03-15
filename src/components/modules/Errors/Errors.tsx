import { ReactElement } from "react";
import "./Errors.css";

export function Error({ errorText }: { errorText: string }): ReactElement {
  return <div className="error">{errorText}</div>;
}
