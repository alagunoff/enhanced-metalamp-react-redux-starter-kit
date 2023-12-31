import React from 'react';
import block from 'bem-cn';
import { autobind } from 'core-decorators';

import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import * as repositoriesSearch from 'features/repositoriesSearch';
import { withAsyncFeatures } from 'core';

import { Layout } from '../../../../shared';
import './RepositoriesSearchLayout.scss';

interface IState {
  lastSubmittedFormState: repositoriesSearch.namespace.IRepositoriesSearchFormFields | null;
}

interface IFeatureProps {
  repositoriesSearchFeatureEntry: repositoriesSearch.Entry;
}

type IProps = IFeatureProps & ITranslationProps;

const b = block('repositories-search-layout');

class RepositoriesSearchLayoutComponent extends React.Component<IProps, IState> {
  public state: IState = {
    lastSubmittedFormState: null,
  };

  public render() {
    const { repositoriesSearchFeatureEntry: { containers }, t } = this.props;
    const { RepositoriesSearchForm, RepositoriesSearchResults } = containers;
    const { lastSubmittedFormState } = this.state;

    return (
      <Layout title={t(tKeys.features.userSearch.repositoriesSearch)}>
        <div className={b()}>
          <div className={b('search-form')}>
            <RepositoriesSearchForm onSubmit={this.setLastSubmittedFormState} />
          </div>
          <div className={b('results')}>
            {lastSubmittedFormState && (
              <RepositoriesSearchResults searchOptions={lastSubmittedFormState} />
            )}
          </div>
        </div>
      </Layout>
    );
  }

  @autobind
  private setLastSubmittedFormState(
    formState: repositoriesSearch.namespace.IRepositoriesSearchFormFields,
  ) {
    this.setState({ lastSubmittedFormState: formState });
  }
}

const RepositoriesSearchLayout = withAsyncFeatures({
  repositoriesSearchFeatureEntry: repositoriesSearch.loadEntry,
})(withTranslation()(RepositoriesSearchLayoutComponent));

export {
  RepositoriesSearchLayout,
  RepositoriesSearchLayoutComponent,
  IProps as IRepositoriesSearchLayoutProps,
};
