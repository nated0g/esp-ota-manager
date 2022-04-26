import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
/* This example requires Tailwind CSS v2.0+ */
import Layout from '../../../components/common/Layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type Device = {
  id: number
  reported_fw: number
  requested_fw: number
  group_id: number
  name: string
  mac: string
  uuid: string
  metadata: {}
}

export default function DevicesPage() {
  const router = useRouter();

  const [device, setDevice] = useState<Device>({});

  const { name, id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    console.log(name)
    const fetchDevices = async () => {
      const response = await fetch(`/api/devices/${name}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      setDevice(data);
    }

    fetchDevices();
  }, [router.isReady]);

  return (
    <>
      <Layout current="Devices">
         <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{device.name}</h3>
        {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Device details</p> */}
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Device Type</dt>
            <dd className="mt-1 text-sm text-gray-900"></dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">UUID</dt>
            <dd className="mt-1 text-sm text-gray-900">{device?.uuid}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">MAC Address</dt>
            <dd className="mt-1 text-sm text-gray-900">6B:12:33:C0:D4</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Last Reported</dt>
            <dd className="mt-1 text-sm text-gray-900">12:34</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Reported Firmware</dt>
            <dd className="mt-1 text-sm text-gray-900">v0.3.2</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Requested Firmware</dt>
            <dd className="mt-1 text-sm text-gray-900">v0.3.3</dd>
          </div>
        </dl>
      </div>
    </div>
      </Layout>
    </>
  )
}