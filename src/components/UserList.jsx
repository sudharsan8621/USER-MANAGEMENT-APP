import { Link } from 'react-router-dom'
import './UserList.css'

function UserList({ users, onDelete, loading }) {
  // Display message when no users are available
  if (!loading && users.length === 0) {
    return (
      <div className="no-users">
        <h2>No users found</h2>
        <p>Start by creating a new user!</p>
        <Link to="/create" className="btn btn-primary">
          Create User
        </Link>
      </div>
    )
  }

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h1>Users Directory</h1>
        <Link to="/create" className="btn btn-success">
          + Add New User
        </Link>
      </div>
      
      <div className="user-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-card-header">
              <h3>{user.name}</h3>
            </div>
            <div className="user-card-body">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Company:</strong> {user.company?.name || 'N/A'}</p>
              <p><strong>City:</strong> {user.address?.city || 'N/A'}</p>
            </div>
            <div className="user-card-actions">
              <Link to={`/user/${user.id}`} className="btn btn-primary">
                View
              </Link>
              <Link to={`/edit/${user.id}`} className="btn btn-warning">
                Edit
              </Link>
              <button 
                onClick={() => onDelete(user.id)} 
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList