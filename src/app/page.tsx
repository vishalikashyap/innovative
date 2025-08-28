import Image from "next/image";
import GuestDashboard from "./module/guest/page";

export default function Home() {
  return (
     <div className="w-full h-screen">
      <GuestDashboard />
    </div>
  );
}
