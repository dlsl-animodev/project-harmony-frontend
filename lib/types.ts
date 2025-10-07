type columns = {
  id: string;
  time_in: string;
  name: string;
  email: string;
  time_out: string;
  isMember: boolean;
};

const data: columns[] = [
  {
    id: "1",
    time_in: "2023-06-10T09:00:00",
    name: "John Doe",
    email: "john.doe@example.com",
    time_out: "2023-06-10T17:00:00",
    isMember: true,
  },
  {
    id: "2",
    time_in: "2023-06-10T09:15:00",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    time_out: "2023-06-10T17:30:00",
    isMember: false,
  },
  {
    id: "3",
    time_in: "2023-06-10T08:45:00",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    time_out: "2023-06-10T16:45:00",
    isMember: true,
  },
];
