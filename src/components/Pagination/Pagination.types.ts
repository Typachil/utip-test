export type PaginationProps = {
  rowsPerPage: number
  dataCount: number
  onClick: (page : number) => void
  currentPage: number
  className?: string
}
