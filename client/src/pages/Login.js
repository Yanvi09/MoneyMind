import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const [msg, setMsg] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      login(res.data.user);
      setMsg("✅ Logged in!");
    } catch (err) {
      setMsg("❌ Invalid login");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input className="border p-2 w-full mb-2" name="email" placeholder="Email" onChange={handleChange} />
      <input className="border p-2 w-full mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>Login</button>
      <p className="mt-2">{msg}</p>
    </div>
  );
}

export default Login;
