import { Box, Button, Flex, Grid, Group, Pagination, Paper, Table, Text, TextInput, ThemeIcon } from '@mantine/core'
import { IconArrowUpRight, IconFilter, IconPlugConnectedX, IconSearch, IconUserExclamation, IconUsers, IconEye } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react'
import api from '../utils/api';

function StatCard({ icon: Icon, title, value, subtitle, change }) {
  return (
    <Paper
      p="md"
      radius="md"
      style={{
        border: '1.5px solid #d6d6d6ff',
        borderRadius: '10px',
        backgroundColor: '#fff',
        height: '100%',
      }}
    >
      <Flex align="center" gap="1rem" >
        <Group position="apart" mb="xs">
          <ThemeIcon size="lg" variant="light" color="gray">
            <Icon size={20} stroke={1.5} />
          </ThemeIcon>
        </Group>
        <Text size="sm" color="dimmed" weight={500}>
          {title}
        </Text>
      </Flex>

      <Text size="xl" weight={700}>
        {value}
      </Text>
      {subtitle && (
        <Text size="xs" color="dimmed" mt={4}>
          {subtitle}
        </Text>
      )}
      {change && (
        <Group spacing={4} mt={4}>
          <IconArrowUpRight size={12} color="#10b981" />
          <Text size="xs" color="#10b981" weight={600}>
            {change}
          </Text>
        </Group>
      )}
    </Paper>
  );
}


const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/api/users');
      // Assume API returns array directly. Check array wrapper if applicable.
      setUsers(Array.isArray(data) ? data : data?.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <Box >
      <Flex align={"center"} justify={"space-between"} >
        <Text size='2rem' my={"2rem"} fw={"500"} >Users</Text>

      </Flex>
      <Flex align={"center"} justify={"space-between"} >
        <Flex mx={"lg"} mt={"lg"} align={"center"} justify={"flex-start"} >
          <IconSearch size={24} />
          <TextInput pl={"0.5rem"} radius={"10px"} w={"80%"} type='text' placeholder='Search users...' />
        </Flex>

        <IconFilter size={24} />
      </Flex>

      <Grid gutter="lg" m="lg">
        <Grid.Col span={3}><StatCard
          icon={IconUsers}
          title="Total Users"
          value={users.length || "0"}
          subtitle="All registered users"
          change=""
        /></Grid.Col>
        <Grid.Col span={3}><StatCard
          icon={IconPlugConnectedX}
          title="Not Connected"
          value="-"
          subtitle="Users without broker connection"
          change=""
        /></Grid.Col>
        <Grid.Col span={3}><StatCard
          icon={IconPlugConnectedX}
          title="Not Connected"
          value="-"
          subtitle="Users without broker connection"
          change=""
        /></Grid.Col>
        <Grid.Col span={3}><StatCard
          icon={IconUserExclamation}
          title="Inactive Users"
          value="-"
          subtitle="Logged in but not trading"
          change=""
        /></Grid.Col>
      </Grid>
      <Box
        m={"lg"}
        my={"2rem"}
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <Table
          horizontalSpacing="md"
          verticalSpacing="md"
          style={{
            minWidth: '100%',
          }}
        >
          <Table.Thead>
            <Table.Tr style={{ backgroundColor: '#ffffffff' }}>
              <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                S.No
              </Table.Th>
              <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                Name
              </Table.Th>
              <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                Email
              </Table.Th>
              <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                No of Courses
              </Table.Th>
              <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                Progress %(avg)
              </Table.Th>
              <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                joined on
              </Table.Th>
              <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                View
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <Table.Tr>
                <Table.Td colSpan={7} style={{ textAlign: 'center', padding: '60px', color: '#adb5bd' }}>
                  <Text size="sm">Loading users...</Text>
                </Table.Td>
              </Table.Tr>
            ) : users.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={7} style={{ textAlign: 'center', padding: '60px', color: '#adb5bd' }}>
                  <Text size="sm">No users found</Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              users.map((user, index) => (
                <Table.Tr key={user.id || index}>
                  <Table.Td style={{ padding: '16px', fontWeight: 500 }}>{index + 1}</Table.Td>
                  <Table.Td style={{ padding: '16px' }}>{user.name || 'User'}</Table.Td>
                  <Table.Td style={{ padding: '16px' }}>{user.email}</Table.Td>
                  {/* Dummy fields - update if backend gives this actual relational data per user */}
                  <Table.Td style={{ padding: '16px' }}>{user.courses_count || '0'}</Table.Td>
                  <Table.Td style={{ padding: '16px' }}>{user.progress_avg || '0'}%</Table.Td>
                  <Table.Td style={{ padding: '16px' }}>
                    {user.createdat ? new Date(user.createdat).toLocaleDateString() : 'N/A'}
                  </Table.Td>
                  <Table.Td style={{ padding: '16px' }}>
                    <Button variant="subtle" size="xs" color="blue">
                      <IconEye size={16} />
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>

        {/* Pagination */}
        <Group justify="flex-end" mt="xl">
          <Pagination
            total={1}
            value={1}
            onChange={() => { }}
            size="sm"
            styles={{
              control: {
                border: '1px solid #000',
                borderRadius: '6px'
              },
            }}
          />
        </Group>
      </Box>
    </Box>
  )
}

export default Users