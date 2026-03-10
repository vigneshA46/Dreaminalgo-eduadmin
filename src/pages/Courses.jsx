import { Box, Button, Card, Flex, Grid, Group, Stack, Text, TextInput } from '@mantine/core'
import { IconClockHour4, IconStar } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Courses = () => {

  const navigation = useNavigate()

  const [activeTab, setActiveTab] = useState('Trading');
  const [publishedCourses, setPublishedCourses] = useState([]);
  const [draftCourses, setDraftCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const [pubRes, draftRes] = await Promise.all([
          api.post(`/api/courses/${activeTab}/published`), // Changed to POST as per prompt
          api.post(`/api/courses/${activeTab}/draft`)      // Using lowercase "draft" consistent with backend status normally
        ]);
        setPublishedCourses(pubRes.data);
        setDraftCourses(draftRes.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };
    fetchCourses();
  }, [activeTab]);

  const renderCourseCard = (course) => (
    <Grid.Col key={course.id} span={3}>
      <Card
        onClick={() => navigation("/singlecourse")}
        padding={0}
        radius="lg"
        style={{
          border: '1px solid #e9ecef',
          overflow: 'hidden',
          height: '100%',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          backgroundColor: 'white'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Course Image with Icon */}
        <Box
          style={{
            position: 'relative',
            width: '100%',
            height: '180px',
            backgroundColor: '#0a1929',
            backgroundImage: `url(${course.bgimage_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                fontSize: '60px',
                color: 'white',
                opacity: 0.9
              }}
            >
              {course.icon || (course.category === 'Trading' ? '📈' : '💻')}
            </Text>
          </Box>
        </Box>

        {/* Course Content */}
        <Box style={{ padding: '20px' }}>
          {/* Course Title */}
          <Text
            size="md"
            style={{
              color: '#212529',
              fontWeight: 600,
              marginBottom: '8px',
              lineHeight: '1.4',
              fontSize: '15px',
              minHeight: '42px'
            }}
          >
            {course.title}
          </Text>

          {/* Instructor */}
          <Text
            size="xs"
            style={{
              color: '#6c757d',
              marginBottom: '12px',
              fontSize: '12px'
            }}
          >
            A Course by {course.author || course.instructor}
          </Text>

          {/* Description */}
          <Text
            size="sm"
            style={{
              color: '#495057',
              lineHeight: '1.6',
              marginBottom: '20px',
              fontSize: '13px',
              height: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {course.description}
          </Text>

          {/* Footer with Level and Duration */}
          <Flex align={"center"} justify={"space-between"} style={{ marginTop: 'auto' }}>
            {/* Level */}
            <Group spacing={6}>
              <IconStar size={16} color="#ffd700" fill="#ffd700" />
              <Text
                size="sm"
                style={{
                  color: '#212529',
                  fontWeight: 600,
                  fontSize: '13px'
                }}
              >
                {course.level || 'Beginner'}
              </Text>
            </Group>

            {/* Duration */}
            <Group spacing={6}>
              <IconClockHour4 size={16} color="#6c757d" />
              <Text
                size="sm"
                style={{
                  color: '#6c757d',
                  fontSize: '13px'
                }}
              >
                {course.duration || 'N/A'}
              </Text>
            </Group>
          </Flex>
        </Box>
      </Card>
    </Grid.Col>
  );

  return (
    <>
      <Stack>

        <Text size='2rem' py={"2rem"} fw={"600"}>Courses</Text>

        {/* Not Published Section */}
        <Box>

          <Flex mr={"3rem"} mb={"2rem"} align={"center"} justify={"space-between"} >
            <Text size='1.5rem' fw={"600"} >Not Published</Text>
            <TextInput
              placeholder='search'
            />
          </Flex>
          <Group gap="md" mb="xl">
            <Button
              size="md"
              radius="xl"
              style={{
                backgroundColor: activeTab === 'Trading' ? '#000000ff' : 'transparent',
                color: activeTab === 'Trading' ? 'white' : '#495057',
                border: 'none',
                fontWeight: 500,
                paddingLeft: '28px',
                paddingRight: '28px',
              }}
              onClick={() => setActiveTab('Trading')}
            >
              Trading
            </Button>
            <Button
              size="md"
              radius="xl"
              variant="subtle"
              style={{
                backgroundColor: activeTab === 'Coding' ? '#000000ff' : 'transparent',
                color: activeTab === 'Coding' ? 'white' : '#495057',
                border: 'none',
                fontWeight: 500,
                paddingLeft: '28px',
                paddingRight: '28px',
              }}
              onClick={() => setActiveTab('Coding')}
            >
              Coding
            </Button>
          </Group>

          <Grid gutter={20}>
            {draftCourses.map(renderCourseCard)}
          </Grid>
        </Box>

        {/* published courses */}

        <Box>

          <Flex mr={"3rem"} my={"2rem"} align={"center"} justify={"space-between"} >
            <Text size='1.5rem' fw={"600"} >Published Courses </Text>
            <TextInput
              placeholder='search'
            />
          </Flex>
          <Group gap="md" mb="xl">
            <Button
              size="md"
              radius="xl"
              style={{
                backgroundColor: activeTab === 'Trading' ? '#000000ff' : 'transparent',
                color: activeTab === 'Trading' ? 'white' : '#495057',
                border: 'none',
                fontWeight: 500,
                paddingLeft: '28px',
                paddingRight: '28px',
              }}
              onClick={() => setActiveTab('Trading')}
            >
              Trading
            </Button>
            <Button
              size="md"
              radius="xl"
              variant="subtle"
              style={{
                backgroundColor: activeTab === 'Coding' ? '#000000ff' : 'transparent',
                color: activeTab === 'Coding' ? 'white' : '#495057',
                border: 'none',
                fontWeight: 500,
                paddingLeft: '28px',
                paddingRight: '28px',
              }}
              onClick={() => setActiveTab('Coding')}
            >
              Coding
            </Button>
          </Group>

          <Grid gutter={20}>
            {publishedCourses.map(renderCourseCard)}
          </Grid>
        </Box>
      </Stack>
    </>
  )
}

export default Courses
