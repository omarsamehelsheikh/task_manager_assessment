import { useState } from 'react';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                const res = await authService.login({ email: formData.email, password: formData.password });
                localStorage.setItem('token', res.data.token);
                navigate('/dashboard');
            } else {
                await authService.register(formData);
                alert("Registration successful! Please login.");
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {!isLogin && <input placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} required />}
                <input placeholder="Email" type="email" onChange={e => setFormData({...formData, email: e.target.value})} required />
                <input placeholder="Password" type="password" onChange={e => setFormData({...formData, password: e.target.value})} required />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}>
                {isLogin ? "Need an account? Register" : "Have an account? Login"}
            </p>
        </div>
    );
}