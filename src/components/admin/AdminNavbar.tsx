import React from 'react'

const AdminNavbar: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
      <div className="flex items-center">
        <button className="text-gray-500 focus:outline-none lg:hidden">
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="relative mx-4 lg:mx-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 16C13.7614 16 16 13.7614 16 11C16 8.23858 13.7614 6 11 6C8.23858 6 6 8.23858 6 11C6 13.7614 8.23858 16 11 16Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <input
            className="w-32 pl-10 pr-4 rounded-md form-input sm:w-64 focus:border-indigo-600"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <button className="flex mx-4 text-gray-600 focus:outline-none">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 17H20L18.5951 15.4937C18.7624 14.9092 19 14.2621 19 13.5C19 11.0147 16.9853 9 14.5 9C12.0147 9 10 11.0147 10 13.5C10 14.2621 10.2376 14.9092 10.4049 15.4937L9 17H15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* <div
            x-show="dropdownOpen"
            onClick="dropdownOpen = false"
            className="fixed inset-0 z-10 w-full h-full"
          ></div> */}

          {/* <div
            x-show="dropdownOpen"
            className="absolute right-0 z-10 mt-2 overflow-hidden bg-white rounded-md shadow-xl w-80"
            style="width:20rem;"
          >
            <a
              href="#"
              className="flex items-center px-4 py-3 -mx-2 text-gray-600 hover:text-white hover:bg-indigo-600"
            >
              <img
                className="object-cover w-8 h-8 mx-1 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29329?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                alt="avatar"
              />
              <p className="mx-2 text-sm">
                <span className="font-bold">Sara Salah</span> replied on the
                <span className="font-bold text-indigo-400">Upload Image</span>
                article . 2m
              </p>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 -mx-2 text-gray-600 hover:text-white hover:bg-indigo-600"
            >
              <img
                className="object-cover w-8 h-8 mx-1 rounded-full"
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d951979?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                alt="avatar"
              />
              <p className="mx-2 text-sm">
                <span className="font-bold">James Carter</span> was assigned to the
                <span className="font-bold text-indigo-400">Fix an Issue</span>
                task . 1m
              </p>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 -mx-2 text-gray-600 hover:text-white hover:bg-indigo-600"
            >
              <img
                className="object-cover w-8 h-8 mx-1 rounded-full"
                src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                alt="avatar"
              />
              <p className="mx-2 text-sm">
                <span className="font-bold">Alexandra Smith</span> reviewed <span
                  className="font-bold text-indigo-400"
                  >27 new orders</span
                >
                . 3m
              </p>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 -mx-2 text-gray-600 hover:text-white hover:bg-indigo-600"
            >
              <img
                className="object-cover w-8 h-8 mx-1 rounded-full"
                src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                alt="avatar"
              />
              <p className="mx-2 text-sm">
                <span className="font-bold">Alexandra Smith</span> reviewed <span
                  className="font-bold text-indigo-400"
                  >27 new orders</span
                >
                . 3m
              </p>
            </a>
          </div> */}
        </div>

        <div className="relative">
          <button className="relative block w-10 h-10 overflow-hidden rounded-full shadow focus:outline-none">
            <img
              className="object-cover w-full h-full"
              src="https://img.icons8.com/?size=100&id=23242&format=png&color=000000"
              alt="Your avatar"
            />
          </button>

          {/* <div
            x-show="dropdownOpen"
            onClick="dropdownOpen = false"
            className="fixed inset-0 z-10 w-full h-full"
          ></div> */}

          {/* <div
            x-show="dropdownOpen"
            className="absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
              >Profile</a
            >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
              >Products</a
            >
            <a
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
              >Logout</a
            >
          </div> */}
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar
