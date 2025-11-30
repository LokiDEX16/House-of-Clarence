'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="navbar bg-base-900 text-base-content sticky top-0 z-50 border-b border-base-700">
      <div className="container mx-auto px-4 flex justify-between items-center w-full">
        {/* Logo */}
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-2xl font-bold text-gold-500">
            HOC
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex gap-6 flex-1 justify-center">
          <Link href="/shop" className="link link-hover text-base-100 hover:text-gold-500">
            Shop
          </Link>
          <Link href="/market" className="link link-hover text-base-100 hover:text-gold-500">
            Market
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <Link href="/cart" className="btn btn-ghost btn-circle indicator">
            <span className="indicator-item badge badge-sm badge-primary">3</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </Link>

          <div className="dropdown dropdown-end">
            {user ? (
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 flex items-center justify-center text-white font-bold">
                  {user.email?.[0].toUpperCase() || 'U'}
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="btn btn-primary btn-sm">
                Sign In
              </Link>
            )}

            {user && (
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-800 rounded-box w-52"
              >
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <Link href="/orders">Orders</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
