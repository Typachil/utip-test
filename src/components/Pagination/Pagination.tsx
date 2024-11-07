import { FC} from 'react';

import type { PaginationProps } from './Pagination.types.ts';
import {Button} from "@/components/Button";
import clsx from "classnames";

import './Pagination.scss';

export const Pagination: FC<PaginationProps> = ({
    rowsPerPage = 10,
    dataCount,
    onClick,
    currentPage,
    className
}) => {
  const totalPages = Math.ceil(dataCount / rowsPerPage);
  const classes = clsx('pagination', className);

  return (
      <div className={classes}>
        {Array.from({length: totalPages}, (_, index) => (
            <Button
                key={index}
                onClick={() => onClick?.(index+1)}
                className={clsx('pagination__button', {['pagination__button--active']: index + 1 === currentPage})}>
              {index + 1}
            </Button>
        ))}
      </div>
  )
};

Pagination.displayName = 'Pagination';
