import React from 'react';

import {FormProvider, useForm, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ButtonGroup, Button, Label} from 'reactstrap';

import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';
import AdvertiserSelect from './AdvertiserSelect';
import DspSelect from './DspSelect';
import EmbeddedScript from './EmbeddedScript';
import PublisherSelect from './PublisherSelect';

const RoleRefs = {
  PUBLISHER: 'publisher',
  DSP: 'dsp',
  ADVERTISER: 'advertiser'
};

const propTypes = {};

const AudienceActivation = () => {
  // Local States
  const [roleRef, setRoleRef] = React.useState('');
  const {t} = useTranslation();
  const userRole = getRole();

  const methods = useForm();
  const {control} = methods;
  const roleRefVal = useWatch({control, name: 'role_ref_uuid'});

  function onClickBtn(evt, _roleRef) {
    evt.preventDefault();
    setRoleRef(_roleRef);
  }

  return (
    <>
      {userRole === USER_ROLE.ADMIN && (
        <div className="d-flex justify-content-end">
          <ButtonGroup>
            <Button
              type="button"
              outline={roleRef !== RoleRefs.PUBLISHER ? true : false}
              color="primary"
              onClick={evt => onClickBtn(evt, RoleRefs.PUBLISHER)}
            >
              Publisher
            </Button>
            <Button
              type="button"
              outline={roleRef !== RoleRefs.DSP ? true : false}
              color="primary"
              onClick={evt => onClickBtn(evt, RoleRefs.DSP)}
            >
              DSP
            </Button>
            <Button
              type="button"
              outline={roleRef !== RoleRefs.ADVERTISER ? true : false}
              color="primary"
              onClick={evt => onClickBtn(evt, RoleRefs.ADVERTISER)}
            >
              Advertiser
            </Button>
          </ButtonGroup>
        </div>
      )}

      <div>
        <FormProvider {...methods}>
          <form id="activationFormId">
            {(roleRef === RoleRefs.PUBLISHER ||
              userRole === USER_ROLE.PUBLISHER) && (
              <div>
                <PublisherSelect
                  name="role_ref_uuid"
                  label={t('publisher')}
                  placeholder={t('selectPublisher')}
                  defaultValue={null}
                />
              </div>
            )}
            {(roleRef === RoleRefs.DSP || userRole === USER_ROLE.DSP) && (
              <div>
                <DspSelect
                  name="role_ref_uuid"
                  label={t('dsp')}
                  placeholder={t('selectDsp')}
                  defaultValue={null}
                />
              </div>
            )}
            {(roleRef === RoleRefs.ADVERTISER ||
              userRole === USER_ROLE.ADVERTISER) && (
              <div>
                <AdvertiserSelect
                  name="role_ref_uuid"
                  label={t('advertiser')}
                  placeholder={t('selectAdvertiser')}
                  defaultValue={null}
                />
              </div>
            )}
          </form>
        </FormProvider>
      </div>
      {roleRefVal && (
        <div>
          <Label>Embedded script</Label>
          <EmbeddedScript roleRefId={roleRefVal?.value} roleRef={roleRef} />
        </div>
      )}
    </>
  );
};

AudienceActivation.propTypes = propTypes;

export default AudienceActivation;
