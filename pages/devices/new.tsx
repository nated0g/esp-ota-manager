import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
/* This example requires Tailwind CSS v2.0+ */
import Layout from '../../components/common/Layout'
import { SdkConfigSelector, ChipSelector, Chips } from '../../components/forms'
import { Router } from 'next/router'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CreditCardIcon, KeyIcon, UserCircleIcon, UserGroupIcon, ViewGridAddIcon } from '@heroicons/react/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NewDevice() {
  const router = useRouter();

  const [selectedConfig, setSelectedConfig] = useState({});
  const [chip, setChip] = useState(Chips[0]);
  const [deviceName, setDeviceName] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const res = await fetch('/api/device-type', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        default_sdk_config: selectedConfig.id,
        vendor_mcu_id: chip,
        name: deviceName
      }),
    })
    router.push('/devices');
    
  }

  return (
    <>
      <Layout current="Devices">
        <div className="lg:grid lg:grid-cols-6 lg:gap-x-5">

          <div className="space-y-6 lg:col-start-2 sm:px-6 lg:px-0 lg:col-span-4">
            <form onSubmit={handleSubmit} method="POST">
              <div className="shadow rounded-md overflow-hidden">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900">Create New Device Type</h2>
                    {/* <p className="mt-1 text-sm text-gray-500">
                      This information will be displayed publicly so be careful what you share.
                    </p> */}
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                        <label
                          htmlFor="name"
                          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                        >
                          Device Type Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={deviceName}
                          onChange={(event)=>setDeviceName(event.target.value)}
                          id="name"
                          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                          placeholder="Confabulator"
                        />
                      </div>
                    </div>

                    <div className="col-span-2">
                      <ChipSelector chips={Chips} chip={chip} setChip={setChip} />
                    </div>

                    <div className="col-span-2">
                      <SdkConfigSelector selectedConfig={selectedConfig} setSelectedConfig={setSelectedConfig} fieldname="default_sdk_config" label="Default SDK Config" />
                    </div>

                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </Layout>
    </>
  )
}