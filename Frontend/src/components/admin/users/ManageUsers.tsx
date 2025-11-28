import React, { useState, useEffect } from 'react';
import { Search, Trash2, Shield, User as UserIcon, MoreVertical, Check, X } from 'lucide-react';
import { adminApi } from '../../../api/admin.api';
import { User } from '../../../types';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ManageUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState<string | null>(null); // userId
    const [selectedRole, setSelectedRole] = useState<string>('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await adminApi.getAllUsers();
            setUsers(data);
        } catch (error) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

        try {
            await adminApi.deleteUser(id);
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    const handleRoleUpdate = async (id: number, newRole: string) => {
        try {
            await adminApi.updateUser(id, { role: newRole });
            toast.success('User role updated successfully');
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            toast.error('Failed to update user role');
        }
    };

    const filteredUsers = users.filter(user =>
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="text-center py-12 text-gray-400">Loading users...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
                <p className="text-gray-400">Manage user access and roles</p>
            </div>

            {/* Search */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-black/20">
                            <tr>
                                <th className="text-left py-4 px-6 text-gray-400 font-medium">User</th>
                                <th className="text-left py-4 px-6 text-gray-400 font-medium">Email</th>
                                <th className="text-left py-4 px-6 text-gray-400 font-medium">Role</th>
                                <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
                                <th className="text-left py-4 px-6 text-gray-400 font-medium">Joined</th>
                                <th className="text-right py-4 px-6 text-gray-400 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.map((user: any) => (
                                <tr key={user.user_id} className="hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm font-bold text-white">
                                                {user.first_name?.[0]}{user.last_name?.[0]}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{user.first_name} {user.last_name}</p>
                                                <p className="text-xs text-gray-500">ID: {user.user_id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-300">{user.email}</td>
                                    <td className="py-4 px-6">
                                        {editingUser === user.user_id ? (
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={selectedRole}
                                                    onChange={(e) => setSelectedRole(e.target.value)}
                                                    className="bg-black/40 border border-white/20 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-yellow-400"
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                                <button
                                                    onClick={() => handleRoleUpdate(user.user_id, selectedRole)}
                                                    className="p-1 hover:bg-green-500/20 text-green-400 rounded"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setEditingUser(null)}
                                                    className="p-1 hover:bg-red-500/20 text-red-400 rounded"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <span
                                                onClick={() => {
                                                    setEditingUser(user.user_id);
                                                    setSelectedRole(user.role);
                                                }}
                                                className={`cursor-pointer px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${user.role === 'admin'
                                                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20'
                                                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                                                    }`}
                                            >
                                                {user.role === 'admin' ? <Shield className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                                                <span className="capitalize">{user.role}</span>
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/20">
                                            Active
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-400 text-sm">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button
                                            onClick={() => handleDelete(user.user_id)}
                                            className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                                            title="Delete User"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No users found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
