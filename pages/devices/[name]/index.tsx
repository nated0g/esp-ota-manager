import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
/* This example requires Tailwind CSS v2.0+ */
import Layout from '../../../components/common/Layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function DevicesPage() {
  const router = useRouter();

  const [devices, setDevices] = useState<any[]>([]);
  const [deviceType, setDeviceType] = useState<any[]>([]);

  const { name } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    console.log(name)
    const fetchDevices = async () => {
      const response = await fetch(`/api/devices/${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const devices = await response.json();

      setDevices(devices.devices);
      setDeviceType(devices.device_type);
    }

    fetchDevices();
  }, [router.isReady]);

  return (
    <>
      <Layout current="Devices">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">{deviceType.name}</h1>
              <p className="mt-2 text-sm text-gray-700">
                {deviceType.repo}
              </p>
              <p className="mt-2 text-sm text-gray-700">
                {deviceType.vendor_mcu_id}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add user
              </button>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                        >
                          MAC Address
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                        >
                          UUID
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                        >
                          ID
                        </th>
                        <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {devices.map((device) => (
                        <tr key={device.id} className="hover:bg-slate-50">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {device.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{device.mac}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{device.uuid}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{device.id}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a href={name + "/" + device.id} className="text-indigo-600 hover:text-indigo-900">
                              Edit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}