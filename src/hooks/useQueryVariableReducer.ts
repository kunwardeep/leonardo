import { useCallback, useReducer } from "react";
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

export type IState = IUseCharacters;

const useQueryVariableReducer = (initialState: IState) => {
  const [state, dispatch] = useReducer(queryVariableReducer, initialState);

  const updatePage = useCallback(
    (value: number) => {
      dispatch({ type: ActionTypes.CHANGE_PAGE, value: value });
    },
    [dispatch]
  );

  const updateNameFilter = useCallback(
    (value: string) => {
      dispatch({ type: ActionTypes.UPDATE_FILTER_NAME, value: value });
    },
    [dispatch]
  );
  const updateStatusFilter = useCallback(
    (value: string) => {
      dispatch({ type: ActionTypes.UPDATE_FILTER_STATUS, value: value });
    },
    [dispatch]
  );
  const updateSpeciesFilter = useCallback(
    (value: string) => {
      dispatch({ type: ActionTypes.UPDATE_FILTER_SPECIES, value: value });
    },
    [dispatch]
  );
  const updateGenderFilter = useCallback(
    (value: string) => {
      dispatch({ type: ActionTypes.UPDATE_FILTER_GENDER, value: value });
    },
    [dispatch]
  );

  return {
    state,
    updatePage,
    updateNameFilter,
    updateStatusFilter,
    updateSpeciesFilter,
    updateGenderFilter,
  };
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
