"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineCamera, AiOutlineSearch } from "react-icons/ai";

export default function SearchHeaderOptions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchTerm = searchParams.get("searchTerm") || "";

  const selectTab = (tab) => {
    const route = `/search/${tab}?searchTerm=${searchTerm}`;
    router.push(route);
  };

  return (
    <div
      className="flex space-x-2 select-none border-b w-full justify-center
    lg:justify-start lg:pl-52 text-gray-700 text-sm"
    >
      {/* Web Tab */}
      <div
        onClick={() => selectTab("web")}
        className={`flex items-center space-x-1 border-b-4 border-transparent active:text-blue-500 cursor-pointer pb-3 px-2 
            ${pathname === "/search/web" ? "!text-blue-600 !border-blue-600" : ""}`}
      >
        <AiOutlineSearch className="text-md" />
        <p>All</p>
      </div>

      {/* Image Tab */}
      <div
        onClick={() => selectTab("image")}
        className={`flex items-center space-x-1 border-b-4 border-transparent active:text-blue-500 cursor-pointer pb-3 px-2 
            ${pathname === "/search/image" ? "!text-blue-600 !border-blue-600" : ""}`}
      >
        <AiOutlineCamera className="text-md" />
        <p>Images</p>
      </div>
    </div>
  );
}
