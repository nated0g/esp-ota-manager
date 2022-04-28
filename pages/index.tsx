import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
/* This example requires Tailwind CSS v2.0+ */
import { useState, useEffect } from 'react'
import Layout from '../components/common/Layout'

export default function Home() {
  const [repos, setRepos] = useState([]);
  

    const fetchRepos = async () => {
    const response = await fetch(`/api/repos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    setRepos(data.data);
  }

  useEffect(() => {
    if (repos?.length < 1) {
      fetchRepos();
    }
  }, []);
  return (
    <>
    <Layout current="Dashboard">
      <pre>
      {repos ? JSON.stringify(repos, null, 2) : ''}
      </pre>
    </Layout>
    </>
  )
}