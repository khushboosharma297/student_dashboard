import express from "express";
import { courses, lessons, activities } from "../seed.js";

const router = express.Router();

router.get("/:userId", (req, res) => {
  const userId = Number(req.params.userId);

  const userActivities = activities.filter(
    act => act.userId === userId
  );

  if (userActivities.length === 0) {
    return res.json({ isEmpty: true });
  }

  // Completed lessons
  const completedLessons = new Set(
    userActivities.map(a => a.lessonId)
  ).size;

  // Total time
  const timeSpent = userActivities.reduce(
    (sum, a) => sum + a.timeSpent,
    0
  );

  // Trend (time series)
  const trend = userActivities.map(a => a.timeSpent);

  // Course-wise aggregation
  const courseDetails = courses.map(course => {
    const courseLessons = lessons.filter(
      l => l.courseId === course.id
    );

    const completed = userActivities.filter(act =>
      courseLessons.some(l => l.id === act.lessonId)
    );

    return {
      courseId: course.id,
      courseName: course.name,
      totalLessons: courseLessons.length,
      completedLessons: completed.length,
      timeSpent: completed.reduce(
        (sum, c) => sum + c.timeSpent,
        0
      )
    };
  });

  res.json({
    completedLessons,
    timeSpent,
    trend,
    courses: courseDetails,
    isEmpty: false
  });
});

export default router;
