import { Text, Table, Col, Row, User } from "@nextui-org/react";

export default function Promoted({ data }) {
  const column = [{ name: "Channel", uid: "channel" }];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "channel":
        return (
          <Col>
            <Row>
              <User
                zoomed
                bordered
                size="sm"
                color="secondary"
                src={user.photo}
                name={user.channel}
              />
            </Row>
          </Col>
        );

      default:
        return cellValue;
    }
  };

  return (
    <Table
      css={{ width: "280px", height: "612px" }}
      selectionMode="none"
      color="secondary"
    >
      <Table.Header columns={column}>
        {(column) => (
          <Table.Column align="center" key={column.uid}>
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={data}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
      <Table.Pagination shadow noMargin align="center" rowsPerPage={10} />
    </Table>
  );
}
