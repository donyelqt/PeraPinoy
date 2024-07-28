import { LayoutDashboard, LayoutGrid, LucideShieldPlus, PiggyBankIcon, ReceiptIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function SideNav() {
  const menuList=[
    {
      id:1,
      name:'Dashboard',
      icon:LayoutDashboard
    },
    {
      id:2,
      name:'Budgets',
      icon:PiggyBankIcon
    },
    {
      id:3,
      name:'Expenses',
      icon:ReceiptIcon
    },
    {
      id:4,
      name:'Premium',
      icon:LucideShieldPlus
    }
  ]
  return (
    <div className='h-screen p-4 border shadow-md'>
      <Image src={'/PeraPinoy1.png'} 
      alt='logo'
      width={100}
      height={80}
      />
      <div>
        {menuList.map((menu,index)=>(
          <h2>
            {menu.name}
          </h2>
        ))}
      </div>
    </div>
  )
}

export default SideNav