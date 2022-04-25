import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
/* This example requires Tailwind CSS v2.0+ */
import Layout from '../../components/common/Layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]

export default function DevicesPage() {
  const router = useRouter();
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {

    const fetchUser = async () => {
      const response = await fetch(`/api/devices`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const devices = await response.json();
      setDevices(devices);
    }

    fetchUser();
  }, []);

  return (
    <>
      <Layout current="Devices">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {devices.map((device) => (
            <div
              key={device?.name}
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="" alt="" />
              </div>
              <div className="flex-1 min-w-0">
                <a href={"/devices/" + device.id} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{device.name}</p>
                  <p className="text-sm text-gray-500 truncate">{device.name}</p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  )
}