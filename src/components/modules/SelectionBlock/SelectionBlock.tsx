import { BlockTitle } from "../Titles/Titles";
import "./SelectionBlock.css";

type setStateForProps = {
  setTypeSort: React.Dispatch<React.SetStateAction<string>>;
  setFilterMarks: React.Dispatch<React.SetStateAction<Array<string>>>;
  setFilterPriority: React.Dispatch<React.SetStateAction<Array<string>>>;
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>;
  filterMarks: Array<string>;
  filterPriority: Array<string>;
  typeSort: string;
};

export default function SelectionBlock({
  setTypeSort,
  typeSort,
  setFilterPriority,
  setFilterMarks,
  filterMarks,
  filterPriority,
  setIsSorting,
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
                setIsSorting(true);
                setTypeSort(value);
              }}
              onClick={({ currentTarget }) => {
                if (typeSort === currentTarget.value) {
                  currentTarget.checked = false;
                  setIsSorting(true);
                  setTypeSort("default");
                }
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
                setIsSorting(true);
                setTypeSort(value);
              }}
              onClick={({ currentTarget }) => {
                if (typeSort === currentTarget.value) {
                  currentTarget.checked = false;
                  setIsSorting(true);
                  setTypeSort("default");
                }
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
                onChange={({ target: { value } }) => {
                  if (filterPriority.indexOf(value) === -1) {
                    setFilterPriority([...filterPriority, value]);
                  } else {
                    setFilterPriority((filterPriority) =>
                      filterPriority.filter((task) => task !== value)
                    );
                  }
                  setIsSorting(true);
                }}
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
                onChange={({ target: { value } }) => {
                  if (filterPriority.indexOf(value) === -1) {
                    setFilterPriority([...filterPriority, value]);
                  } else {
                    setFilterPriority((filterPriority) =>
                      filterPriority.filter((task) => task !== value)
                    );
                  }
                  setIsSorting(true);
                }}
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
                onChange={({ target: { value } }) => {
                  if (filterPriority.indexOf(value) === -1) {
                    setFilterPriority([...filterPriority, value]);
                  } else {
                    setFilterPriority((filterPriority) =>
                      filterPriority.filter((task) => task !== value)
                    );
                  }
                  setIsSorting(true);
                }}
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
                onChange={({ target: { value } }) => {
                  if (filterMarks.indexOf(value) === -1) {
                    setFilterMarks([...filterMarks, value]);
                  } else {
                    setFilterMarks((filterMarks) =>
                      filterMarks.filter((task) => task !== value)
                    );
                  }
                  setIsSorting(true);
                }}
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
                onChange={({ target: { value } }) => {
                  if (filterMarks.indexOf(value) === -1) {
                    setFilterMarks([...filterMarks, value]);
                  } else {
                    setFilterMarks((filterMarks) =>
                      filterMarks.filter((task) => task !== value)
                    );
                  }
                  setIsSorting(true);
                }}
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
                onChange={({ target: { value } }) => {
                  if (filterMarks.indexOf(value) === -1) {
                    setFilterMarks([...filterMarks, value]);
                  } else {
                    setFilterMarks((filterMarks) =>
                      filterMarks.filter((task) => task !== value)
                    );
                  }
                  setIsSorting(true);
                }}
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
