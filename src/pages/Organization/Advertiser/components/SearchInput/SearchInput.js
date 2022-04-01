import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDebounce} from 'hooks';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import {setSearchTermRedux} from 'store/reducers/advertiser';
import {ClearSearchButton} from './styled';

export default function SearchInput(props) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = React.useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  function onChangeTerm(evt) {
    setSearchTerm(evt.target.value);
  }

  function onClickClear(evt) {
    evt.preventDefault();
    setSearchTerm('');
  }

  React.useEffect(
    function searchingByTerm() {
      dispatch(setSearchTermRedux(debouncedSearchTerm));
    },
    [dispatch, debouncedSearchTerm]
  );

  return (
    <div>
      <InputGroup>
        <Input
          name="search"
          placeholder={`${t('COMMON.SEARCH')}...`}
          value={searchTerm}
          onChange={onChangeTerm}
          autoComplete="off"
        />
        {searchTerm && <ClearSearchButton close onClick={onClickClear} />}
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <FontAwesomeIcon className="mr-1 c-font-12" icon={faSearch} />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
