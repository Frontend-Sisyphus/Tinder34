import SwipeUI from "@/components/SwipeUI";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full">
      <main className="relative grid gap-y-[48px] justify-items-center w-full h-full">
        <h1 className="text-[52px] text-center font-bold">Tinder34</h1>

        <SwipeUI/>
      </main>
    </div>
  );
}
