import Categories from "@/components/home/Categories";
import ItemListing from "@/components/home/itemListing/ItemListing";

export default function Home() {
  return (
    <div className="w-[100%] flex flex-col gap-[1rem]">
      <Categories />
      <ItemListing />
    </div>
  );
}
