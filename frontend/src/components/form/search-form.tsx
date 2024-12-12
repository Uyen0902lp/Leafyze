import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Search } from "../svg";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  searchText: Yup.string().required().label("Search Text"),
});

type ISearchFormData = {
  searchText: string;
};

export default function SearchForm() {
  const router = useRouter();
  const {register,handleSubmit,reset} = useForm<ISearchFormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (values: ISearchFormData) => {
    if (values.searchText) {
      router.push(`/search?searchText=${values.searchText}`);
      reset();
    } else {
      toast.error("Please enter search text");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-header-search-input-box-5">
        <div className="tp-header-search-input-5">
          <input
            {...register("searchText")}
            type="text"
            placeholder="Search for products keywords ..."
            name="searchText"
          />
          <span className="tp-header-search-icon-5">
            <Search />
          </span>
        </div>
        <button type="submit">Search</button>
      </div>
    </form>
  );
}
