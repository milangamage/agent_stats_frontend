import React, { useState, useEffect } from 'react'
import { Doughnut, Line } from 'react-chartjs-2'

import CTA from 'example/components/CTA'
import InfoCard from 'example/components/Cards/InfoCard'
import ChartCard from 'example/components/Chart/ChartCard'
import ChartLegend from 'example/components/Chart/ChartLegend'
import PageTitle from 'example/components/Typography/PageTitle'
import RoundIcon from 'example/components/RoundIcon'
import Layout from 'example/containers/Layout'
import response, { ITableData } from 'utils/demo/tableData'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from 'icons'
import axios from 'axios';
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@roketid/windmill-react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from 'utils/demo/chartsData'

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

function Dashboard() {
  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const [page, setPage] = useState(1)
  const [data, setData] = useState<ITableData[]>([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  const onPageChange = (p: number) => setPage(p);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://agent-stats-backend-git-main-milangamages-projects.vercel.app/api/agent-stats', {
          withCredentials: false,
        });

        setData(response.data);  // Set data directly from the API response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Paginated data slice
  const paginatedData = data.slice((page - 1) * resultsPerPage, page * resultsPerPage);

  return (
    <Layout>
      <PageTitle>Dashboard</PageTitle>

      {/*<CTA />*/}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value="6389">
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Account balance" value="$ 46,760.89">
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="New sales" value="376">
          {/* @ts-ignore */}
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending contacts" value="35">
          {/* @ts-ignore */}
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Agent Name</TableCell>
              <TableCell>Call COunt</TableCell>
              <TableCell>Rating Count</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      {/*<Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" />*/}
                      <div>
                        <p className="font-semibold">{user.agent_name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.call_count}</span>
                  </TableCell>
                  <TableCell>
                    <Badge type={['success', 'warning', 'danger', 'neutral', 'primary'].includes(user.status as string) ? user.status as 'success' | 'warning' | 'danger' | 'neutral' | 'primary' : undefined}>{user.rating_count}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      {/*<PageTitle>Charts</PageTitle>*/}
      {/*<div className="grid gap-6 mb-8 md:grid-cols-2">*/}
      {/*  <ChartCard title="Revenue">*/}
      {/*    <Doughnut {...doughnutOptions} />*/}
      {/*    <ChartLegend legends={doughnutLegends} />*/}
      {/*  </ChartCard>*/}

      {/*  <ChartCard title="Traffic">*/}
      {/*    <Line {...lineOptions} />*/}
      {/*    <ChartLegend legends={lineLegends} />*/}
      {/*  </ChartCard>*/}
      {/*</div>*/}
    </Layout>
  )
}

export default Dashboard
