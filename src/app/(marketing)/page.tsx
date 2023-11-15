import Footer from "./_components/footer";
import Heading from "./_components/heading";
import Heroes from "./_components/heroes";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10 dark:bg-[#1f1f1f]">
        <Heading></Heading>
        <Heroes></Heroes>
      </div>
      <Footer></Footer>
    </div>
  );
}
