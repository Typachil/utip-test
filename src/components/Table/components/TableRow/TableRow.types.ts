import {TableRowType} from "@/shared/types/table.ts";
import {HTMLAttributes} from "react";

/**
 *
 */
export type TableRowProps = HTMLAttributes<HTMLElement> & {
  row: TableRowType
  onDelete: () => void
}
