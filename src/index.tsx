import {Table} from "@/components/Table";
import {Button} from "@/components/Button";
import {fetchData} from "@/shared/api/table.ts";
import {tableStore} from "@/store/TableStore.ts";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {Pagination} from "@/components/Pagination";

const IndexPage = observer(() => {
    const {data, currentPage, dataCount, rowsPerPage, setData, setPage, setDataCount} = tableStore;

    useEffect(() => {
        window.onbeforeunload = function() {
            localStorage.setItem('tableData', JSON.stringify(data))
            localStorage.setItem('tableDataCount', JSON.stringify(dataCount))
            localStorage.setItem('currentPage', JSON.stringify(currentPage))
        };
    }, [data, dataCount, currentPage])

    const handleClickGetData = async (page: number) => {
        setPage(page)
        await fetchData(page);
    };

    const handleClickClearData = () => {
        setData([])
        setDataCount(0)
    };

    return (
        <main>
            <section className='container'>
                <h1>Таблица Star Wars</h1>
                <div>
                    <div className='buttons-group'>
                        <Button component={Link} to={'/form'} variant={'success'}>
                            Перейти к форме
                        </Button>
                        <Button onClick={handleClickClearData} variant={'secondary'}>
                            Очистить таблицу
                        </Button>
                        <Button onClick={() => handleClickGetData(1)}>
                            Получить данные
                        </Button>
                    </div>
                    <div className='table-block'>
                        <Table/>
                        <Pagination
                            rowsPerPage={rowsPerPage}
                            dataCount={dataCount}
                            currentPage={currentPage}
                            onClick={handleClickGetData}/>
                    </div>
                </div>
            </section>
        </main>
    )
})

export default IndexPage
