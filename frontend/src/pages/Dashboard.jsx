import { useEffect, useState } from 'react';
import { taskService, authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const navigate = useNavigate();

    useEffect(() => {
        loadTasks(page);
    }, [page]);

    const loadTasks = async (pageNum) => {
        try {
            const res = await taskService.getAll(pageNum);
            setTasks(res.data.tasks);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            if(err.response && err.response.status === 401) handleLogout();
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        await taskService.create(newTask);
        setNewTask({ title: '', description: '' });
        loadTasks(page);
    };

    const handleStatus = async (id, status) => {
        await taskService.updateStatus(id, status);
        loadTasks(page);
    };

    const handleDelete = async (id) => {
        if (confirm("Delete task?")) {
            await taskService.delete(id);
            loadTasks(page);
        }
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Task Dashboard</h1>
                <button onClick={handleLogout} style={{ background: '#ff4444', color: 'white' }}>Logout</button>
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px', marginBottom: '20px', padding: '15px', background: '#f5f5f5' }}>
                <input value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} placeholder="Task Title" required style={{ flex: 1 }} />
                <input value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} placeholder="Description" style={{ flex: 2 }} />
                <button type="submit">Add Task</button>
            </form>

            <div style={{ display: 'grid', gap: '10px' }}>
                {tasks.map(task => (
                    <div key={task.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: '0 0 5px 0', textDecoration: task.status === 'done' ? 'line-through' : 'none' }}>{task.title}</h3>
                            <p style={{ margin: 0, color: '#666' }}>{task.description}</p>
                            <small>Status: <strong>{task.status}</strong></small>
                        </div>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {task.status !== 'done' && <button onClick={() => handleStatus(task.id, 'done')}>Done</button>}
                            <button onClick={() => handleDelete(task.id)} style={{ background: '#ff4444', color: 'white' }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}> Previous </button>
                <span> Page {page} of {totalPages || 1} </span>
                <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}> Next </button>
            </div>
        </div>
    );
}