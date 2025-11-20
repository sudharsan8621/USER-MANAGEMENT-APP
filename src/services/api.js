// API service for handling all HTTP requests to JSONPlaceholder

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    if (!response.ok) {
      throw new Error('Failed to create user')
    }
    return await response.json()
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

// Update an existing user
export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    if (!response.ok) {
      throw new Error('Failed to update user')
    }
    return await response.json()
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Failed to delete user')
    }
    return true
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}