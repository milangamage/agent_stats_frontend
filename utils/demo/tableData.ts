// utils/demo/tableData.ts

interface ITableData {
  name?:string;
  amount?:string;
  agent_name: string;     // ✅ Required field
  call_count: number;     // ✅ Required field
  rating_count: number;   // ✅ Required field
  date: string;           // ✅ Required field
  job?: string;           // Optional
  status?: string;        // Optional for Badge
  avatar?: string;        // Optional for Avatar
}

const tableData: ITableData[] = [
  {
    agent_name: "John Doe",
    call_count: 42,
    rating_count: 8,
    date: "2024-02-15T10:00:00Z",
    job: "Support Agent",
    status: "success",
    avatar: "https://example.com/avatar1.jpg",
  },
  {
    agent_name: "Jane Smith",
    call_count: 37,
    rating_count: 9,
    date: "2024-02-16T10:00:00Z",
    job: "Sales Representative",
    status: "warning",
    avatar: "https://example.com/avatar2.jpg",
  },
];

export default tableData;
export type { ITableData };
