import { Box, Button, Card, Flex, Grid, Group, Pagination, Stack, Table, Text } from '@mantine/core'
import { IconCoinRupee } from '@tabler/icons-react'
import React, { useState } from 'react'
import {
  LineChart as RLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart as RBarChart,
  Bar,
} from "recharts";

const Reports = () => {
    const [activeTab, setActiveTab] = useState('marketplace');
  

    const weeklyVolume = [
    { day: "week1", value: 3000 },
    { day: "week2", value: 2500 },
    { day: "week3", value: 8000 },
    { day: "week4", value: 6000 },
  ];

  const brokerTradesToday = [
    { broker: "aug", value: 50000 },
    { broker: "sep", value: 75000 },
    { broker: " oct", value: 60000 },
    { broker: "nov", value: 38000 },
    { broker: "now", value: 55000 },
  ];
  return (
    <Stack>
      <Flex align={"center"} justify={"space-between"} >
      <Text size='2rem' my={"2rem"} fw={"500"} >Reports</Text>
      <Flex align={"center"} gap={"2rem"} >
        <Flex
  align="center"
  justify="center"
  gap={6}
>
  <IconCoinRupee size={20} />
  <Text>50,000 This Month</Text>
</Flex>
        <Flex
  align="center"
  justify="center"
  gap={6}
>
  <IconCoinRupee size={20} />
  <Text>2,50,000 Total</Text>
</Flex>
      </Flex>
      </Flex>
      <Grid gutter="md">
              {/* First Row */}
             <Grid.Col span={{ base: 12, md: 6 }}>
        <Card shadow="sm" radius="md" p="lg" bg="white">
          <Text fw={600} size="lg" mb="sm" c="black">
            Revenue (This month)
          </Text>
      
          <Box style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RLineChart data={weeklyVolume}>
                <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ce2626ff"
                  strokeWidth={2}
                  dot={true}
                />
              </RLineChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Grid.Col>
      
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Card shadow="sm" radius="md" padding="lg" bg="white">
          <Text fw={600} size="lg" mb="sm" c="black">
            Revenue Growth - past 5 months
          </Text>
      
          <Box style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RBarChart data={brokerTradesToday}>
                <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
                <XAxis dataKey="broker" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip />
                <Bar dataKey="value" fill="#368bd1ff" />
              </RBarChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Grid.Col>
      </Grid>
      <Box>
        <Flex align={"center"} justify={"space-between"} >
        <Text size='1.5rem' my={"2rem"} fw={"500"} >Coursewise Revenue</Text>
        <Button bg={"#000"} radius={"0.5rem"} >Export Report</Button>
        </Flex>
        <Group gap="md" mb="xl">
                    <Button
                      size="md"
                      radius="xl"
                      style={{
                        backgroundColor: activeTab === 'marketplace' ? '#000000ff' : 'transparent',
                        color: activeTab === 'marketplace' ? 'white' : '#495057',
                        border: 'none',
                        fontWeight: 500,
                        paddingLeft: '28px',
                        paddingRight: '28px',
                      }}
                      onClick={() => setActiveTab('marketplace')}
                    >
                      Trading
                    </Button>
                    <Button
                      size="md"
                      radius="xl"
                      variant="subtle"
                      style={{
                        backgroundColor: activeTab === 'myStrategies' ? '#000000ff' : 'transparent',
                        color: activeTab === 'myStrategies' ? 'white' : '#495057',
                        border: 'none',
                        fontWeight: 500,
                        paddingLeft: '28px',
                        paddingRight: '28px',
                      }}
                      onClick={() => setActiveTab('myStrategies')}
                    >
                      Core
                    </Button>
                  </Group>

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
                                             Course
                                           </Table.Th>
                                           <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                                             No.of.learners
                                           </Table.Th>
                                           <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                                             Revenue
                                           </Table.Th>
                                           <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                                             View
                                           </Table.Th>
                                         </Table.Tr>
                                       </Table.Thead>
                                       <Table.Tbody>
                                         <Table.Tr>
                                           <Table.Td colSpan={8} style={{ textAlign: 'center', padding: '60px', color: '#adb5bd' }}>
                                             <Text size="sm">No Data available</Text>
                                           </Table.Td>
                                         </Table.Tr>
                                       </Table.Tbody>
                                     </Table>
                            </Box>
      </Box>

      <Box>
        <Flex align={"center"} justify={"space-between"} >
        <Text size='1.5rem' my={"2rem"} fw={"500"} >Transactions</Text>
        <Button bg={"#000"} radius={"0.5rem"} >Export Report</Button>
        </Flex>
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
                                             Email
                                           </Table.Th>
                                           <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                                             Category
                                           </Table.Th>
                                           <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                                             Course
                                           </Table.Th>
                                           <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                                             Amount
                                           </Table.Th>
                                           <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                                             Date
                                           </Table.Th>
                                           <Table.Th style={{ color: '#868e96', fontWeight: 600, fontSize: '14px', padding: '16px' }}>
                                             View
                                           </Table.Th>
                                         </Table.Tr>
                                       </Table.Thead>
                                       <Table.Tbody>
                                         <Table.Tr>
                                           <Table.Td colSpan={8} style={{ textAlign: 'center', padding: '60px', color: '#adb5bd' }}>
                                             <Text size="sm">No Data available</Text>
                                           </Table.Td>
                                         </Table.Tr>
                                       </Table.Tbody>
                                     </Table>
                            </Box>
      </Box>
    </Stack>
  )
}

export default Reports
