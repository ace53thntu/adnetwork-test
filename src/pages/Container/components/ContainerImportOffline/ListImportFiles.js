import {get} from 'lodash';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Table
} from 'reactstrap';

import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ListImportFiles = ({
  dataListImportFiles,
  containerDetail,
  onNewFileClick,
  onEditItem
}) => {
  const {data: importFiles} = dataListImportFiles;

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card className="main-card mb-3">
            <CardHeader>
              Imported fields
              <div className="btn-actions-pane-right">
                <Button type="button" onClick={onNewFileClick} color="primary">
                  New file
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label>Container name</Label>
                <Input
                  defaultValue={get(containerDetail, 'name', '')}
                  disabled={true}
                />
              </FormGroup>
              <FormGroup>
                <Label>Files</Label>
                {importFiles?.length ? (
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Lines</th>
                        <th>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importFiles.map((file, index) => {
                        const {name, lines, dataType, processStatus} = file;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>
                              <div className={`badge badge-${'success'} mr-2`}>
                                {processStatus}
                              </div>
                            </td>
                            <td>{lines}</td>
                            <td>{dataType}</td>
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
                ) : (
                  <p>Empty list of files</p>
                )}
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default React.memo(ListImportFiles);
