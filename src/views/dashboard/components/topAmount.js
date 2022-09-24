import { Text, Table, Col, Row, User } from "@nextui-org/react";

export default function TopAmount({ isDark, amount }) {
  const column = [
    { name: "Nº", uid: "index" },
    { name: "Viewer", uid: "user" },
    { name: "Amount", uid: "amount" },
  ];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "index":
        return (
          <Col>
            <Row>
              <div
                className={
                  (cellValue === 1 && "gold") ||
                  (cellValue === 2 && "silver") ||
                  (cellValue === 3 && "bronce")
                }
              >
                {cellValue}
              </div>
            </Row>
          </Col>
        );
      case "user":
        return (
          <Col>
            <Row>
              <User
                bordered
                size="sm"
                color="secondary"
                src={user.photo}
                name={user.name}
              />
            </Row>
          </Col>
        );
      case "amount":
        return (
          <Col>
            <Row>
              <Text b size={13} css={{ marginRight: "5px" }}>
                {"$" + cellValue}
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
      css={{
        width: "300px",
        bg: isDark
          ? "linear-gradient(300deg, rgba(190,190,190,1) 0%, rgba(235,235,235,1) 100%)"
          : "#ffffff",
      }}
      selectionMode="none"
      color="secondary"
    >
      <Table.Header columns={column}>
        {(column) => (
          <Table.Column align="start" key={column.uid}>
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={amount.global}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
