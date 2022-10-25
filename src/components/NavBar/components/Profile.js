import { Modal, Text, Avatar, Grid, Table, useTheme } from "@nextui-org/react";

export function Profile({ user, modal, setModal }) {
  const { isDark } = useTheme();
  const date = new Date(user.created_at).toLocaleDateString();
  return (
    <Modal
      css={{
        bg: isDark
          ? "linear-gradient(300deg, rgba(190,190,190,1) 0%, rgba(235,235,235,1) 100%)"
          : "#ffffff",
      }}
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
          <Grid>
            <Avatar
              bordered
              color="secondary"
              size="lg"
              css={{ width: "90px", height: "90px" }}
              src={user.profile_image_url}
            />
          </Grid>
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
