import { BlockTitle } from "../Titles/Titles";
import "./SelectionBlock.css";

interface setStateForProps {
  setCurrentSortingType: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function SelectionBlock({
  setCurrentSortingType,
}: setStateForProps) {
  return (
    <>
      <div className="selection-block-wrapper">
        <div className="sort-wrapper">
          <div className="sort__title title">
            <BlockTitle title="Сортировка" />
          </div>
          <div className="sort__item sort__item_new">
            <input
              onChange={({ target: { value } }) => {
                setCurrentSortingType(value);
              }}
              className="radio"
              type="radio"
              value="new"
              name="sort"
            />
            <label className="sort__label label" htmlFor="new">
              Новые
            </label>
          </div>
          <div className="sort__item sort__item_old">
            <input
              onChange={({ target: { value } }) => {
                setCurrentSortingType(value);
              }}
              className="radio"
              type="radio"
              value="old"
              name="sort"
            />
            <label className="sort__label label" htmlFor="old">
              Старые
            </label>
          </div>
        </div>
        <div className="priority-and-mark-wrapper">
          <div className="priority-wrapper">
            <div className="priority__title title">
              <BlockTitle title="Приоритет" />
            </div>
            <div className="priority__item priority__item_low">
              <input
                className="checkbox"
                type="checkbox"
                value="low"
                name="priority"
              />
              <label className="priority__label label" htmlFor="low">
                Low
              </label>
            </div>
            <div className="priority__item priority__item_normal">
              <input
                className="checkbox"
                type="checkbox"
                value="normal"
                name="priority"
              />
              <label className="priority__label label" htmlFor="normal">
                Normal
              </label>
            </div>
            <div className="priority__item priority__item_high">
              <input
                className="checkbox"
                type="checkbox"
                value="high"
                name="priority"
              />
              <label className="priority__label label" htmlFor="high">
                High
              </label>
            </div>
          </div>
          <div className="mark-wrapper">
            <div className="mark__title title">
              <BlockTitle title="Отметка" />
            </div>
            <div className="mark__item mark__item_low">
              <input
                className="checkbox"
                type="checkbox"
                value="research"
                name="mark"
              />
              <label className="mark__label label" htmlFor="research">
                Research
              </label>
            </div>
            <div className="mark__item mark__item_new">
              <input
                className="checkbox"
                type="checkbox"
                value="design"
                name="mark"
              />
              <label className="mark__label label" htmlFor="design">
                Design
              </label>
            </div>
            <div className="mark__item mark__item_new">
              <input
                className="checkbox"
                type="checkbox"
                value="development"
                name="mark"
              />
              <label className="mark__label label" htmlFor="development">
                Development
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
