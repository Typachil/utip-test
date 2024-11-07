import {FC, useState, DragEvent, useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import './Table.scss';
import {tableStore} from "@/store/TableStore.ts";
import {TableRow} from "@/components/Table/components/TableRow";
import {Modal} from "@/components/Modal";
import {Button} from "@/components/Button";
import {Portal} from "@/components/Portal";

export const Table: FC = observer(() => {
    const [draggedRowIndex, setDraggedRowIndex] = useState<number | null>(null);
    const {data, isLoading, moveRow, sortData, deleteRow} = tableStore;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentRowDel, setCurrentRowDel] = useState<number | null>(null);
    const [headlineWidths, setHeadlineWidths] = useState<number[]>(() => {
        const savedWidths = localStorage.getItem('columnWidths');
        return savedWidths ? JSON.parse(savedWidths) : [180, 100, 100, 150, 150]
    });
    const headlineName = ['Имя', 'Рост', 'Масса', 'Цвет волос', 'Цвет кожи'];

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
    const handleColumnResize = (index: number) => {
        return (event: MouseEvent) => {
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
    };

    if (isLoading) {
        return <div className='loader'></div>
    }

    if (data.length === 0) {
        return <div className='table-empty'>Нет данных</div>
    }

    return (
        <table className='table'>
            <thead>
            <tr>
                {headlineName.map((headline, index) => (
                    <th key={index}
                        style={{width: headlineWidths[index] + 'px'}}
                    >
                        <p onClick={() => sortData(headline)}>{headline}</p>
                        {index < headlineName.length - 1 && (
                            <div
                                className="table__resize-handle"
                                onMouseDown={() => handleColumnResize(index)}
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

