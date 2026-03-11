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
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function Singlecourse() {

  const { id: courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    try {
      // 1. Fetch Course Details
      const courseRes = await api.post('/api/courses/single', { id: courseId });
      setCourse(courseRes.data);

      // 2. Fetch Chapters
      const chaptersRes = await api.post('/api/chapters/by-course', { courseid: courseId });
      const fetchedChapters = chaptersRes.data;

      // 3. Fetch Lessons for every chapter recursively
      const chaptersWithLessons = await Promise.all(
        fetchedChapters.map(async (chap) => {
          try {
            const lessonsRes = await api.post('/api/lessons/by-chapter', { chapterid: chap.id });
            return { ...chap, lessons: lessonsRes.data };
          } catch (e) {
            console.error(e);
            return { ...chap, lessons: [] };
          }
        })
      );

      setChapters(chaptersWithLessons);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };


  /* ---------------- LEARNING POINTS ---------------- */

  const addLearning = () => {
    if (!course) return;
    setCourse({
      ...course,
      learning: [...(course.learning || []), ""]
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

  const addChapter = async () => {
    try {
      const newChapPayload = {
        courseid: courseId,
        title: "New Chapter",
        icon: "folder",
        orderindex: chapters.length + 1
      };

      const res = await api.post('/api/chapters', newChapPayload);

      // Use the returned created chapter from DB or append manually
      const createdChapter = res.data;

      setChapters([
        ...chapters,
        {
          ...createdChapter, // Assuming backend returns ID etc.
          lessons: []
        }
      ]);

    } catch (error) {
      console.error("Failed to add chapter", error);
    }
  };

  const updateChapterLocally = (index, field, value) => {
    const updated = [...chapters];
    updated[index][field] = value;
    setChapters(updated);
  };

  const removeChapter = async (index) => {
    // Note: User prompt didn't supply /api/chapters DELETE endpoint, so handling visually
    const updated = [...chapters];
    updated.splice(index, 1);
    setChapters(updated);
  };

  /* ---------------- LESSONS ---------------- */

  const addLesson = async (chapterIndex) => {
    try {
      const chap = chapters[chapterIndex];
      const newLessonPayload = {
        chapterid: chap.id, // Must exist in DB
        title: "New Lesson",
        mediaurl: "",
        duration: 0,
        idpreview: false,
        orderindex: chap.lessons.length + 1
      };

      const res = await api.post('/api/lessons', newLessonPayload);
      const createdLesson = res.data;

      const updated = [...chapters];
      updated[chapterIndex].lessons.push(createdLesson);

      setChapters(updated);

    } catch (error) {
      console.error("Failed to add lesson", error);
    }
  };

  const updateLessonLocally = (chapterIndex, lessonIndex, field, value) => {
    const updated = [...chapters];
    updated[chapterIndex].lessons[lessonIndex][field] = value;
    setChapters(updated);
  };

  const removeLesson = (chapterIndex, lessonIndex) => {
    // Note: User prompt didn't supply /api/lessons DELETE endpoint, handled visually
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

  if (!course) return <Container py="xl"><Text>Loading...</Text></Container>;

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

          {course.learning?.map((item, index) => (

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

          {chapters?.map((chapter, chapterIndex) => (

            <Card key={chapterIndex} withBorder p="md">

              <Group justify="space-between" mb="sm">

                <Title order={5}>
                  Chapter {chapter.orderindex || chapterIndex + 1}
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
                      updateChapterLocally(
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
                      updateChapterLocally(
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

                {chapter.lessons?.map((lesson, lessonIndex) => (

                  <Card key={lessonIndex} withBorder>

                    <Grid>

                      <Grid.Col span={4}>
                        <TextInput
                          label="Lesson Title"
                          value={lesson.title}
                          onChange={(e) =>
                            updateLessonLocally(
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
                            updateLessonLocally(
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
                            updateLessonLocally(
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
                            updateLessonLocally(
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