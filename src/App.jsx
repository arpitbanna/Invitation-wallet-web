import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddEvent from './pages/AddEvent';
import CalendarView from './pages/CalendarView';
import EventDetails from './pages/EventDetails';
import Settings from './pages/Settings';

import Layout from './components/layout/Layout';

import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEvent />} />
          <Route path="/edit/:id" element={<AddEvent />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
