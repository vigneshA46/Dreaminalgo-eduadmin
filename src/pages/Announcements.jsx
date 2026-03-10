import {
  Badge, Box, Button, Card, Flex, Group, Stack, Text,
  Modal, TextInput, Textarea, ColorInput
} from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useState, useEffect } from 'react'
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react'
import React from 'react'
import api from '../utils/api'

const Announcements = () => {
  const [opened, setOpened] = useState(false)
  const [announcements, setAnnouncements] = useState([])

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

  const fetchAnnouncements = async () => {
    try {
      const { data } = await api.get('/api/announcements/admin/all')
      setAnnouncements(data)
    } catch (error) {
      console.error("Failed to fetch announcements:", error)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const handleCreate = async () => {
    try {
      const payload = {
        ...form,
        // Convert JS Date object to exact ISO string for backend
        expiresat: form.expiresat ? new Date(form.expiresat).toISOString() : null
      }
      await api.post('/api/announcements', payload)

      // Refresh list & reset form
      await fetchAnnouncements()
      setOpened(false)
      setForm({
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
    } catch (error) {
      console.error("Failed to create announcement:", error)
    }
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
            onClick={handleCreate}
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
        {announcements.map((ann, idx) => (
          <Box key={ann.id || idx}>
            <Flex align={"center"} justify={"flex-end"} gap={"1rem"}>
              <Text style={{ cursor: 'pointer' }}><IconTrash color='black' size={24} /></Text>
              <Text style={{ cursor: 'pointer' }}><IconEdit size={24} color='black' /></Text>
              <Text size='0.9rem'>
                Published on: {ann.createdat ? new Date(ann.createdat).toLocaleDateString() : 'N/A'}
              </Text>
            </Flex>
            <Card
              my={"1rem"}
              w={"100%"}
              radius="lg"
              style={{
                background: `linear-gradient(135deg, ${ann.gradientstart || '#ffffff'} 0%, ${ann.gradientend || '#a5d4ff'} 100%)`,
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                padding: '32px',
                marginBottom: '20px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Group justify="space-between" align="center" style={{ flexWrap: 'wrap' }}>
                {/* Left Side - Icon and Content */}
                <Group align="flex-start" gap="xl" style={{ flex: '1 1 60%', minWidth: '300px' }}>
                  {/* Icon Box */}
                  <Box
                    style={{
                      backgroundColor: ann.iconbg || 'rgba(255,255,255,0.9)',
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
                    {/* Simplified generic icon placeholder since dynamic icon strings are harder to map dynamically without huge switch statement */}
                    <IconCheck size={48} color={ann.iconcolor || "#1e88e5"} stroke={3} />
                  </Box>

                  {/* Text Content */}
                  <Box style={{ flex: 1 }}>
                    <Group gap="sm" mb="sm" align="center">
                      <Text size="28px" fw={700} c={ann.titlecolor || "#1e3a5f"}>
                        {ann.title}
                      </Text>
                      {ann.expiresat && (
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
                          Expires: {new Date(ann.expiresat).toLocaleDateString()}
                        </Badge>
                      )}
                    </Group>

                    <Text size="16px" c={ann.messagecolor || "#5a6c7d"} style={{ lineHeight: '1.6', maxWidth: '600px', whiteSpace: 'pre-wrap' }}>
                      {ann.message}
                    </Text>
                  </Box>
                </Group>

                {/* Right Side - Action Button Example */}
                <Box style={{ flex: '0 0 auto', minWidth: '200px' }}>
                  <Button
                    size="lg"
                    fullWidth
                    style={{
                      backgroundColor: '#000',
                      fontSize: '16px',
                      fontWeight: 600,
                      height: '52px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Group>
            </Card>
          </Box>
        ))}
      </Box>
    </Stack>
  )
}

export default Announcements
