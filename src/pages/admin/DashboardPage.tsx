import React from 'react'

const DashboardPage: React.FC = () => {
  return (
    <>
      <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
      <div className="mt-4">
        <div className="flex flex-wrap -mx-6">
          <div className="w-full px-6 mt-4 sm:w-1/2 xl:w-1/3">
            <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
              <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a4 4 0 014-4h12.356M17 20h-2.172a3 3 0 00-2.828 0M9 10a4 4 0 110-8 4 4 0 010 8zm-1.5 4h3"
                  ></path>
                </svg>
              </div>
              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">200</h4>
                <div className="text-gray-500">Total Users</div>
              </div>
            </div>
          </div>

          <div className="w-full px-6 mt-4 sm:w-1/2 xl:w-1/3">
            <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
              <div className="p-3 bg-blue-600 bg-opacity-75 rounded-full">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M12 16h.01"
                  ></path>
                </svg>
              </div>
              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">50</h4>
                <div className="text-gray-500">Total Products</div>
              </div>
            </div>
          </div>

          <div className="w-full px-6 mt-4 sm:w-1/2 xl:w-1/3">
            <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
              <div className="p-3 bg-green-600 bg-opacity-75 rounded-full">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">120</h4>
                <div className="text-gray-500">Total Orders</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
