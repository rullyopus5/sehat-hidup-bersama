
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PatientDashboard from '@/components/dashboards/PatientDashboard';
import NurseDashboard from '@/components/dashboards/NurseDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import Layout from '@/components/layout/Layout';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'patient':
        return <PatientDashboard />;
      case 'nurse':
        return <NurseDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Tidak ada dashboard tersedia</div>;
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
};

export default Dashboard;
