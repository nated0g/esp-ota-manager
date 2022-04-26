import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
/* This example requires Tailwind CSS v2.0+ */
import Layout from '../../components/common/Layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function DevicesPage() {
  const router = useRouter();
  const [deviceTypes, setDeviceTypes] = useState<any[]>([]);

  const fetchDevices = async () => {
    const response = await fetch(`/api/device-type`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    setDeviceTypes(data);
  }

  useEffect(() => {
    if (deviceTypes.length < 1) {
      fetchDevices();
    }
  }, []);

  return (
    <>
      <Layout current="Devices">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {deviceTypes.map((deviceType) => (
            <div
              key={deviceType?.name}
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="" alt="" />
              </div>
              <div className="flex-1 min-w-0">
                <a href={"/devices/" + deviceType.name} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{deviceType.name}</p>
                  <p className="text-sm text-gray-500 truncate">{deviceType.vendor_mcu_id}</p>
                  <p className="text-sm text-gray-500 truncate">Number of devices: {deviceType.number_of_devices}</p>
                </a>
              </div>
            </div>
          ))}
          <div
            key="new"
            className="relative rounded-lg hover:transition-all hover:bg-opacity-40 bg-gray-500 bg-opacity-10 px-6 py-5 shadow-sm flex items-center space-x-3 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div className="flex-1 min-w-0">
              <a href="/devices/new" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Add New Device</p>
              </a>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}