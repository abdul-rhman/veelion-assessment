import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "@/store/tasksSlice";
import activityReducer from "@/store/activitySlice";
import reportsReducer from "@/store/reportsSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    activity: activityReducer,
    reports: reportsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
