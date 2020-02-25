import React from 'react';
import { equals } from 'ramda';

import { Preloader } from 'shared/view/elements';
import { ICommunication } from 'shared/types/redux';

type Status = 'pending' | 'error' | 'success';
export type ResolvedStatus = Exclude<Status, 'pending'>;

type Props = {
  communication: ICommunication;
  children?: React.ReactNode | ((status: Exclude<Status, 'pending'>) => React.ReactNode);
  withPreloader?: boolean;
  onResolve?: (status: Exclude<Status, 'pending'>) => void;
};

type State = {
  status: Status;
};

function isCompletedComm(prev: ICommunication, next: ICommunication): boolean {
  return prev.isRequesting && !next.isRequesting && !next.error;
}

class ResolvedCommunication extends React.Component<Props, State> {
  public state: State = {
    status: 'pending',
  };

  componentDidUpdate(prevProps: Props) {
    const { status } = this.state;
    const { communication: previousComm } = prevProps;
    const { communication: currentComm } = this.props;
    const isCompleted = isCompletedComm(previousComm, currentComm);
    const errorStatus = currentComm.error && 'error';
    const newStatus = isCompleted ? 'success' : errorStatus || 'pending';

    if (!equals(status, newStatus) && !equals(previousComm, currentComm)) {
      const { onResolve } = this.props;
      onResolve && newStatus !== 'pending' && onResolve(newStatus);
      this.setState({ status: newStatus });
    }
  }

  render() {
    const { communication, children, withPreloader } = this.props;
    const { status } = this.state;
    if (status === 'pending') {
      return withPreloader && communication.isRequesting ? <Preloader isShown /> : null;
    }

    return children instanceof Function ? children(status) : children || null;
  }
}

export { ResolvedCommunication };
