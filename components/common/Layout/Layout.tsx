import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
/* This example requires Tailwind CSS v2.0+ */
import { Navbar, NavbarProps } from "../Navbar"
import { useEffect, SVGProps} from 'react'
import { useSession } from 'next-auth/react'
import AccessDenied from '../../AccessDenied'


import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  ChipIcon,
  CodeIcon,
  CogIcon
} from '@heroicons/react/outline'

type LayoutProps = {
  children: React.ReactNode
  current: string
}


interface Link {
  name: string
  href: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element 
  current: boolean
}

function setCurrent(name: string): Link[] {

  const navigation = [
    { name: 'Dashboard', href: '/', icon: ChartBarIcon, current: false },
    { name: 'Devices', href: '/devices', icon: ChipIcon, current: false },
    { name: 'Repos', href: '/repos', icon: FolderIcon, current: false },
    { name: 'Firmware', href: '/firmware', icon: CodeIcon, current: false },
    { name: 'Settings', href: '/settings', icon: CogIcon, current: false },
  ].map((e) => {
    e.current = (e.name === name) ? true : false;
    return e;
  }) as Link[];
  return navigation;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { data: session, status } = useSession()
  const navigation = setCurrent(props.current)
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <div className="h-screen">

        <Navbar links={navigation} />

        <div className="md:pl-64 h-screen flex flex-col flex-1 bg-slate-300">
          <main className="flex-1">
            <div className="mx-auto px-8 py-20 my-2">
              <div className="pb-5 border-b border-gray-400">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{props.current}</h3>
              </div>
              <div className="py-10">
                {session ? props.children : <AccessDenied/>}
              </div>
            </div>
          </main>
        </div>

      </div>
    </>
  )
}

export default Layout;
