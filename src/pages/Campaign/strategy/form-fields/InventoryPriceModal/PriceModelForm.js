import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {CurrencyInputFieldNoRHF} from 'components/forms/CurrencyInputFieldNoRHF';
import './_main.scss';
import {convertGuiToApi} from 'utils/handleCurrencyFields';
import ErrorMessage from 'components/forms/ErrorMessage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const propTypes = {
  activePricingModel: PropTypes.string
};

export default function PriceModelForm({
  currencyInput,
  handleChangeInput,
  activePricingModel = '',
  floorPrice
}) {
  console.log(
    '🚀 ~ file: PriceModelForm.js ~ line 24 ~ floorPrice',
    floorPrice
  );
  const classes = useStyles();

  return (
    <div className="price-model-wrap">
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={4}>
          <div
            className={`input-wrap ${
              activePricingModel === 'CPM' ? 'highlighted' : ''
            }`}
          >
            <CurrencyInputFieldNoRHF
              label="CPM"
              placeholder="CPM"
              value={currencyInput?.cpm}
              onChange={value => {
                handleChangeInput(value, 'cpm');
              }}
            />
            {convertGuiToApi({value: currencyInput?.cpm}) <= floorPrice ? (
              <ErrorMessage message="CPM must greater than floor price" />
            ) : null}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            className={`input-wrap ${
              activePricingModel === 'CPC' ? 'highlighted' : ''
            }`}
          >
            <CurrencyInputFieldNoRHF
              label="CPC"
              placeholder="CPC"
              value={currencyInput?.cpc}
              onChange={value => {
                handleChangeInput(value, 'cpc');
              }}
            />
            {convertGuiToApi({value: currencyInput?.cpc}) < 0 ? (
              <ErrorMessage message="This field must greater than 0" />
            ) : null}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            className={`input-wrap ${
              activePricingModel === 'CPA' ? 'highlighted' : ''
            }`}
          >
            <CurrencyInputFieldNoRHF
              label="CPA"
              placeholder="CPA"
              value={currencyInput?.cpa}
              onChange={value => {
                handleChangeInput(value, 'cpa');
              }}
            />
            {convertGuiToApi({value: currencyInput?.cpa}) < 0 ? (
              <ErrorMessage message="This field must greater than 0" />
            ) : null}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            className={`input-wrap ${
              activePricingModel === 'CPD' ? 'highlighted' : ''
            }`}
          >
            <CurrencyInputFieldNoRHF
              label="CPD"
              placeholder="CPD"
              value={currencyInput?.cpd}
              onChange={value => {
                handleChangeInput(value, 'cpd');
              }}
            />
            {convertGuiToApi({value: currencyInput?.cpd}) < 0 ? (
              <ErrorMessage message="This field must greater than 0" />
            ) : null}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            className={`input-wrap ${
              activePricingModel === 'CPL' ? 'highlighted' : ''
            }`}
          >
            <CurrencyInputFieldNoRHF
              label="CPL"
              placeholder="CPL"
              value={currencyInput?.cpl}
              onChange={value => {
                handleChangeInput(value, 'cpl');
              }}
            />
            {convertGuiToApi({value: currencyInput?.cpl}) < 0 ? (
              <ErrorMessage message="This field must greater than 0" />
            ) : null}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            className={`input-wrap ${
              activePricingModel === 'CPE' ? 'highlighted' : ''
            }`}
          >
            <CurrencyInputFieldNoRHF
              label="CPE"
              placeholder="CPE"
              value={currencyInput?.cpe}
              onChange={value => {
                handleChangeInput(value, 'cpe');
              }}
            />
            {convertGuiToApi({value: currencyInput?.cpe}) < 0 ? (
              <ErrorMessage message="This field must greater than 0" />
            ) : null}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            className={`input-wrap ${
              activePricingModel === 'CPV' ? 'highlighted' : ''
            }`}
          >
            <CurrencyInputFieldNoRHF
              label="CPV"
              placeholder="CPV"
              value={currencyInput?.cpv}
              onChange={value => {
                handleChangeInput(value, 'cpv');
              }}
            />
            {convertGuiToApi({value: currencyInput?.cpv}) < 0 ? (
              <ErrorMessage message="This field must greater than 0" />
            ) : null}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            className={`input-wrap ${
              activePricingModel === 'CPI' ? 'highlighted' : ''
            }`}
          >
            <CurrencyInputFieldNoRHF
              label="CPI"
              placeholder="CPI"
              value={currencyInput?.cpi}
              onChange={value => {
                handleChangeInput(value, 'cpi');
              }}
            />
            {convertGuiToApi({value: currencyInput?.cpi}) < 0 ? (
              <ErrorMessage message="This field must greater than 0" />
            ) : null}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            className={`input-wrap ${
              activePricingModel === 'CPVM' ? 'highlighted' : ''
            }`}
          >
            <CurrencyInputFieldNoRHF
              label="CPVM"
              placeholder="CPVM"
              value={currencyInput?.cpvm}
              onChange={value => {
                handleChangeInput(value, 'cpvm');
              }}
            />
            {convertGuiToApi({value: currencyInput?.cpvm}) < 0 ? (
              <ErrorMessage message="This field must greater than 0" />
            ) : null}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

PriceModelForm.propTypes = propTypes;
