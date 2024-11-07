import { makeAutoObservable } from 'mobx';
import {TableHeadType, TableRowType} from "@/shared/types/table.ts";

export class TableStore {
  data: TableRowType[] = [];
  dataCount: number = 0;
  tableHeadlines: TableHeadType[] = [
    {name: 'name', width: 150},
    {name: 'height', width: 100},
    {name: 'mass', width: 100},
    {name: 'hair_color', width: 100},
    {name: 'skin_color', width: 100},
  ];
  currentPage: number = 1;
  rowsPerPage: number = 10;
  sortField: string = 'col1'; // Поле для сортировки
  sortOrder: 'asc' | 'desc' = 'asc'; // Порядок сортировки
  isLoading: boolean = false;
  error: string | unknown;

  constructor() {
    makeAutoObservable(this);
    this.initializeData();
  }

  initializeData() {
    const storedData = localStorage.getItem('tableData');
    const currentPage = localStorage.getItem('currentPage')
    const tableDataCount = localStorage.getItem('tableDataCount')

    this.data = storedData ? JSON.parse(storedData) : [];
    this.currentPage = currentPage ? JSON.parse(currentPage) : 1;
    this.dataCount = tableDataCount ? JSON.parse(tableDataCount) : 0;
  }

  setData = (data : TableRowType[]) => {
    this.data = data;
  }

  setDataCount = (count: number) => {
    this.dataCount = count;
  }

  deleteRow = (id: number) => {
    this.data = this.data.filter(row => row.id !== id);
  }

  setPage = (page: number) => {
    this.currentPage = page;
  }

  setLoading = (loading: boolean) => {
    this.isLoading = loading;
  }

  setError = (error: string | unknown) => {
    this.error = error;
  }

  moveRow = (fromIndex: number, toIndex: number) => {
    const row = this.data[fromIndex];
    this.data.splice(fromIndex, 1);
    this.data.splice(toIndex, 0, row);
  }

  setWidthTableHeadlines = (arr: TableHeadType[]) => {
    this.tableHeadlines = arr
  }

  sortData = (field: string) => {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';

    this.data.sort((a : TableRowType, b : TableRowType) => {
      if (a[field as keyof TableRowType] < b[field as keyof TableRowType]) return this.sortOrder === 'asc' ? -1 : 1;
      if (a[field as keyof TableRowType] > b[field as keyof TableRowType]) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }
}

export const tableStore = new TableStore();
