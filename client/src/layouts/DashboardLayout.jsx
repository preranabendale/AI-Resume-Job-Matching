import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FaFileAlt,
  FaBriefcase,
  FaRobot,
  FaUserCircle,
} from "react-icons/fa";

const data = [
  {
    name: "ATS",
    value: 80,
  },
  {
    name: "Jobs",
    value: 12,
  },
  {
    name: "Skills",
    value: 15,
  },
  {
    name: "Applied",
    value: 6,
  },
];

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            Welcome 👋
          </h1>

          <p className="text-gray-500 mt-2">
            {user?.fullName}
          </p>
        </div>

        <FaUserCircle
          size={60}
          className="text-blue-600"
        />

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <FaRobot
            size={40}
            className="text-purple-600"
          />

          <h2 className="mt-5 text-gray-500">
            ATS Score
          </h2>

          <h1 className="text-4xl font-bold">
            80%
          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <FaBriefcase
            size={40}
            className="text-green-600"
          />

          <h2 className="mt-5 text-gray-500">
            Jobs Found
          </h2>

          <h1 className="text-4xl font-bold">
            12
          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <FaFileAlt
            size={40}
            className="text-blue-600"
          />

          <h2 className="mt-5 text-gray-500">
            Resume Uploaded
          </h2>

          <h1 className="text-4xl font-bold">
            Yes
          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <FaUserCircle
            size={40}
            className="text-orange-500"
          />

          <h2 className="mt-5 text-gray-500">
            Applied Jobs
          </h2>

          <h1 className="text-4xl font-bold">
            6
          </h1>

        </div>

      </div>

      {/* Chart */}

      <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Resume Overview
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#4F46E5"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* AI Suggestions */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold">
            AI Suggestions
          </h2>

          <ul className="list-disc ml-6 mt-5 space-y-3 text-gray-600">

            <li>Add Docker to your skills.</li>

            <li>Learn TypeScript.</li>

            <li>Improve project descriptions.</li>

            <li>Add deployment links.</li>

            <li>Include achievements.</li>

          </ul>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold">
            Recommended Jobs
          </h2>

          <div className="mt-6 space-y-4">

            <div className="border rounded-xl p-4">

              <h3 className="font-bold">
                MERN Stack Developer
              </h3>

              <p className="text-gray-500">
                Pune
              </p>

            </div>

            <div className="border rounded-xl p-4">

              <h3 className="font-bold">
                React Developer
              </h3>

              <p className="text-gray-500">
                Mumbai
              </p>

            </div>

            <div className="border rounded-xl p-4">

              <h3 className="font-bold">
                Full Stack Developer
              </h3>

              <p className="text-gray-500">
                Bangalore
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;