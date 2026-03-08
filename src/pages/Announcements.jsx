import { 
  Badge, Box, Button, Card, Flex, Group, Stack, Text,
  Modal, TextInput, Textarea, ColorInput
} from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useState } from 'react'
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react'
import React from 'react'

const Announcements = () => {
  const [opened, setOpened] = useState(false)

const [form, setForm] = useState({
  title: "",
  titlecolor: "#ffffff",
  message: "",
  messagecolor: "#ffffff",
  gradientstart: "#4f46e5",
  gradientend: "#9333ea",
  icon: "megaphone",
  iconcolor: "#ffffff",
  iconbg: "#000000",
  expiresat: null
})

const handleChange = (field, value) => {
  setForm({ ...form, [field]: value })
} 
  return (
    <Stack>
      <Modal
  opened={opened}
  onClose={() => setOpened(false)}
  title="Create Announcement"
  size="lg"
>

<Stack>

<TextInput
  label="Title"
  value={form.title}
  onChange={(e) => handleChange("title", e.target.value)}
/>

<ColorInput
  label="Title Color"
  value={form.titlecolor}
  onChange={(value) => handleChange("titlecolor", value)}
/>

<Textarea
  label="Message"
  minRows={3}
  value={form.message}
  onChange={(e) => handleChange("message", e.target.value)}
/>

<ColorInput
  label="Message Color"
  value={form.messagecolor}
  onChange={(value) => handleChange("messagecolor", value)}
/>

<Group grow>

<ColorInput
  label="Gradient Start"
  value={form.gradientstart}
  onChange={(value) => handleChange("gradientstart", value)}
/>

<ColorInput
  label="Gradient End"
  value={form.gradientend}
  onChange={(value) => handleChange("gradientend", value)}
/>

</Group>

<TextInput
  label="Icon Name"
  value={form.icon}
  onChange={(e) => handleChange("icon", e.target.value)}
/>

<Group grow>

<ColorInput
  label="Icon Color"
  value={form.iconcolor}
  onChange={(value) => handleChange("iconcolor", value)}
/>

<ColorInput
  label="Icon Background"
  value={form.iconbg}
  onChange={(value) => handleChange("iconbg", value)}
/>

</Group>

<DateTimePicker
  label="Expires At"
  value={form.expiresat}
  onChange={(value) => handleChange("expiresat", value)}
/>

<Button
  mt="md"
  fullWidth
  bg="black"
  radius={"0.5rem"}
  onClick={() => {
    console.log("Announcement Data:", form)
    setOpened(false)
  }}
>
Create Announcement
</Button>

</Stack>

</Modal>
      <Flex align={"center"} justify={"space-between"} >
      <Text size='2rem' my={"2rem"} fw={"500"} >Announcements</Text>
      <Button bg={"#000"} radius={"1.5rem"} onClick={() => setOpened(true)}>
      + Create Announcement
      </Button>
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
