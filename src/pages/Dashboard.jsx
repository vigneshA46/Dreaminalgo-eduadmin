import { Box, Card, Flex, Grid, Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconArrowUpRight, IconBook2, IconCurrencyRupee, IconPlayerPlayFilled, IconUser } from '@tabler/icons-react';
import React from 'react'
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

function StatCard({ icon: Icon, title, value, subtitle, change }) {
  return (
    <Paper
      p="md"
      radius="md"
      style={{
        border : '1.5px solid #d6d6d6ff',
        borderRadius : '10px'
      }}
      sx={{
        backgroundColor: '#fff',
        border: '1px solid #000',
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


const Dashboard = () => {
       const weeklyVolume = [
    { day: "Mon", value: 120 },
    { day: "Tue", value: 180 },
    { day: "Wed", value: 260 },
    { day: "Thu", value: 210 },
    { day: "Fri", value: 310 },
    { day: "Sat", value: 200 },
    { day: "Sun", value: 90 },
  ];

  const brokerTradesToday = [
    { broker: "week1", value: 45 },
    { broker: "week2", value: 75 },
    { broker: " week3", value: 60 },
    { broker: "week4", value: 38 },
    { broker: "now", value: 55 },
  ];
  return (
    <Stack>
      <Text size='2rem' fw={"600"} my={"2rem"} >Dashboard</Text>
      <Grid gutter="lg" mb="xl">
  <Grid.Col  span={3}>
   <StatCard
     icon={IconUser}
     title={"Total Users"}
     value={"12,458"}
      
    />
  </Grid.Col>
  <Grid.Col  span={3}>
    <StatCard
     icon={IconBook2}
     title={"Total Courses"}
     value={"38"}
      
    />
  </Grid.Col>
  <Grid.Col  span={3}>
    <StatCard
     icon={IconCurrencyRupee}
     title={"Revenue (This month)"}
     value={"75,000"}
      
    />
  </Grid.Col>
  <Grid.Col  span={3}>
     <StatCard
     icon={IconPlayerPlayFilled}
     title={"Active Students"}
     value={"842"}
      
    />
  </Grid.Col>
  </Grid>
   <Grid gutter="md">
        {/* First Row */}
       <Grid.Col span={{ base: 12, md: 6 }}>
  <Card shadow="sm" radius="md" p="lg" bg="white">
    <Text fw={600} size="lg" mb="sm" c="black">
      Revenue (This week)
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
      User Growth - past 4 weeks
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
    </Stack>
  )
}

export default Dashboard
