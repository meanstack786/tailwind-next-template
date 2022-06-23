import React, { PropsWithChildren, useEffect, useRef } from 'react'
import 'regenerator-runtime/runtime'
import Pagination from './pagination'
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
  TableOptions,
  TableInstance,
  Row,
  useRowSelect,
  TableState,
} from 'react-table'
import { FilterBar, useGlobalMatchSorter } from './filter'
import { TableHeader, TBody } from './table'
import { selectionHook } from './hooks'
import { ToolBar } from './toolbar'
import { useDebounce, useLocalStorage } from 'lib/utils'
import ColumnHidePage from './column-hide-page'
import classNames from 'classnames'
// import { useDebounce, useLocalStorage } from 'lib/utils'

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  name?: string
  onAdd?: (instance: TableInstance<T>) => void
  onDelete?: (instance: TableInstance<T>) => void
  onClick?: (row: Row<T>) => void
  disableSelection?: boolean
  disableGlobalMatchSorter?: boolean
  isLoading?: boolean
  className?: string
  tableClassName?: string
  onStateChange?: (state: TableState<T>) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ComboTable<T extends Record<string, any>>(
  props: PropsWithChildren<TableProperties<T>>
) {
  // Use the state and functions returned from useTable to build your UI

  const globalFilter = useGlobalMatchSorter<T>()

  const {
    name,
    onAdd,
    onDelete,
    onClick,
    onStateChange,
    disableSelection = true,
    isLoading,
    disableGlobalFilter,
    disableGlobalMatchSorter = false,
    initialState: initialStateProp,
    data,
    className,
    tableClassName,
    ...others
  } = props
  const [initialState, setInitialState] = useLocalStorage(
    name ? `tableState:${name}` : '',
    initialStateProp ?? {}
  )
  const slectHooks = !disableSelection ? [useRowSelect, selectionHook] : []
  const hooks = [
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination, // new
    // useBlockLayout,
    // useResizeColumns,
    // useFlexLayout,
    // useResizeColumns,
    ...slectHooks,
  ]
  const instance = useTable(
    {
      ...others,
      data,
      globalFilter: !disableGlobalMatchSorter ? globalFilter : undefined,
      initialState,
      disableGlobalFilter,
    },
    ...hooks
  )
  const { state, getTableProps } = instance
  const debouncedState = useDebounce(state, 500)
  useEffect(() => {
    const { sortBy, filters, pageSize, columnResizing, hiddenColumns } =
      debouncedState
    const val = {
      sortBy,
      filters,
      pageSize,
      columnResizing,
      hiddenColumns,
    }
    name && setInitialState(val)
  }, [setInitialState, debouncedState, name])

  const onStateChangeRef = useRef(onStateChange)
  onStateChangeRef.current = onStateChange
  useEffect(() => {
    if (onStateChangeRef.current) {
      onStateChangeRef.current(debouncedState)
    }
  }, [debouncedState])

  // Render the UI for your table
  const { ...othertable } = getTableProps()

  return (
    <>
      <div className=" flex flex-1  flex-col-reverse  sm:justify-end lg:flex-row lg:justify-between">
        <FilterBar {...instance} disableGlobalFilter={disableGlobalFilter} />
        <div className="mb-2 flex gap-x-2">
          <ColumnHidePage {...instance} />
          <ToolBar instance={instance} {...{ onAdd, onDelete }} />
        </div>
      </div>
      <div
        className={`mt-4 flex flex-col overflow-x-auto ${
          !!className ? className : ''
        }`}
      >
        <table
          {...othertable}
          className={classNames(
            `table ${tableClassName ? tableClassName : ''}`,
            {
              'before:spinner  min-h-[200px]   before:left-1/2  before:top-1/2':
                isLoading,
            },
            {
              "min-h-[200px] before:absolute  before:left-1/2 before:top-1/2  before:content-['NO_DATA']":
                !isLoading && !data.length,
            }
          )}
        >
          <TableHeader {...instance} />
          <TBody {...instance} onClick={onClick} />
        </table>
      </div>
      <Pagination {...instance} />
    </>
  )
}

export default ComboTable
