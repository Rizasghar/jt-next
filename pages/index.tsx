import { useEffect, useState } from 'react'
import axios from 'axios'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

interface IPullRequests {
  id: number
  nickname: string
  gravatar_id: string
  github_profile: string | null
  twitter_profile: string | null
  contributions_count: number
  link: string
  pull_requests: { title: string; repo_name: string }[]
}

const Home = () => {
  const [prList, setPrList] = useState<IPullRequests[]>()

  const fetchData = async (): Promise<void> => {
    // Documentation: https://24pullrequests.com/api
    try {
      const response = await axios.get('/api/pullRequests')
      setPrList(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className={styles.main}>
      <div className={inter.className}>
        {prList?.map((elm) => (
          <div>
            <h2>User: {elm.nickname}</h2>
            <table>
              <tbody>
                <tr>
                  <th>Repo</th>
                  <th>PR Titles</th>
                </tr>
                {elm?.pull_requests?.map((inner) => (
                  <tr>
                    <td>{inner.repo_name}</td>
                    <td>{inner.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Home
