import { TableInstance } from 'react-table'
import { ColumnsIcon } from './icons'

interface ColumnHidePageProps<T extends Record<string, unknown>>
  extends TableInstance<T> {
  onClose?: () => void
  show?: boolean
}

const ColumnHidePage = <T extends Record<string, unknown>>(
  props: ColumnHidePageProps<T>
) => {
  const { allColumns, toggleHideColumn, onClose, show } = props
  const hideableColumns = allColumns.filter(
    (column) =>
      column.id !== '_selector' &&
      (column.render('Header') as string)?.length > 0
  )
  const checkedCount = hideableColumns.reduce(
    (acc, val) => acc + (val.isVisible ? 0 : 1),
    0
  )
  const onlyOneOptionLeft = checkedCount + 1 >= hideableColumns.length
  return hideableColumns.length > 3 ? (
    <div className="dropdown-down  dropdown lg:dropdown-end">
      <div
        className=" tooltip tooltip-right   hover:tooltip-open lg:tooltip-left"
        data-tip="Show/Hide columns"
      >
        <button
          // tabIndex="0"
          className="btn btn-ghost  btn-circle"
          // onClick={() => {}}
        >
          <ColumnsIcon className="h-5 w-5" />
        </button>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box min-w-[200px] bg-base-200 p-2 shadow-lg max-h-96 overflow-y-auto"
      >
        {hideableColumns.map((column) => (
          <li key={column.id} className="flex">
            <label className="dmc-label normal-case p-3  flex">
              <input
                disabled={column.isVisible && onlyOneOptionLeft}
                type={'checkbox'}
                checked={column.isVisible}
                className="dmc-form-checkbox"
                onChange={() => toggleHideColumn(column.id, column.isVisible)}
              />
              {column.render('Header')}{' '}
            </label>
          </li>
        ))}
      </ul>
    </div>
  ) : null
}

export default ColumnHidePage
