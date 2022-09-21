import { Text, Table, Col, Row, User } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
export default function Promoted({ isDark, promos }) {
  let navigate = useNavigate();

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "channel":
        return (
          <Col onClick={() => navigate(`/donations/${user.cid}`)}>
            <Row>
              <User
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
      css={{
        width: "300px",
        bg: isDark
          ? "linear-gradient(300deg, rgba(190,190,190,1) 0%, rgba(235,235,235,1) 100%)"
          : "#ffffff",
      }}
      selectionMode="none"
      color="secondary"
    >
      <Table.Header columns={promos.column}>
        {(column) => (
          <Table.Column align="center" key={column.uid}>
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={promos.data}>
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
