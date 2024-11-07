import {FC} from 'react';

import type {TableRowProps} from './TableRow.types.ts';
import {Button} from "@/components/Button";

export const TableRow: FC<TableRowProps> = ({
    row,
    onDelete,
    ...rest
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id , ...valueTd} = row

    return (
        <tr {...rest}>
            {
                Object.values(valueTd).map((cell, index) => (
                    <td key={index}>
                        {cell}
                    </td>
                ))
            }
            <td>
                <Button variant={'error'} onClick={onDelete}>Удалить</Button>
            </td>
        </tr>
    );
};
