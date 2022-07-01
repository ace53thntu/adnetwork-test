import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {CurrencyInputFieldNoRHF} from 'components/forms/CurrencyInputFieldNoRHF';
import './_main.scss';

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
  activePricingModel = ''
}) {
  console.log(
    '🚀 ~ file: PriceModelForm.js ~ line 23 ~ activePricingModel',
    activePricingModel
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
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

PriceModelForm.propTypes = propTypes;
