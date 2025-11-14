import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProviders } from '@/providers/AppProviders';
import { AppLayout } from '@/components/layout/AppLayout';
import { MainPage } from '@/pages/MainPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export const App = () => {
    return (
        <AppProviders>
            <Router>
                <Routes>
                    {/* Authentication Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    
                    {/* Protected Main Application */}
                    <Route 
                        path="/" 
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <MainPage />
                                </AppLayout>
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </Router>
        </AppProviders>
    );
};
