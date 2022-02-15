import React, {useMemo} from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Container
} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import './styles.scss';
import Table, {
  TableFilterSelect,
  TableStatusCell,
  TableUtils
} from 'components/table';
import {useGetContainers} from 'queries/container/useGetContainers';
import '../../style.scss';
import {ContainerBodyLayout} from '../Layouts';
import {getRole, getUser} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';
import {DEFAULT_PAGINATION} from 'constants/misc';

const STATUS_OPTIONS = [
  {
    value: 'active',
    label: 'Active'
  },
  {
    value: 'inactive',
    label: 'Inactive'
  },
  {
    value: 'draft',
    label: 'Draft'
  }
];

const Containers = props => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const role = getRole();
  const user = getUser();
  const params = {
    per_page: 1000,
    page: DEFAULT_PAGINATION.page,
    sort: 'created_at DESC'
  };
  if (role === USER_ROLE.PUBLISHER) {
    params.publisher_uuid = user?.uuid;
  }

  const {data: containers} = useGetContainers({
    params,
    enabled: true
  });

  const onRowClick = React.useCallback(
    row => {
      navigate(`/container/${row?.original?.uuid}`);
    },
    [navigate]
  );

  const columns = useMemo(
    () => [
      {
        accessor: 'name',
        Header: t('name'),
        filterable: true,
        filterAll: true,
        filterMethod: (filter, rows) =>
          TableUtils.filterStringByKey(rows, filter.value, 'name')
      },
      {
        accessor: 'url',
        Header: 'URL',
        filterable: true,
        filterAll: true,
        filterMethod: (filter, rows) =>
          TableUtils.filterStringByKey(rows, filter.value, 'url')
      },
      {
        accessor: 'status',
        Header: t('status'),
        filterable: true,
        filterAll: true,
        Cell: row => <TableStatusCell row={row} />,
        filterMethod: (filter, rows) =>
          TableUtils.filterBySelect(rows, filter.value, 'status'),
        Filter: ({filter, onChange}) => (
          <TableFilterSelect
            onChange={onChange}
            filter={filter}
            options={STATUS_OPTIONS}
          />
        )
      },
      {
        accessor: 'actions',
        isDummyField: true,
        align: 'center',
        Header: t('actions'),
        filterable: false,
        Cell: row => {
          return (
            <div className="d-block w-100 text-center">
              <UncontrolledButtonDropdown onClick={e => e.stopPropagation()}>
                <DropdownToggle
                  caret
                  className="btn-icon btn-icon-only btn btn-link"
                  color="link"
                >
                  <i className="lnr-menu-circle btn-icon-wrapper" />
                </DropdownToggle>
                <DropdownMenu
                  right
                  className="rm-pointers dropdown-menu-hover-link"
                >
                  <DropdownItem onClick={() => onRowClick(row)}>
                    <i className="dropdown-icon lnr-inbox"> </i>
                    <span>{t('edit')}</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          );
        }
      }
    ],
    [onRowClick, t]
  );

  return (
    <>
      <ContainerBodyLayout
        heading={t('containerManager')}
        subHeading={t('containerDescription')}
      >
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody>
                  <Table
                    data={containers?.data?.data || []}
                    columns={columns}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </ContainerBodyLayout>
    </>
  );
};

export default React.memo(Containers);
