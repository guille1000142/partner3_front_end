import {
  Modal,
  Text,
  Avatar,
  Grid,
  Table,
  useTheme,
  Switch,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";

export function Profile({ user, modal, setModal }) {
  const date = new Date(user.created_at).toLocaleDateString();
  return (
    <Modal
      width="650px"
      closeButton
      aria-labelledby="modal-title"
      open={modal}
      onClose={setModal}
    >
      <Modal.Header>
        <Text b size={30}>
          Profile
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Grid.Container gap={1} justify="center">
          <Avatar
            bordered
            as="button"
            color="secondary"
            size="lg"
            css={{ width: "70px", height: "70px" }}
            src={user.profile_image_url}
          />
        </Grid.Container>
        <Table
          shadow={false}
          aria-label="Example table with static content"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column align="start">Id</Table.Column>
            <Table.Column align="start">Name</Table.Column>
            <Table.Column align="start">Email</Table.Column>
            <Table.Column align="start">Views</Table.Column>
            <Table.Column align="start">Since</Table.Column>
            {/* Follows and subscriptions */}
          </Table.Header>
          <Table.Body>
            <Table.Row key="1">
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>{user.display_name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.view_count}</Table.Cell>
              <Table.Cell>{date}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Body>
    </Modal>
  );
}
