import type { MetaFunction } from "@remix-run/node";
import Calendar from "~/containers/Calendar/Calendar";
import DatePicker from "~/containers/DatePicker/DatePicker";

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
