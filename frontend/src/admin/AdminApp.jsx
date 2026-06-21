import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './pages/AdminBookings';
import AdminYogadhanBookings from './pages/AdminYogadhanBookings';
import AdminContacts from './pages/AdminContacts';
import AdminTeaching from './pages/AdminTeaching';
import AdminPayments from './pages/AdminPayments';
import AdminServices from './pages/cms/AdminServices';
import AdminBlogs from './pages/cms/AdminBlogs';
import AdminTestimonials from './pages/cms/AdminTestimonials';
import AdminVastuTips from './pages/cms/AdminVastuTips';
import AdminHome from './pages/cms/AdminHome';
import AdminAbout from './pages/cms/AdminAbout';
import AdminYogadhan from './pages/cms/AdminYogadhan';
import AdminContactInfo from './pages/cms/AdminContactInfo';

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="yogdan-bookings" element={<AdminYogadhanBookings />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="teaching" element={<AdminTeaching />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="cms/services" element={<AdminServices />} />
          <Route path="cms/blogs" element={<AdminBlogs />} />
          <Route path="cms/testimonials" element={<AdminTestimonials />} />
          <Route path="cms/vastu-tips" element={<AdminVastuTips />} />
          <Route path="cms/home" element={<AdminHome />} />
          <Route path="cms/about" element={<AdminAbout />} />
          <Route path="cms/yogadhan" element={<AdminYogadhan />} />
          <Route path="cms/contact-info" element={<AdminContactInfo />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
