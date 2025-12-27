import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = isSignup
      ? 'http://localhost:4000/api/auth/signup'
      : 'http://localhost:4000/api/auth/login';

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      login(data);
      navigate('/dashboard'); // ✅ redirect
    } else {
      alert(data.message || 'Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

      {isSignup && (
        <input name="name" placeholder="Name" onChange={handleChange} />
      )}

      <input name="email" placeholder="Email" onChange={handleChange} />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      {isSignup && (
        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
        </select>
      )}

      <button onClick={handleSubmit}>
        {isSignup ? 'Create Account' : 'Login'}
      </button>

      <p onClick={() => setIsSignup(!isSignup)} style={styles.toggle}>
        {isSignup ? 'Already have an account? Login' : 'New user? Sign up'}
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 300,
    margin: '100px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  toggle: {
    color: 'blue',
    cursor: 'pointer',
    fontSize: 14
  }
};
