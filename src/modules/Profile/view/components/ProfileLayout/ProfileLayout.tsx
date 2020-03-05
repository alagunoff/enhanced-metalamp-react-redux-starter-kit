import React from 'react';
import block from 'bem-cn';

import { useTranslation, tKeys } from 'services/i18n';
import { UserEdit } from 'services/user';

import { Layout } from '../../../../shared';
import './ProfileLayout.scss';

const b = block('profile-layout');

function ProfileLayout() {
  const { t } = useTranslation();

  return (
    <Layout title={t(tKeys.features.profile.editProfile)}>
      <div className={b()}>
        <UserEdit />
      </div>
    </Layout>
  );
}

export { ProfileLayout };
