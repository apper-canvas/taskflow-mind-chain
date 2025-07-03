import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import TasksPage from '@/components/pages/TasksPage'
import Layout from '@/components/organisms/Layout'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App