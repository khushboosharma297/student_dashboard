export const users = [
  { id: 1, email: "student@test.com", role: "student" },
  { id: 2, email: "mentor@test.com", role: "mentor" }
];

export const courses = [
  { id: 1, name: "React Basics" },
  { id: 2, name: "Advanced JavaScript" }
];

export const lessons = [
  { id: 1, courseId: 1, title: "JSX" },
  { id: 2, courseId: 1, title: "Hooks" },
  { id: 3, courseId: 1, title: "State & Props" },

  { id: 4, courseId: 2, title: "Closures" },
  { id: 5, courseId: 2, title: "Promises" }
];

export const activities = [
  { userId: 1, lessonId: 1, timeSpent: 45, date: "2024-12-10" },
  { userId: 1, lessonId: 2, timeSpent: 30, date: "2024-12-11" },
  { userId: 1, lessonId: 4, timeSpent: 40, date: "2024-12-12" }
];
