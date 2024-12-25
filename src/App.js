import React, { useEffect, useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://randomuser.me/api/?page=1&results=6&seed=abc');
      const data = await response.json();
      setUsers(data.results);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      {/* Outer Box */}
      <div className="bg-white border border-gray-300 shadow-xl rounded-lg w-full max-w-6xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          User Profiles
        </h1>
        {loading ? (
          <div className="text-center text-xl font-semibold text-gray-600">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Individual User Boxes */}
            {users.map((user, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 shadow-md rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={user.picture.large}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-2 border-blue-400 mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-800">
                  {user.name.first} {user.name.last}
                </h2>
                <p className="text-gray-600 capitalize">Gender: {user.gender}</p>
                <p className="text-gray-600">Phone: {user.phone}</p>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={fetchUsers}
          className="mt-8 px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-md hover:bg-blue-600 transition-colors duration-300 block mx-auto"
        >
          Refresh Users
        </button>
      </div>
    </div>
  );
};

export default App;

