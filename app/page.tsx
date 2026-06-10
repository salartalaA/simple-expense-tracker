import Header from "@/components/header";
import MainSection from "@/components/main-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fbfaf9]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <Header />
        <MainSection />
      </div>
    </div>
  );
}
