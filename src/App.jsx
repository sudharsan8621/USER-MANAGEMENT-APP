import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import UserForm from './components/UserForm'
import Navbar from './components/Navbar'
import LoadingSpinner from './components/LoadingSpinner'
import { fetchUsers, createUser, updateUser, deleteUser } from './services/api'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

  // Fetch users on component mount
  useEffect(() => {
    loadUsers()
  }, [])

  // Function to load users from API
  const loadUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      setError('Failed to fetch users. Please try again.')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  // Show notification with auto-dismiss
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // Handle creating a new user
  const handleCreateUser = async (userData) => {
    try {
      setLoading(true)
      const newUser = await createUser(userData)
      // Add the new user to the beginning of the list
      setUsers([newUser, ...users])
      showNotification('User created successfully!')
      return true
    } catch (err) {
      setError('Failed to create user. Please try again.')
      console.error('Error creating user:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Handle updating an existing user
  const handleUpdateUser = async (id, userData) => {
    try {
      setLoading(true)
      const updatedUser = await updateUser(id, userData)
      // Update the user in the list
      setUsers(users.map(user => 
        user.id === id ? { ...user, ...updatedUser } : user
      ))
      showNotification('User updated successfully!')
      return true
    } catch (err) {
      setError('Failed to update user. Please try again.')
      console.error('Error updating user:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      setLoading(true)
      await deleteUser(id)
      // Remove the user from the list
      setUsers(users.filter(user => user.id !== id))
      showNotification('User deleted successfully!')
    } catch (err) {
      setError('Failed to delete user. Please try again.')
      console.error('Error deleting user:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <Navbar />
      
      {/* Notification display */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* Loading spinner */}
      {loading && <LoadingSpinner />}

      {/* Routes */}
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={
              <UserList 
                users={users} 
                onDelete={handleDeleteUser}
                loading={loading}
              />
            } 
          />
          <Route 
            path="/user/:id" 
            element={
              <UserDetail 
                users={users}
                onUpdate={handleUpdateUser}
                onDelete={handleDeleteUser}
              />
            } 
          />
          <Route 
            path="/create" 
            element={
              <UserForm 
                onSubmit={handleCreateUser}
                title="Create New User"
              />
            } 
          />
          <Route 
            path="/edit/:id" 
            element={
              <UserForm 
                users={users}
                onSubmit={handleUpdateUser}
                title="Edit User"
                isEdit={true}
              />
            } 
          />
        </Routes>
      </div>
    </div>
  )
}

export default App