import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {Badge, Button} from 'reactstrap';
import {formatValue} from 'react-currency-input-field';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';
import PriceModelForm from './PriceModelForm';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';

const useStyles = makeStyles(theme => ({
  wrap: {
    width: '500px',
    padding: '15px'
  },
  title: {
    fontWeight: 600,
    marginBottom: 10,
    paddingBottom: 10,
    fontSize: 14,
    borderBottom: '1px solid #cccccc'
  },
  footerWrap: {
    display: 'flex',
    justifyContent: 'end',
    borderTop: '1px solid #cccccc',
    marginTop: 10,
    paddingTop: 10
  }
}));

const isValidPriceModel = (priceModelData, floorPrice) => {
  if (
    HandleCurrencyFields.convertGuiToApi({value: priceModelData?.cpm}) <
      floorPrice ||
    HandleCurrencyFields.convertGuiToApi({value: priceModelData?.cpm}) < 0
  ) {
    return false;
  }

  if (HandleCurrencyFields.convertGuiToApi({value: priceModelData?.cpc}) < 0) {
    return false;
  }

  if (HandleCurrencyFields.convertGuiToApi({value: priceModelData?.cpa}) < 0) {
    return false;
  }

  if (HandleCurrencyFields.convertGuiToApi({value: priceModelData?.cpd}) < 0) {
    return false;
  }

  if (HandleCurrencyFields.convertGuiToApi({value: priceModelData?.cpl}) < 0) {
    return false;
  }

  if (HandleCurrencyFields.convertGuiToApi({value: priceModelData?.cpe}) < 0) {
    return false;
  }

  if (HandleCurrencyFields.convertGuiToApi({value: priceModelData?.cpv}) < 0) {
    return false;
  }

  if (HandleCurrencyFields.convertGuiToApi({value: priceModelData?.cpi}) < 0) {
    return false;
  }

  if (HandleCurrencyFields.convertGuiToApi({value: priceModelData?.cpvm}) < 0) {
    return false;
  }

  return true;
};

export default function InventoryPriceModal({
  inventory,
  onChangePriceModelField,
  pricingModel,
  currentPrice
}) {
  const role = getRole();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {cpm, cpc, cpa, cpd, cpl, cpe, cpv, cpi, cpvm} = inventory;

  const handleClick = event => {
    event.preventDefault();
    if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role)) {
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [currencyInput, setCurrencyInput] = React.useState({
    cpm,
    cpc,
    cpa,
    cpd,
    cpl,
    cpe,
    cpv,
    cpi,
    cpvm
  });

  function handleChangeInput(value, name) {
    setCurrencyInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const open = Boolean(anchorEl);

  return (
    <div>
      <Badge
        color="warning"
        pill
        aria-describedby={`popover-${inventory?.uuid}`}
        onClick={handleClick}
      >
        {formatValue({
          value: currentPrice?.toString() || '',
          groupSeparator: ',',
          decimalSeparator: '.',
          prefix: '$'
        })}
      </Badge>
      <Popover
        id={inventory?.uuid}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <div className={classes.wrap}>
          <Typography className={classes.title}>
            Name: {inventory?.name}
          </Typography>
          <PriceModelForm
            currencyInput={currencyInput}
            handleChangeInput={handleChangeInput}
            activePricingModel={pricingModel}
            floorPrice={inventory?.floor_price}
          />
          <div className={classes.footerWrap}>
            <Button
              type="button"
              color="primary"
              className="mr-2"
              onClick={() => {
                onChangePriceModelField(currencyInput, inventory?.uuid);
                handleClose();
              }}
              disabled={
                !isValidPriceModel(currencyInput, inventory?.floor_price)
              }
            >
              Save
            </Button>
            <Button type="button" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
