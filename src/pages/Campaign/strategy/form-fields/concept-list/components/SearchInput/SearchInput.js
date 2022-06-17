import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebounce } from 'hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { ClearSearchButton } from './styled';

export default function SearchInput(props) {
  const { setSearchTerm } = props;
  const { t } = useTranslation();
  const [searchKeys, setSearchKeys] = React.useState('');

  const debouncedSearchKeys = useDebounce(searchKeys, 500);

  function onChangeTerm(evt) {
    setSearchKeys(evt.target.value);
  }

  function onClickClear(evt) {
    evt.preventDefault();
    setSearchKeys('');
  }

  React.useEffect(
    function searchingByTerm() {
      setSearchTerm(debouncedSearchKeys);
    },
    [setSearchTerm, debouncedSearchKeys]
  );

  return (
    <div>
      <InputGroup>
        <Input
          name="search"
          placeholder={`${t('COMMON.SEARCH')}...`}
          value={searchKeys}
          onChange={onChangeTerm}
          autoComplete="off"
        />
        {searchKeys && <ClearSearchButton close onClick={onClickClear} />}
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <FontAwesomeIcon className="mr-1 c-font-12" icon={faSearch} />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
