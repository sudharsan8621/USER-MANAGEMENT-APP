import { useParams, Link, useNavigate } from 'react-router-dom'
import './UserDetail.css'

function UserDetail({ users, onDelete }) {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Find the user by ID
  const user = users.find(u => u.id === parseInt(id))
  
  // Handle case when user is not found
  if (!user) {
    return (
      <div className="user-detail-error">
        <h2>User Not Found</h2>
        <p>The user you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    )
  }
  
  // Handle delete and redirect
  const handleDelete = async () => {
    await onDelete(user.id)
    navigate('/')
  }
  
  return (
    <div className="user-detail">
      <div className="user-detail-header">
        <h1>User Details</h1>
        <Link to="/" className="btn btn-secondary">
          ← Back to List
        </Link>
      </div>
      
      <div className="user-detail-card">
        <div className="detail-section">
          <h2>Personal Information</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Name:</label>
              <p>{user.name}</p>
            </div>
            <div className="detail-item">
              <label>Username:</label>
              <p>{user.username}</p>
            </div>
            <div className="detail-item">
              <label>Email:</label>
              <p>{user.email}</p>
            </div>
            <div className="detail-item">
              <label>Phone:</label>
              <p>{user.phone}</p>
            </div>
            <div className="detail-item">
              <label>Website:</label>
              <p>{user.website}</p>
            </div>
          </div>
        </div>
        
        <div className="detail-section">
          <h2>Address</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Street:</label>
              <p>{user.address?.street} {user.address?.suite}</p>
            </div>
            <div className="detail-item">
              <label>City:</label>
              <p>{user.address?.city}</p>
            </div>
            <div className="detail-item">
              <label>Zipcode:</label>
              <p>{user.address?.zipcode}</p>
            </div>
          </div>
        </div>
        
        <div className="detail-section">
          <h2>Company</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Name:</label>
              <p>{user.company?.name}</p>
            </div>
            <div className="detail-item">
              <label>Catch Phrase:</label>
              <p>{user.company?.catchPhrase}</p>
            </div>
            <div className="detail-item">
              <label>Business:</label>
              <p>{user.company?.bs}</p>
            </div>
          </div>
        </div>
        
        <div className="detail-actions">
          <Link to={`/edit/${user.id}`} className="btn btn-warning">
            Edit User
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete User
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserDetail