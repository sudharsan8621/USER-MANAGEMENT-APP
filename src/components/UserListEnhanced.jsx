import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './UserList.css'

function UserList({ users, onDelete, loading }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  
  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }
  
  // Filter and sort users
  const processedUsers = useMemo(() => {
    let filteredUsers = users
    
    // Apply search filter
    if (searchTerm) {
      filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company?.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filteredUsers = [...filteredUsers].sort((a, b) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]
        
        // Handle nested properties
        if (sortConfig.key === 'company') {
          aValue = a.company?.name || ''
          bValue = b.company?.name || ''
        }
        if (sortConfig.key === 'city') {
          aValue = a.address?.city || ''
          bValue = b.address?.city || ''
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }
    
    return filteredUsers
  }, [users, searchTerm, sortConfig])
  
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
      
      {/* Search Bar */}
      <div className="table-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="results-info">
          Showing {processedUsers.length} of {users.length} users
        </div>
      </div>
      
      {/* Table Container */}
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="sortable">
                ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('name')} className="sortable">
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('username')} className="sortable">
                Username {sortConfig.key === 'username' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('email')} className="sortable">
                Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Phone</th>
              <th onClick={() => handleSort('company')} className="sortable">
                Company {sortConfig.key === 'company' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('city')} className="sortable">
                City {sortConfig.key === 'city' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {processedUsers.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-results">
                  No users found matching "{searchTerm}"
                </td>
              </tr>
            ) : (
              processedUsers.map(user => (
                <tr key={user.id}>
                  <td data-label="ID">{user.id}</td>
                  <td data-label="Name">
                    <div className="user-name">
                      {user.name}
                    </div>
                  </td>
                  <td data-label="Username">{user.username}</td>
                  <td data-label="Email">
                    <a href={`mailto:${user.email}`} className="email-link">
                      {user.email}
                    </a>
                  </td>
                  <td data-label="Phone">{user.phone}</td>
                  <td data-label="Company">{user.company?.name || 'N/A'}</td>
                  <td data-label="City">{user.address?.city || 'N/A'}</td>
                  <td data-label="Website">
                    {user.website ? (
                      <a 
                        href={`https://${user.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="website-link"
                      >
                        {user.website}
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td data-label="Actions">
                    <div className="action-buttons">
                      <Link 
                        to={`/user/${user.id}`} 
                        className="btn-action btn-view"
                        title="View Details"
                      >
                        👁️
                      </Link>
                      <Link 
                        to={`/edit/${user.id}`} 
                        className="btn-action btn-edit"
                        title="Edit User"
                      >
                        ✏️
                      </Link>
                      <button 
                        onClick={() => onDelete(user.id)} 
                        className="btn-action btn-delete"
                        title="Delete User"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* User count */}
      <div className="user-count">
        Total Users: <strong>{processedUsers.length}</strong>
      </div>
    </div>
  )
}

export default UserList