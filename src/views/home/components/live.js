import { Text, Table, Col, Row, Avatar } from "@nextui-org/react";
import PolygonLogo from "../../../assets/imgs/polygon.png";

export default function Live({ live }) {
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "user":
        return (
          <Col>
            <Row>
              <Avatar
                zoomed
                bordered
                size="sm"
                color="secondary"
                src={user.photo}
              />
            </Row>
          </Col>
        );
      case "amount":
        return (
          <Col>
            <Row>
              <Text b size={13} css={{ marginRight: "5px" }}>
                {cellValue}
              </Text>
              <img width={20} height={20} src={PolygonLogo} alt="polygon" />
            </Row>
          </Col>
        );

      case "channel":
        return (
          <Col>
            <Row>
              <Text b size={13}>
                {cellValue.length > 15
                  ? cellValue.substring(0, 15) + "..."
                  : cellValue}
              </Text>
            </Row>
          </Col>
        );

      case "time":
        return (
          <Col>
            <Row>
              <Text b size={13}>
                {cellValue}
              </Text>
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
      <Table.Header columns={live.column}>
        {(column) => (
          <Table.Column align="center" key={column.uid}>
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={live.data}>
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