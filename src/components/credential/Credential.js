//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';

//---> Internal Modules
import SecretKey from './SecretKey';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';
import {useGetCredentials, useReGenerateCredential} from 'queries/credential';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {ButtonLoading, DialogConfirm} from 'components/common';
import {DEFAULT_PAGINATION} from 'constants/misc';

//---> Define prop types
const propTypes = {
  isUser: PropTypes.bool,
  type: PropTypes.string,
  referenceId: PropTypes.number
};

const Credential = ({isUser = false, type = 'user', referenceId}) => {
  const role = getRole();
  const isAdmin = role === USER_ROLE.ADMIN ? true : false;
  const [enableApi, setEnableApi] = React.useState(false);
  let params = {
    type,
    status: 'active',
    limit: 1000,
    page: DEFAULT_PAGINATION.page
  };

  if (type !== 'user') {
    params = {...params, reference_id: referenceId};
  }
  const {data: {items = []} = {}, isFetching, isFetched} = useGetCredentials({
    params,
    enabled: enableApi
  });

  console.log('🚀 ~ file: Credential.js ~ line 38 ~ Credential ~ items', items);

  const {mutateAsync: regenerateCredential} = useReGenerateCredential();
  const [secretKey, setSecretKey] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const credentialId = React.useMemo(() => {
    return items?.[0]?.uuid;
  }, [items]);

  React.useEffect(() => {
    setSecretKey(items?.[0]?.secret_key ?? '');
  }, [items]);

  function onClickCredential(evt) {
    evt.preventDefault();
    setEnableApi(true);
  }

  async function onClickReGenerate(evt) {
    evt.preventDefault();
    setIsGenerating(true);
    try {
      const {data} = await regenerateCredential({id: credentialId});
      const newScretKey = data?.secret_key ?? '';
      setSecretKey(newScretKey);
      ShowToast.success('Re-generated new credential successfully');
    } catch (err) {
      ShowToast.error(err.msg ?? 'Fail to re-generate credential');
    } finally {
      setIsGenerating(false);
    }
  }

  async function onClickGenerate(evt) {
    evt.preventDefault();
    setIsGenerating(true);
    try {
      const {data} = await regenerateCredential({id: credentialId});
      const newScretKey = data?.secret_key ?? '';
      setSecretKey(newScretKey);
      ShowToast.success('Generated new credential successfully');
    } catch (err) {
      ShowToast.error(err.msg ?? 'Fail to re-generate credential');
    } finally {
      setIsGenerating(false);
    }
  }

  React.useEffect(() => {
    if (isFetched) {
      setEnableApi(false);
    }
  }, [isFetched]);

  return (
    <>
      <div>
        <ButtonLoading
          type="button"
          onClick={onClickCredential}
          disabled={isFetching || isGenerating || isFetched}
          isLoading={isFetching}
          className="btn-primary"
        >
          Credential
        </ButtonLoading>
        {isUser && isFetched && (
          <ButtonLoading
            type="button"
            onClick={onClickReGenerate}
            disabled={isFetching || isGenerating}
            isLoading={isGenerating}
            className="ml-2 btn-warning"
          >
            Re-Generate
          </ButtonLoading>
        )}
        {isAdmin && !isUser && (
          <ButtonLoading
            className="btn-success ml-2"
            type="button"
            onClick={onClickGenerate}
            disabled={isFetching || isGenerating}
            isLoading={isGenerating}
          >
            Generate
          </ButtonLoading>
        )}
      </div>
      {isFetched && !isGenerating && <SecretKey secretKey={secretKey} />}
      <DialogConfirm />
    </>
  );
};

Credential.propTypes = propTypes;

export default Credential;
