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

// components

import ContainerSideBar from '../ContainerSideBar';

// queries/mutations
// import {useContainers} from 'pages/Container/hooks/useContainers';

import './styles.scss';
// import {getPartnerId} from 'core/utils/auth';
import {PageTitleAlt} from 'components/layouts/Admin/components';
import Table, {
  TableFilterSelect,
  TableStatusCell,
  TableUtils
} from 'components/table';
import AppContent from 'components/layouts/Admin/components/AppContent';

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
  // const partnerId = getPartnerId();

  // const {data: containers} = useContainers({partnerId});
  const containers = [];

  const onRowClick = React.useCallback(
    row => {
      navigate(`/container/${row.original.id}`);
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
      <ContainerSideBar />
      <AppContent>
        <PageTitleAlt
          heading={t('containerManager')}
          subheading={t('managementContainerDescription')}
          icon="pe-7s-plane icon-gradient bg-tempting-azure"
        />
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody>
                  <Table data={containers} columns={columns} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </AppContent>
    </>
  );
};

export default React.memo(Containers);
