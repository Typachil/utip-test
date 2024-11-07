import React, {FC, useState, DragEvent, useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import clsx from 'classnames';
import './Table.scss';
import {tableStore} from "@/store/TableStore.ts";
import {TableRow} from "@/components/Table/components/TableRow";
import {Modal} from "@/components/Modal";
import {Button} from "@/components/Button";
import {Portal} from "@/components/Portal";
import {TableHeadType} from "@/shared/types/table.ts";

export const Table: FC = observer(() => {
    const [draggedRowIndex, setDraggedRowIndex] = useState<number | null>(null);
    const {data, isLoading, sortField, moveRow, sortData, deleteRow} = tableStore;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentRowDel, setCurrentRowDel] = useState<number | null>(null);
    const [headlineWidths, setHeadlineWidths] = useState<number[]>(() => {
        const savedWidths = localStorage.getItem('columnWidths');
        return savedWidths ? JSON.parse(savedWidths) : [180, 100, 100, 150, 150]
    });
    const headlineName: TableHeadType[] = [
        {
            name: 'Имя',
            id: 'name'
        },
        {
            name: 'Рост',
            id: 'height'
        },
        {
            name: 'Масса',
            id: 'mass'
        },
        {
            name: 'Цвет волос',
            id: 'hair_color'
        },
        {
            name: 'Цвет кожи',
            id: 'skin_color'
        }
    ];

    useEffect(() => {
        localStorage.setItem('columnWidths', JSON.stringify(headlineWidths));
    }, [headlineWidths]);

    const handleDragStart = (index: number) => {
        setDraggedRowIndex(index);
    };

    const handleDragOver = (event: DragEvent<HTMLTableRowElement>) => {
        event.preventDefault();
    };

    const handleDrop = (index: number) => {
        if (draggedRowIndex === null || draggedRowIndex === index) return;

        moveRow(draggedRowIndex, index);
        setDraggedRowIndex(null);
    };

    const deleteRowModal = () => {
        if (currentRowDel != null) {
            deleteRow(currentRowDel)
            setModalIsOpen(false)
        }
    }

    const openModal = (indexRow: number) => {
        setCurrentRowDel(indexRow)
        setModalIsOpen(true)
    }

    // Функция для изменения ширины колонки
    const handleColumnResize = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
        const startX = event.pageX;

        const mouseMoveHandler = (moveEvent: MouseEvent) => {
            const newWidth = headlineWidths[index] + (moveEvent.pageX - startX);
            setHeadlineWidths((prevWidths) => {
                const newWidths = [...prevWidths];
                newWidths[index] = Math.max(newWidth, 50);
                return newWidths;
            });
        };

        const mouseUpHandler = () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

    };

    if (isLoading) {
        return <div className='loader'></div>
    }

    if (data.length === 0) {
        return <div className='table-empty'>Нет данных</div>
    }

    return (
        <table border={1} className='table'>
            <thead>
                <tr>
                    {headlineName.map((headline, index) => (
                        <th key={index}
                            style={{width: headlineWidths[index] + 'px'}}
                        >
                            <p
                                className={clsx('table__heading-text', {['table__heading-text--current-sort']: sortField === headline.id})}
                                onClick={() => sortData(headline.id)}
                            >
                                {headline.name}
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 12H21M13 8H21M13 16H21M6 7V17M6 17L3 14M6 17L9 14" stroke="#000000"
                                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </p>
                            {index < headlineName.length && (
                                <div
                                    className="table__resize-handle"
                                    onMouseDown={(event) => handleColumnResize(event, index)}
                                />
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <TableRow
                        row={row}
                        key={row.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        onDelete={() => openModal(row.id)}
                    />
                ))}
            </tbody>
            <Portal>
                <Modal
                    isOpen={modalIsOpen}
                    onClose={() => setModalIsOpen(false)}
                    onOverlayClick={() => setModalIsOpen(false)}
                >
                    <h2 className={'table__modal-title'}>Вы действительно хотите удалить эту строку?</h2>
                    <div className={'table__modal-buttons'}>
                        <Button variant={'error'} onClick={deleteRowModal}>Удалить</Button>
                        <Button onClick={() => setModalIsOpen(false)}>Отменить</Button>
                    </div>
                </Modal>
            </Portal>
        </table>
    )
});

Table.displayName = 'Table';


