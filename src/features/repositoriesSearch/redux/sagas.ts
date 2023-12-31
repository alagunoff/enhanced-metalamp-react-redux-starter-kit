import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';
import { IRepositoriesSearchResults } from 'shared/types/githubSearch';
import { actionCreators as notificationActionCreators } from 'services/notification';

import * as NS from '../namespace';
import * as actionCreators from './actionCreators';

function getSaga(deps: IDependencies) {
  const searchRepositoriesType: NS.ISearchRepositories['type'] =
    'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES';
  return function* saga(): SagaIterator {
    yield all([takeLatest(searchRepositoriesType, executeSearchRepositories, deps)]);
  };
}

function* executeSearchRepositories({ api }: IDependencies, { payload }: NS.ISearchRepositories) {
  try {
    const { searchOptions, page } = payload;
    const { searchString, ...filters } = searchOptions;
    const searchResults: IRepositoriesSearchResults = yield call(
      api.searchRepositories,
      searchString,
      filters,
      page,
    );
    yield put(actionCreators.searchRepositoriesSuccess({ ...searchResults, page }));
    if (searchResults.data.length === 0) {
      yield put(
        notificationActionCreators.setNotification({
          kind: 'error',
          text: 'No repositories found :(',
        }),
      );
    }
  } catch (error) {
    const errorMsg = getErrorMsg(error);
    yield put(actionCreators.searchRepositoriesFail(errorMsg));
    yield put(notificationActionCreators.setNotification({ kind: 'error', text: errorMsg }));
  }
}

export { getSaga };
