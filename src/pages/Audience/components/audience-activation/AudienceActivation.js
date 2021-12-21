import React from 'react';

import {FormProvider, useForm, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ButtonGroup, Button, Label} from 'reactstrap';

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
  const methods = useForm();
  const {control} = methods;
  const roleRefVal = useWatch({control, name: 'role_ref_uuid'});

  function onClickBtn(evt, _roleRef) {
    evt.preventDefault();
    setRoleRef(_roleRef);
  }

  return (
    <>
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
      <div>
        <FormProvider {...methods}>
          <form id="activationFormId">
            {roleRef === RoleRefs.PUBLISHER && (
              <div>
                <PublisherSelect
                  name="role_ref_uuid"
                  label={t('publisher')}
                  placeholder={t('selectPublisher')}
                  defaultValue={null}
                />
              </div>
            )}
            {roleRef === RoleRefs.DSP && (
              <div>
                <DspSelect
                  name="role_ref_uuid"
                  label={t('dsp')}
                  placeholder={t('selectDsp')}
                  defaultValue={null}
                />
              </div>
            )}
            {roleRef === RoleRefs.ADVERTISER && (
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
          <EmbeddedScript roleRefId={roleRefVal?.value} />
        </div>
      )}
    </>
  );
};

AudienceActivation.propTypes = propTypes;

export default AudienceActivation;
