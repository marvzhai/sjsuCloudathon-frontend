'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Package,
  CreditCard,
  Heart,
  Settings,
  LogOut,
  Edit,
  Loader2,
  Check,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // Mock orders data - in a real app, you would fetch this from the API
  const orders = [
    {
      id: 'ORD-1234',
      date: 'April 15, 2024',
      status: 'Delivered',
      total: 259.98,
      items: [
        {
          id: '1',
          name: 'Wireless Headphones',
          price: 129.99,
          image: '/placeholder.svg?height=60&width=60',
          quantity: 2,
        },
      ],
    },
    {
      id: 'ORD-5678',
      date: 'April 2, 2024',
      status: 'Processing',
      total: 79.99,
      items: [
        {
          id: '3',
          name: 'Portable Bluetooth Speaker',
          price: 79.99,
          image: '/placeholder.svg?height=60&width=60',
          quantity: 1,
        },
      ],
    },
    {
      id: 'ORD-9012',
      date: 'March 20, 2024',
      status: 'Delivered',
      total: 149.99,
      items: [
        {
          id: '2',
          name: 'Smart Watch Series 7',
          price: 149.99,
          image: '/placeholder.svg?height=60&width=60',
          quantity: 1,
        },
      ],
    },
  ];

  // Mock wishlist data - in a real app, you would fetch this from the API
  const wishlist = [
    {
      id: '2',
      name: 'Smart Watch Series 7',
      price: 299.99,
      image: '/placeholder.svg?height=80&width=80',
      rating: 4.9,
      reviewCount: 85,
      badge: 'New',
    },
    {
      id: '5',
      name: 'Premium Leather Wallet',
      price: 59.99,
      image: '/placeholder.svg?height=80&width=80',
      rating: 4.6,
      reviewCount: 38,
    },
  ];

  // Initialize profile data when user data is loaded
  useState(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to current user data
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500';
      case 'processing':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-rose-500/20 to-purple-600/20 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-purple-600">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {user.name || 'User'}
                </h2>
                <p className="text-slate-500">{user.email}</p>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className={cn(
                        'w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors',
                        activeTab === item.id
                          ? 'bg-purple-50 text-purple-700'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                      )}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <Icon
                        className={cn(
                          'h-5 w-5 mr-3',
                          activeTab === item.id
                            ? 'text-purple-600'
                            : 'text-slate-400',
                        )}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                <button
                  className="w-full flex items-center px-4 py-3 rounded-lg text-left text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-3 text-slate-400" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6">
              {activeTab === 'overview' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Profile Information
                    </h2>
                    {!isEditing ? (
                      <Button
                        onClick={handleEditProfile}
                        variant="outline"
                        className="border-slate-200 hover:bg-slate-100/80 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          className="border-slate-200 hover:bg-slate-100/80 transition-colors"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-90 transition-opacity"
                        >
                          {isSaving ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <Check className="h-4 w-4 mr-2" />
                          )}
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
