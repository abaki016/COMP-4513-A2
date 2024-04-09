const Login = ({ onLogin }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="relative min-h-screen bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1627937027653-567739d28b9c?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
      {/* Overlay with blur effect */}
      <div className="absolute inset-0 bg-cover" style={{ filter: 'blur(8px)' }}></div>
      {/* Semi-transparent overlay to darken the background image */}
      <div className="absolute inset-0 bg-black opacity-25"></div>

      {/* Modal content */}
      <div className="p-8 bg-white rounded-lg shadow-xl relative z-10">
        <h2 className="mb-4 text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
            <input type="text" id="username" placeholder="test@example.com" name="username" className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input type="password" id="password" name="password" placeholder="password" className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-customRed3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
