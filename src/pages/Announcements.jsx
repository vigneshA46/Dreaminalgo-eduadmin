import { Badge, Box, Button, Card, Flex, Group, Stack, Text } from '@mantine/core'
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react'
import React from 'react'

const Announcements = () => {
  return (
    <Stack>
      <Flex align={"center"} justify={"space-between"} >
      <Text size='2rem' my={"2rem"} fw={"500"} >Announcements</Text>
      <Button bg={"#000"} radius={"1.5rem"} >+ Create Announcement</Button>
    </Flex>
    <Text size='1.5rem' fw={"500"} >Current Announcements</Text>
    <Box>
      <Flex align={"center"} justify={"flex-end"} gap={"1rem"} >
        <Text><IconTrash color='black' size={24} /></Text>
        <Text><IconEdit size={24} color='black' /></Text>
        <Text size='0.9rem'  >Published on : 12/11/2025</Text>
      </Flex>
     <Card
          my={"2rem"}
          w={"100%"}
            radius="lg"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e3f2ff 50%, #a5d4ff 100%)',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              padding: '32px',
              marginBottom: '10px',
              position: 'relative',
              overflow: 'hidden',
            }}
         >
            <Group justify="space-between" align="center" style={{ flexWrap: 'wrap' }}>
              {/* Left Side - Icon and Content */}
              <Group align="flex-start" gap="xl" style={{ flex: '1 1 60%', minWidth: '300px' }}>
                {/* Check Icon */}
                <Box
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '80px',
                    height: '80px',
                  }}
                >
                  <IconCheck size={48} color="#1e88e5" stroke={3} />
                </Box>

                {/* Text Content */}
                <Box style={{ flex: 1 }}>
                  <Group gap="sm" mb="sm" align="center">
                    <Text size="28px" fw={700} c="#1e3a5f">
                      Dreamin Career Fair
                    </Text>
                    <Badge
                      size="sm"
                      radius="sm"
                      style={{
                        backgroundColor: '#00b8d4',
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '11px',
                        padding: '4px 10px',
                      }}
                    >
                      Exclusive Online Event
                    </Badge>
                  </Group>
                  
                  <Text size="18px" fw={600} c="#2c3e50" mb="md">
                    Accelerate your path to top tech roles
                  </Text>
                  
                  <Text size="14px" c="#5a6c7d" style={{ lineHeight: '1.6', maxWidth: '600px' }}>
                    A one-day online event designed to showcase your skills, compete in a real-world selection process, and get fast-tracked for external opportunities in companies like Flipkart, Swiggy, Amazon & more.
                  </Text>
                </Box>
              </Group>

              {/* Right Side - Register Button */}
              <Box style={{ flex: '0 0 auto', minWidth: '200px' }}>
                <Button
                  size="lg"
                  fullWidth
                  style={{
                    backgroundColor: '#0095ff',
                    fontSize: '16px',
                    fontWeight: 600,
                    height: '52px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,149,255,0.3)',
                  }}
                >
                  Register for FREE
                </Button>
              </Box>
            </Group>
          </Card>
          </Box>
    </Stack>
  )
}

export default Announcements
