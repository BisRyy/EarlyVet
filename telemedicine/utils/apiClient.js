// Mock user data
const mockUsers = [
  {
    id: "123",
    name: "Farmer John",
    email: "farmer.john@example.com",
    phone: "1234567890",
    role: "farmer",
  },
  {
    id: "456",
    name: "Dr. Smith",
    email: "dr.smith@example.com",
    phone: "0987654321",
    role: "vet",
  },
];

// Fetch user details from mock data
const getUserById = async (userId) => {
  try {
    // const user = mockUsers.find((user) => user.id === userId);
    // if (!user) {
    //   console.error(`User with ID ${userId} not found`);
    //   return null;
    // }
    return mockUsers[0];
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error.message);
    return null;
  }
};

module.exports = { getUserById };
