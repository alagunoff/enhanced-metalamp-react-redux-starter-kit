import { IAppReduxState } from 'shared/types/app';

function selectFeatureState(state: IAppReduxState) {
  return state.login;
}

export function selectProfile(state: IAppReduxState) {
  return selectFeatureState(state).edit.profile;
}
