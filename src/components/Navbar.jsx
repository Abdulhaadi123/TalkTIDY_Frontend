// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Navbar = () => {
//   const location = useLocation();
//   const isAuthPage = ['/login', '/register'].includes(location.pathname);

//   if (isAuthPage) return null;

//   return (
//     <header className="bg-white shadow sticky top-0 z-10">
//       <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
//         <Link to="/" className="text-xl font-bold text-blue-700">Presentation AI</Link>
//         <div className="space-x-4">
//           <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
//           <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
//           <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
//             Login
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;
