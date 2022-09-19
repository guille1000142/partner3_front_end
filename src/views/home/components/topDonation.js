import { Text, Table, Col, Row, User } from "@nextui-org/react";

export default function TopDonation({ donation }) {
  const column = [
    { name: "Nº", uid: "index" },
    { name: "User", uid: "user" },
    { name: "Donations", uid: "donations" },
  ];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "user":
        return (
          <Col>
            <Row>
              <User
                zoomed
                bordered
                size="sm"
                color="secondary"
                src={user.photo}
                name={user.name}
              />
            </Row>
          </Col>
        );
      case "donations":
        return (
          <Col>
            <Row>
              <Text b size={13} css={{ marginRight: "5px" }}>
                {cellValue}
              </Text>
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
      <Table.Header columns={column}>
        {(column) => (
          <Table.Column align="center" key={column.uid}>
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={donation.global}>
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
