import { useEffect, useState, useContext } from "react";
import { getDashboard } from "../api";
import Charts from "../components/Charts";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  const [data, setData] = useState({
    completedLessons: 0,
    timeSpent: 0,
    trend: [],
    courses: [],
    isEmpty: false
  });

  useEffect(() => {
    getDashboard()
      .then(res => {
        setData({
          completedLessons: res?.completedLessons || 0,
          timeSpent: res?.timeSpent || 0,
          trend: res?.trend || [],
          courses: res?.courses || [],
          isEmpty: res?.isEmpty || false
        });
      })
      .catch(() => {
        console.error("Failed to load dashboard");
      });
  }, []);

  if (data.isEmpty)
    return (
      <div className="dashboard">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
        <p className="empty-state">No activity yet. Start learning!</p>
      </div>
    );

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">Student Dashboard</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Completed Lessons</h4>
          <p>{data.completedLessons}</p>
        </div>

        <div className="stat-card">
          <h4>Total Time Spent</h4>
          <p>{data.timeSpent} mins</p>
        </div>
      </div>

      {/* COURSE DETAILS */}
      <h3 className="section-title">Course Progress</h3>

      {data.courses.length === 0 ? (
        <p>No course progress available</p>
      ) : (
        <div className="course-grid">
          {data.courses.map(course => (
            <div key={course.courseId} className="course-card">
              <h4>{course.courseName}</h4>
              <p>
                Lessons: {course.completedLessons} / {course.totalLessons}
              </p>
              <p>Time Spent: {course.timeSpent} mins</p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      (course.completedLessons / course.totalLessons) * 100
                    }%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CHARTS */}
      {data.trend.length > 0 && <Charts trend={data.trend} />}
    </div>
  );
}
