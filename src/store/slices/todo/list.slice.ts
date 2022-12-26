import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISortItem {
  filter: string;
  state: boolean;
}

export interface ITodoDelete {
  isDeleteAll: boolean;
  id: number;
}

export interface ITasks {
  id: number;
  name: string;
  category: string;
  priority: number;
  date: string;
  status: boolean;
  description: string;
}

interface IStateInitial {
  list: ITasks[];
  filters: {
    name: "name";
    category: "category";
    priority: "priority";
    date: "date";
    status: "status";
  };
}

const initialStateValue: IStateInitial = {
  list: [
    {
      id: 1,
      name: "изучить react",
      category: "обучение",
      priority: 2,
      date: "2022-04-29",
      status: false,
      description: "изучить angular и все связанные с ним технологии",
    },
    {
      id: 2,
      name: "продать honor",
      category: "продажа",
      priority: 0,
      date: "2022-09-01",
      status: true,
      description: "продать фитнес браслет honor",
    },
    {
      id: 3,
      name: "купить apple watch",
      category: "покупка",
      priority: 1,
      date: "2022-06-02",
      status: false,
      description: "купить apple watch",
    },
    {
      id: 4,
      name: "отдых на горе море",
      category: "поездка",
      priority: 1,
      date: "2022-09-20",
      status: true,
      description: "поехать с палатками на горе море",
    },
    {
      id: 5,
      name: "сходить на брусья",
      category: "спорт",
      priority: 2,
      date: "2022-08-03",
      status: false,
      description: "отжиматься на брусьях",
    },
  ],
  filters: {
    name: "name",
    category: "category",
    priority: "priority",
    date: "date",
    status: "status",
  },
};

export const ListSlice = createSlice({
  name: "todo",
  initialState: initialStateValue,
  reducers: {
    toggleComplete(state, action: PayloadAction<number>) {
      const task = state.list.find((item) => item.id === action.payload);
      if (!!task) {
        task.status = !task.status;
      }
    },
    completeAll(state) {
      state.list.map((item) => (item.status = true));
    },
    setAll(state) {
      state.list.map((item) => (item.status = false));
    },
    todoDelete(state, action: PayloadAction<ITodoDelete>) {
      if (action.payload.isDeleteAll) {
        state.list.length = 0;
      } else {
        state.list = state.list.filter((item) => item.id !== action.payload.id);
      }
    },
    sortItems(state, action: PayloadAction<ISortItem>) {
      const sortValue = (a: any, b: any, state: boolean) => {
        return a < b ? (state ? 1 : -1) : state ? -1 : 1;
      };

      state.list.sort((a, b) => {
        switch (action.payload.filter) {
          case state.filters.name:
            return sortValue(a.name.toLowerCase(), b.name.toLowerCase(), action.payload.state);

          case state.filters.date:
            return sortValue(a.date, b.date, action.payload.state);

          case state.filters.status:
            return sortValue(a.status, b.status, action.payload.state);

          case state.filters.priority:
            return sortValue(a.priority, b.priority, action.payload.state);

          case state.filters.category:
            return sortValue(a.category, b.category, action.payload.state);

          default:
            return 0;
        }
      });
    },
  },
});

export const { toggleComplete, completeAll, setAll, todoDelete, sortItems } = ListSlice.actions;
export default ListSlice.reducer;
