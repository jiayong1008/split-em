import React from 'react';
import { Link } from '@inertiajs/react';

const NavMenu = () => {
  return (
    <ul>
      <li><Link href="/">Home</Link></li>
      <li><Link href={route('dashboard')}>Dashboard</Link></li>
      <li><Link href={route('subscriptions.index')}>Subscriptions</Link></li>
    </ul>
  );
};

export default NavMenu;


