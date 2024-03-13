import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const Chat = lazy(() => import("@/pages/Chat"));
const Groups = lazy(() => import("@/pages/Groups"));
const Login = lazy(() => import("@/pages/Login"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const ChatManagement = lazy(() => import("@/pages/admin/ChatManagement"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const MessageManagement = lazy(() => import("@/pages/admin/MessageManagement"));

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { LayoutLoader } from "@/components/layout/Loaders";

const user = true;

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LayoutLoader />}>
                <Routes>
                    <Route element={<ProtectedRoute user={user} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/chat/:chatId" element={<Chat />} />
                        <Route path="/groups" element={<Groups />} />
                    </Route>

                    <Route
                        path="/login"
                        element={
                            <ProtectedRoute user={!user} redirect="/">
                                <Login />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/chats" element={<ChatManagement />} />
                    <Route path="/admin/users" element={<UserManagement />} />
                    <Route
                        path="/admin/messages"
                        element={<MessageManagement />}
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
