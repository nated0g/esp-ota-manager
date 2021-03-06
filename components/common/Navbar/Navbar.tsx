/* This example requires Tailwind CSS v2.0+ */
import { FC } from 'react'
import Link from 'next/link'
import { Fragment, useState, SVGProps } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'

import { useSession, getSession} from 'next-auth/react'

interface Link {
  name: string
  href: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  current: boolean
}

export interface NavbarProps {
  links?: Link[] | []
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar: FC<NavbarProps> = ({ links }) => {
  const { data: session, status } = useSession()
  return (
    <>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="pl-2 h-12 w-auto"
                src="/logo.svg"
                alt="esp-ota-manager"
              /> <span className="text-amber-400 font-bold pl-3 ">esp-ota-manager</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {links?.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                ><a
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}
                >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
            {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
          </div>
          {session ?
            <>
              <div className="flex-shrink-0 flex bg-gray-700 p-4">
                <a href="/api/auth/signout" className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src={session.user?.image}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{session.user?.name}</p>
                      <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">Sign Out</p>
                    </div>
                  </div>
                </a>
              </div>
            </>
            :[]}
        </div>
      </div>
    </>
  )
}