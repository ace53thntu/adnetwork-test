import React from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Table
} from 'reactstrap';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ListTransferFiles = ({
  container,
  dataListTransferFiles,
  onNewTransferClick,
  onEditItem
}) => {
  const {name: containerName} = container;
  const {data: transferFiles} = dataListTransferFiles;

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card className="main-card mb-3">
            <CardHeader>
              Scheduled transfer
              <div className="btn-actions-pane-right">
                <Button
                  type="button"
                  onClick={onNewTransferClick}
                  color="primary"
                >
                  New transfer
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label>Container name</Label>
                <Input defaultValue={containerName} disabled={true} />
              </FormGroup>
              <FormGroup>
                <Label>Transfers</Label>
                {!transferFiles?.length ? (
                  <p>Empty list of transfer</p>
                ) : (
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Frequency</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transferFiles.map((file, index) => {
                        const {name, isActive, dataType, frequency} = file;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{name || 'No name from API'}</td>
                            <td>
                              <div
                                className={`badge badge-${
                                  isActive ? 'success' : 'secondary'
                                } mr-2`}
                              >
                                {isActive ? 'Active' : 'Inactive'}
                              </div>
                            </td>
                            <td>{dataType || 'No type from API'}</td>
                            <td>{frequency || 'No frequency from API'}</td>
                            <td>
                              <Button
                                className="border-0 btn-transition"
                                outline
                                color="primary"
                                type="button"
                                onClick={() => onEditItem(file)}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default React.memo(ListTransferFiles);
