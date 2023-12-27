import HomePage from "./(root)/(routes)/home/page";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phone E-Commerce",
  description: "Phone e-commerce have everything shoe you want",
  openGraph: {
    images:
      "https://coolstuf.com.pg/wp-content/uploads/2022/10/iPhone-14-PRO-MAX-model-1.jpg",
  },
};

export default function Home() {
  return (
    <div className="home_page">
      <HomePage />
    </div>
  );
}
