import {
  Container,
  Grid,
  Card,
  TextInput,
  Textarea,
  Select,
  NumberInput,
  Button,
  Group,
  Stack,
  Title,
  Switch,
  ActionIcon,
  Divider,
  ThemeIcon,
  Badge,
  Text
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function Singlecourse() {

  const [course, setCourse] = useState({
    id: "20ac2df3-b675-4ba2-b5e4-940f58f9ffed",
    title: "Advanced Algo Trading Masterclass",
    subline: "Master Live Market Deployment",
    author: "Dreamin Academy",
    aboutheading: "Course Overview",
    description: "Updated course description here.",
    language: "English",
    duration: "15 Hours",
    chapters: 10,
    level: "Intermediate",
    certificate: true,
    learning: [
        "Advanced order execution",
        "Live API integration",
        "Position sizing models"
    ],
    bgimage_url: "https://yourcdn.com/new-bg.jpg",
    fee: "6999.00",
    isfree: false,
    status: "published",
    createdby: "df31b526-0f13-4929-997e-ab4caeadc9b0",
    createdat: "2026-03-05T10:51:29.868Z",
    updatedat: "2026-03-05T10:58:59.037Z"
});

  const [chapters, setChapters] = useState([]);

  /* ---------------- LEARNING POINTS ---------------- */

  const addLearning = () => {
    setCourse({
      ...course,
      learning: [...course.learning, ""]
    });
  };

  const updateLearning = (value, index) => {
    const updated = [...course.learning];
    updated[index] = value;
    setCourse({ ...course, learning: updated });
  };

  const removeLearning = (index) => {
    const updated = [...course.learning];
    updated.splice(index, 1);
    setCourse({ ...course, learning: updated });
  };

  /* ---------------- CHAPTERS ---------------- */

  const addChapter = () => {

    setChapters([
      ...chapters,
      {
        title: "",
        icon: "",
        orderindex: chapters.length + 1,
        lessons: []
      }
    ]);

  };

  const updateChapter = (index, field, value) => {

    const updated = [...chapters];
    updated[index][field] = value;

    setChapters(updated);
  };

  const removeChapter = (index) => {

    const updated = [...chapters];
    updated.splice(index, 1);

    setChapters(updated);
  };

  /* ---------------- LESSONS ---------------- */

  const addLesson = (chapterIndex) => {

    const updated = [...chapters];

    updated[chapterIndex].lessons.push({
      title: "",
      mediaurl: "",
      duration: 0,
      idpreview: false,
      orderindex: updated[chapterIndex].lessons.length + 1
    });

    setChapters(updated);
  };

  const updateLesson = (chapterIndex, lessonIndex, field, value) => {

    const updated = [...chapters];
    updated[chapterIndex].lessons[lessonIndex][field] = value;

    setChapters(updated);
  };

  const removeLesson = (chapterIndex, lessonIndex) => {

    const updated = [...chapters];
    updated[chapterIndex].lessons.splice(lessonIndex, 1);

    setChapters(updated);
  };

  /* ---------------- SAVE ---------------- */

  const handleSubmit = () => {

    const payload = {
      course,
      chapters
    };

    console.log("FINAL PAYLOAD:", payload);
  };

  return (

    <Container size="xl" py="xl">

      <Title order={2} mb="lg">
        Course Builder
      </Title>

      {/* COURSE INFO */}

      <Card mb="lg" shadow="sm" p="lg">

  <Title order={4} mb="lg">
    Course Details
  </Title>

  <Grid>

    <Grid.Col span={{ base: 12, md: 6 }}>
      <Group>
        <ThemeIcon color="blue" variant="light">
          📘
        </ThemeIcon>
        <div>
          <Text size="sm" c="dimmed">Title</Text>
          <Text fw={500}>{course.title}</Text>
        </div>
      </Group>
    </Grid.Col>

    <Grid.Col span={{ base: 12, md: 6 }}>
      <Group>
        <ThemeIcon color="cyan" variant="light">
          📝
        </ThemeIcon>
        <div>
          <Text size="sm" c="dimmed">Subline</Text>
          <Text fw={500}>{course.subline}</Text>
        </div>
      </Group>
    </Grid.Col>

    <Grid.Col span={{ base: 12, md: 6 }}>
      <Group>
        <ThemeIcon color="grape" variant="light">
          👤
        </ThemeIcon>
        <div>
          <Text size="sm" c="dimmed">Author</Text>
          <Text fw={500}>{course.author}</Text>
        </div>
      </Group>
    </Grid.Col>

    <Grid.Col span={{ base: 12, md: 6 }}>
      <Group>
        <ThemeIcon color="teal" variant="light">
          🌐
        </ThemeIcon>
        <div>
          <Text size="sm" c="dimmed">Language</Text>
          <Text fw={500}>{course.language}</Text>
        </div>
      </Group>
    </Grid.Col>

    <Grid.Col span={{ base: 12, md: 6 }}>
      <Group>
        <ThemeIcon color="orange" variant="light">
          ⏱
        </ThemeIcon>
        <div>
          <Text size="sm" c="dimmed">Duration</Text>
          <Text fw={500}>{course.duration}</Text>
        </div>
      </Group>
    </Grid.Col>

    <Grid.Col span={{ base: 12, md: 6 }}>
      <Group>
        <ThemeIcon color="indigo" variant="light">
          📚
        </ThemeIcon>
        <div>
          <Text size="sm" c="dimmed">Chapters</Text>
          <Text fw={500}>{course.chapters}</Text>
        </div>
      </Group>
    </Grid.Col>

    <Grid.Col span={{ base: 12, md: 6 }}>
      <Group>
        <ThemeIcon color="pink" variant="light">
          📊
        </ThemeIcon>
        <div>
          <Text size="sm" c="dimmed">Level</Text>
          <Text fw={500}>{course.level}</Text>
        </div>
      </Group>
    </Grid.Col>

    <Grid.Col span={{ base: 12, md: 6 }}>
      <Group>
        <ThemeIcon color="green" variant="light">
          🎓
        </ThemeIcon>
        <div>
          <Text size="sm" c="dimmed">Certificate</Text>
          <Text fw={500}>
            {course.certificate ? "Available" : "No"}
          </Text>
        </div>
      </Group>
    </Grid.Col>

    <Grid.Col span={{ base: 12, md: 6 }}>
      <Group>
        <ThemeIcon color="yellow" variant="light">
          💰
        </ThemeIcon>
        <div>
          <Text size="sm" c="dimmed">Fee</Text>
          <Text fw={500}>₹{course.fee}</Text>
        </div>
      </Group>
    </Grid.Col>

    <Grid.Col span={{ base: 12, md: 6 }}>
      <Group>
        <ThemeIcon color="gray" variant="light">
          📌
        </ThemeIcon>
        <div>
          <Text size="sm" c="dimmed">Status</Text>
          <Badge color={course.status === "published" ? "green" : "yellow"}>
            {course.status}
          </Badge>
        </div>
      </Group>
    </Grid.Col>

  </Grid>

  <Divider my="lg" />

  <div>
    <Text size="sm" c="dimmed" mb={4}>
      Description
    </Text>

    <Text>
      {course.description}
    </Text>
  </div>

</Card>

      {/* LEARNING */}

      <Card mb="lg" shadow="sm" p="lg">

        <Group justify="space-between" mb="md">
          <Title order={4}>Learning Points</Title>
          <Button size="xs" bg={"#000"} leftSection={<IconPlus size={14} />} onClick={addLearning}>
            Add
          </Button>
        </Group>

        <Stack>

          {course.learning.map((item, index) => (

            <Group key={index}>

              <TextInput
                style={{ flex: 1 }}
                value={item}
                onChange={(e) =>
                  updateLearning(e.target.value, index)
                }
              />

              <ActionIcon color="red" onClick={() => removeLearning(index)}>
                <IconTrash size={16} />
              </ActionIcon>

            </Group>

          ))}

        </Stack>

      </Card>

      {/* CHAPTER BUILDER */}

      <Card shadow="sm" p="lg">

        <Group justify="space-between" mb="md">
          <Title order={4}>Chapters</Title>
          <Button bg={"#000"} leftSection={<IconPlus size={16} />} onClick={addChapter}>
            Add Chapter
          </Button>
        </Group>

        <Stack>

          {chapters.map((chapter, chapterIndex) => (

            <Card key={chapterIndex} withBorder p="md">

              <Group justify="space-between" mb="sm">

                <Title order={5}>
                  Chapter {chapterIndex + 1}
                </Title>

                <ActionIcon
                  color="red"
                  onClick={() => removeChapter(chapterIndex)}
                >
                  <IconTrash size={16} />
                </ActionIcon>

              </Group>

              <Grid>

                <Grid.Col span={6}>
                  <TextInput
                    label="Chapter Title"
                    value={chapter.title}
                    onChange={(e) =>
                      updateChapter(
                        chapterIndex,
                        "title",
                        e.target.value
                      )
                    }
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    label="Icon"
                    value={chapter.icon}
                    onChange={(e) =>
                      updateChapter(
                        chapterIndex,
                        "icon",
                        e.target.value
                      )
                    }
                  />
                </Grid.Col>

              </Grid>

              <Divider my="md" />

              {/* LESSONS */}

              <Group justify="space-between" mb="sm">

                <Title order={6}>Lessons</Title>

                <Button
                bg={"#000"}
                  size="xs"
                  onClick={() => addLesson(chapterIndex)}
                >
                  Add Lesson
                </Button>

              </Group>

              <Stack>

                {chapter.lessons.map((lesson, lessonIndex) => (

                  <Card key={lessonIndex} withBorder>

                    <Grid>

                      <Grid.Col span={4}>
                        <TextInput
                          label="Lesson Title"
                          value={lesson.title}
                          onChange={(e) =>
                            updateLesson(
                              chapterIndex,
                              lessonIndex,
                              "title",
                              e.target.value
                            )
                          }
                        />
                      </Grid.Col>

                      <Grid.Col span={4}>
                        <TextInput
                          label="Video URL"
                          value={lesson.mediaurl}
                          onChange={(e) =>
                            updateLesson(
                              chapterIndex,
                              lessonIndex,
                              "mediaurl",
                              e.target.value
                            )
                          }
                        />
                      </Grid.Col>

                      <Grid.Col span={2}>
                        <NumberInput
                          label="Duration (sec)"
                          value={lesson.duration}
                          onChange={(v) =>
                            updateLesson(
                              chapterIndex,
                              lessonIndex,
                              "duration",
                              v
                            )
                          }
                        />
                      </Grid.Col>

                      <Grid.Col span={2}>
                        <Switch
                          label="Preview"
                          checked={lesson.idpreview}
                          onChange={(e) =>
                            updateLesson(
                              chapterIndex,
                              lessonIndex,
                              "idpreview",
                              e.currentTarget.checked
                            )
                          }
                        />
                      </Grid.Col>

                    </Grid>

                    <Group justify="flex-end" mt="sm">

                      <ActionIcon
                        color="red"
                        onClick={() =>
                          removeLesson(chapterIndex, lessonIndex)
                        }
                      >
                        <IconTrash size={16} />
                      </ActionIcon>

                    </Group>

                  </Card>

                ))}

              </Stack>

            </Card>

          ))}

        </Stack>

      </Card>

      {/* SAVE */}

      <Group justify="flex-end" mt="xl">
        <Button bg={"#000"} size="md" onClick={handleSubmit}>
          Save Course
        </Button>
      </Group>

    </Container>

  );

}