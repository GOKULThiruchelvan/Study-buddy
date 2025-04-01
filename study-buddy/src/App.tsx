import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import StudyPlan from './pages/StudyPlan';
import Summarization from './pages/Summarization';
import QuestionAnswering from './pages/QuestionAnswering';
import Resources from './pages/Resources';
import MultiFormatLearning from './pages/MultiFormatLearning';
import Collaboration from './pages/Collaboration';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {session && <Navbar />}
        <div className="flex">
          {session && <Sidebar />}
          <main className={`flex-1 p-6 ${!session ? 'w-full' : ''}`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={!session ? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/signup" element={!session ? <Signup /> : <Navigate to="/dashboard" />} />
              <Route
                path="/dashboard"
                element={session ? <UserDashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/study-plan"
                element={session ? <StudyPlan /> : <Navigate to="/login" />}
              />
              <Route
                path="/summarize"
                element={session ? <Summarization /> : <Navigate to="/login" />}
              />
              <Route
                path="/ask"
                element={session ? <QuestionAnswering /> : <Navigate to="/login" />}
              />
              <Route
                path="/resources"
                element={session ? <Resources /> : <Navigate to="/login" />}
              />
              <Route
                path="/multi-format"
                element={session ? <MultiFormatLearning /> : <Navigate to="/login" />}
              />
              <Route
                path="/collaborate"
                element={session ? <Collaboration /> : <Navigate to="/login" />}
              />
              <Route
                path="/analytics"
                element={session ? <Analytics /> : <Navigate to="/login" />}
              />
              <Route
                path="/settings"
                element={session ? <Settings /> : <Navigate to="/login" />}
              />
            </Routes>
          </main>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;