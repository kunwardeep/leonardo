import { useReducer } from "react";
import { ISearchFilter, IUseCharacters } from "./useGetCharacters";
import { SearchFilter } from "@/consts";

export enum ActionTypes {
  CHANGE_PAGE = "change_page",
  UPDATE_FILTER_NAME = "update_filter_name",
  UPDATE_FILTER_STATUS = "update_filter_status",
  UPDATE_FILTER_SPECIES = "update_filter_species",
  UPDATE_FILTER_GENDER = "update_filter_gender",
}

export interface IReducerAction {
  type: ActionTypes;
  value: string | number;
}

type DispatchAction = React.Dispatch<IReducerAction>;

export const updatePage = (
  dispatch: DispatchAction,
  value: string | number
) => {
  dispatch({ type: ActionTypes.CHANGE_PAGE, value: value });
};

export const updateNameFilter = (
  dispatch: DispatchAction,
  value: string | number
) => {
  dispatch({ type: ActionTypes.UPDATE_FILTER_NAME, value: value });
};

export const updateStatusFilter = (
  dispatch: DispatchAction,
  value: string | number
) => {
  dispatch({ type: ActionTypes.UPDATE_FILTER_STATUS, value: value });
};

export const updateSpeciesFilter = (
  dispatch: DispatchAction,
  value: string | number
) => {
  dispatch({ type: ActionTypes.UPDATE_FILTER_SPECIES, value: value });
};

export const updateGenderFilter = (
  dispatch: DispatchAction,
  value: string | number
) => {
  dispatch({ type: ActionTypes.UPDATE_FILTER_GENDER, value: value });
};

export type IState = IUseCharacters;

const useQueryVariableReducer = (initialState: IState) => {
  return useReducer(queryVariableReducer, initialState);
};

type FilterKey = keyof ISearchFilter;

const updateFilter = (state: IState, key: FilterKey, value: string) => {
  if (state.filter)
    if (value === "") {
      delete state.filter[key];
    } else {
      state.filter[key] = value;
    }
};

const queryVariableReducer = (
  state: IUseCharacters,
  action: IReducerAction
) => {
  const newState = {
    page: state.page,
    filter: { ...state.filter },
  };

  switch (action.type) {
    case ActionTypes.CHANGE_PAGE:
      newState.page = action.value as number;

      break;
    case ActionTypes.UPDATE_FILTER_NAME:
      updateFilter(newState, SearchFilter.NAME, action.value as string);

      break;
    case ActionTypes.UPDATE_FILTER_STATUS:
      updateFilter(newState, SearchFilter.STATUS, action.value as string);

      break;
    case ActionTypes.UPDATE_FILTER_SPECIES:
      updateFilter(newState, SearchFilter.SPECIES, action.value as string);

      break;
    case ActionTypes.UPDATE_FILTER_GENDER:
      updateFilter(newState, SearchFilter.GENDER, action.value as string);

      break;
  }

  return newState;
};

export default useQueryVariableReducer;
