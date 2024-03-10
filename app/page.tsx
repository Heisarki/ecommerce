import Categories from "@/components/home/categories";
import ItemListing from "@/components/home/item-listing";

export default function Home() {
  return (
    <div className="w-[100%] flex flex-col gap-[1rem]">
      <Categories />
      <ItemListing />
    </div>
  );
}
