import { FC } from 'react'
import { UsePaginationInstanceProps, UsePaginationState } from 'react-table'
import { Button, PageButton } from './button'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from './icons'

const Pagination: FC<
  Omit<UsePaginationInstanceProps<never>, 'page'> & {
    state: UsePaginationState<never>
  }
> = ({
  previousPage,
  canPreviousPage,
  nextPage,
  canNextPage,
  state,
  pageOptions,
  setPageSize,
  gotoPage,
  pageCount,
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-x-2">
          <label className="text-sm label">
            <span className=" mr-2">Page</span>
            <span className="font-medium mr-1">
              {state.pageIndex + 1}
            </span> of{' '}
            <span className="font-medium ml-1"> {pageOptions?.length}</span>
          </label>
          <label>
            <select
              className="dmc-form-select   select-bordered   select   mt-1 block w-full "
              value={state.pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[5, 10, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </label>
        </div>
        <nav
          className=" relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <PageButton
            className="rounded-l-md"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">First</span>
            <ChevronDoubleLeftIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </PageButton>
          <PageButton
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </PageButton>
          <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
            <span className="sr-only">Next</span>
            <ChevronRightIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </PageButton>
          <PageButton
            className="rounded-r-md"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <span className="sr-only">Last</span>
            <ChevronDoubleRightIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </PageButton>
        </nav>
      </div>
    </div>
  )
}

export default Pagination
