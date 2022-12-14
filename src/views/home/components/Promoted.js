import { Avatar, Table, Col, Row } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import styles from "../home.module.css";

export default function Promoted({ isDark, promos }) {
  let navigate = useNavigate();

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <Col>
            <Row>
              {cellValue && (
                <>
                  <Avatar
                    bordered
                    size="sm"
                    color="secondary"
                    src={user.photo}
                  />
                  &nbsp;<span>{user.name}</span>
                </>
              )}
            </Row>
          </Col>
        );

      case "language":
        return (
          <Col>
            <Row>{cellValue && <span>{cellValue}</span>}</Row>
          </Col>
        );

      case "cid":
        return (
          <Col>
            <Row>
              {cellValue && (
                <div className={styles.promoted}>
                  <i
                    onClick={() => navigate(`/donations/${cellValue}`)}
                    className="fa-solid fa-arrow-up-right-from-square"
                  ></i>
                </div>
              )}
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
          <Table.Column align="start" key={column.uid}>
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={promos.data}>
        {(item) => (
          <Table.Row
            css={
              item.name && {
                "&:hover": {
                  background: "$purple100",
                  color: "$purple800",
                },
              }
            }
          >
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
