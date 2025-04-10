import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      setMsg("✅ Registered! Now login");
    } catch (err) {
      setMsg("❌ Email already exists");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input className="border p-2 w-full mb-2" name="name" placeholder="Name" onChange={handleChange} />
      <input className="border p-2 w-full mb-2" name="email" placeholder="Email" onChange={handleChange} />
      <input className="border p-2 w-full mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>Register</button>
      <p className="mt-2">{msg}</p>
    </div>
  );
}

export default Register;
