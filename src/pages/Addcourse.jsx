import {
  Container,
  Grid,
  Card,
  TextInput,
  Textarea,
  NumberInput,
  Select,
  Switch,
  Button,
  Group,
  Stack,
  Title,
  Divider,
  ActionIcon,
  Notification
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Addcourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const form = useForm({
    initialValues: {
      title: "",
      subline: "",
      author: "",
      aboutheading: "",
      description: "",
      language: "",
      duration: "",
      chapters: 0,
      level: "",
      certificate: false,
      learning: [""],
      bgimage_url: "",
      fee: 0,
      status: "draft"
    }
  });

  const addLearningPoint = () => {
    form.insertListItem("learning", "");
  };

  const removeLearningPoint = (index) => {
    form.removeListItem("learning", index);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setNotification(null);
    try {
      await api.post('/api/courses/', values);
      setNotification({
        type: 'success',
        message: 'Course created successfully! Redirecting...'
      });
      setTimeout(() => navigate('/courses'), 2000);
    } catch (error) {
      console.error("Course Payload Error:", error);
      setNotification({
        type: 'error',
        message: 'Failed to create course. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" py="xl">

      <Title order={2} mb="lg">
        Add New Course
      </Title>

      {notification && (
        <Notification
          icon={notification.type === 'success' ? <IconCheck size={20} /> : <IconX size={20} />}
          color={notification.type === 'success' ? 'teal' : 'red'}
          title={notification.type === 'success' ? 'Success' : 'Error'}
          onClose={() => setNotification(null)}
          mb="lg"
        >
          {notification.message}
        </Notification>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>

        <Grid>

          {/* BASIC INFO */}

          <Grid.Col span={{ base: 12 }}>
            <Card shadow="sm" p="lg">

              <Title order={4} mb="md">
                Basic Information
              </Title>

              <Grid>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Course Title"
                    {...form.getInputProps("title")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Subline"
                    {...form.getInputProps("subline")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Author"
                    {...form.getInputProps("author")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Select
                    label="Language"
                    data={["English", "Tamil", "Hindi"]}
                    {...form.getInputProps("language")}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <Textarea
                    label="Description"
                    minRows={4}
                    {...form.getInputProps("description")}
                  />
                </Grid.Col>

              </Grid>

            </Card>
          </Grid.Col>


          {/* COURSE DETAILS */}

          <Grid.Col span={{ base: 12 }}>
            <Card shadow="sm" p="lg">

              <Title order={4} mb="md">
                Course Details
              </Title>

              <Grid>

                <Grid.Col span={{ base: 12, md: 4 }}>
                  <TextInput
                    label="Duration"
                    placeholder="12 Hours"
                    {...form.getInputProps("duration")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                  <NumberInput
                    label="Chapters"
                    {...form.getInputProps("chapters")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Select
                    label="Level"
                    data={["Beginner", "Intermediate", "Advanced"]}
                    {...form.getInputProps("level")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                  <NumberInput
                    label="Course Fee"
                    prefix="₹"
                    decimalScale={2}
                    {...form.getInputProps("fee")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Select
                    label="Status"
                    data={["draft", "published"]}
                    {...form.getInputProps("status")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Switch
                    label="Certificate Available"
                    {...form.getInputProps("certificate", {
                      type: "checkbox"
                    })}
                  />
                </Grid.Col>

              </Grid>

            </Card>
          </Grid.Col>


          {/* ABOUT SECTION */}

          <Grid.Col span={12}>
            <Card shadow="sm" p="lg">

              <Title order={4} mb="md">
                About Section
              </Title>

              <TextInput
                label="About Heading"
                {...form.getInputProps("aboutheading")}
              />

            </Card>
          </Grid.Col>


          {/* LEARNING POINTS */}

          <Grid.Col span={12}>
            <Card shadow="sm" p="lg">

              <Group justify="space-between" mb="md">
                <Title order={4}>What Students Will Learn</Title>

                <Button
                  bg={"#000"}
                  size="xs"
                  leftSection={<IconPlus size={16} />}
                  onClick={addLearningPoint}
                >
                  Add Point
                </Button>
              </Group>

              <Stack>

                {form.values.learning.map((item, index) => (

                  <Group key={index} align="flex-end">

                    <TextInput
                      style={{ flex: 1 }}
                      placeholder="Enter learning point"
                      {...form.getInputProps(`learning.${index}`)}
                    />

                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => removeLearningPoint(index)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>

                  </Group>

                ))}

              </Stack>

            </Card>
          </Grid.Col>


          {/* MEDIA */}

          <Grid.Col span={12}>
            <Card shadow="sm" p="lg">

              <Title order={4} mb="md">
                Media
              </Title>

              <TextInput
                label="Background Image URL"
                {...form.getInputProps("bgimage_url")}
              />

            </Card>
          </Grid.Col>


          {/* SUBMIT */}

          <Grid.Col span={12}>

            <Divider my="lg" />

            <Group justify="flex-end">

              <Button
                bg={"#000"}
                size="md"
                type="submit"
                loading={loading}
              >
                Create Course
              </Button>
            </Group>
          </Grid.Col>

        </Grid>

      </form>

    </Container>
  );
}