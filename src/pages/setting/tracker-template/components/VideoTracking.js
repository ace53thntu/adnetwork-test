import React from 'react';
import {Row, Col} from 'reactstrap';
import {Collapse} from 'components/common';
import {FormTextInput} from 'components/forms';
import {InputNames} from '../constant';
import {useTranslation} from 'react-i18next';

const VideoTracking = () => {
  const {t} = useTranslation();

  return (
    <Collapse initialOpen title="Video tracking">
      <Row>
        {/* Start url */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.START_URL}
            label={t('startUrl')}
            placeholder={`${t('enter')} ${t('startUrl')}`}
          />
        </Col>
        {/* Skip */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.SKIP}
            label={t('skipUrl')}
            placeholder={t('enterSkip')}
          />
        </Col>

        {/* First Quartile */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.FIRST_QUARTILE}
            label={t('firstQuartile')}
            placeholder={t('enterFirstQuartile')}
          />
        </Col>

        {/* Midpoint */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.MIDPOINT}
            label={t('midpoint')}
            placeholder={t('enterMidpoint')}
          />
        </Col>

        {/* Third Quartile */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.THIRD_QUARTILE}
            label={t('thirdQuartile')}
            placeholder={t('enterThirdQuartile')}
          />
        </Col>

        {/* Complete */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.COMPLETE}
            label={t('complete')}
            placeholder={t('enterComplete')}
          />
        </Col>
        {/* Mute url */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.MUTE_URL}
            label={t('muteUrl')}
            placeholder={`${t('enter')} ${t('muteUrl')}`}
          />
        </Col>

        {/* UnMute url */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.UNMUTE_URL}
            label={t('unmuteUrl')}
            placeholder={`${t('enter')} ${t('unmuteUrl')}`}
          />
        </Col>

        {/* Pause url */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.PAUSE_URL}
            label={t('pauseUrl')}
            placeholder={`${t('enter')} ${t('pauseUrl')}`}
          />
        </Col>

        {/* Resume url */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.RESUME_URL}
            label={t('resumeUrl')}
            placeholder={`${t('enter')} ${t('resumeUrl')}`}
          />
        </Col>

        {/* Rewind url */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.REWIND_URL}
            label={t('rewindUrl')}
            placeholder={`${t('enter')} ${t('rewindUrl')}`}
          />
        </Col>

        {/* Fullscreen url */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.FULLSCREEN_URL}
            label={t('fullscreenUrl')}
            placeholder={`${t('enter')} ${t('fullscreenUrl')}`}
          />
        </Col>

        {/* Exit Fullscreen url */}
        <Col sm={12}>
          <FormTextInput
            name={InputNames.EXIT_FULLSCREEN_URL}
            label={t('exitFullscreenUrl')}
            placeholder={`${t('enter')} ${t('exitFullscreenUrl')}`}
          />
        </Col>
      </Row>
    </Collapse>
  );
};

export default VideoTracking;
