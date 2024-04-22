import type { MetaFunction } from "@remix-run/node";
import { Calendar, DatePicker } from "hot-scheduler";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Welcome to Calendar</h1>
      <Calendar />
      <DatePicker />
    </div>
  );
}
