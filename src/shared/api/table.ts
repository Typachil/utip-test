import {TableRowType} from "../types/table.ts";
import {tableStore} from "@/store/TableStore.ts";

export const fetchData = async (page: number) => {
    const {setData, setDataCount, setLoading, setError} = tableStore;
    setLoading(true);
    setError(null);
    try {
        const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }
        const data = await response.json();
        setData(data.results.map((item: TableRowType, index: number) => ({
            id: index + 1,
            name: item.name,
            height: item.height,
            mass: item.mass,
            hair_color: item.hair_color,
            skin_color: item.skin_color,
        })));
        setDataCount(data.count)
    } catch (error : unknown) {
        setError(error);
    } finally {
        setLoading(false);
    }
};
