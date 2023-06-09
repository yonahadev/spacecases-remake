import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

interface Props {
  toggleVisibility: () => void;
}

interface Users {
  id: string;
}

const SearchBarForm = ({ toggleVisibility }: Props) => {
  const { register, handleSubmit } = useForm();
  const [searchResults, setSearchResults] = useState<Users[]>([]);

  const onSubmit = async ({ search }: FieldValues) => {
    const response = await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search }),
    });

    console.log(search);
    const users = await response.json();
    setSearchResults(users);
  };

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="w-1/2 h-1/2 bg-palette-dark fixed z-20 opacity-100 inset-x-0 inset-y-0 top-1/4 left-1/4 rounded-lg text-palette-secondary "
    >
      <span className="w-full h-16 flex  items-center border-palette-primary border-b-2 text-xl">
        <AiOutlineSearch size={30} className="mx-3 text-palette-secondary" />
        <input
          {...register("search")}
          autoFocus
          placeholder="Search Users"
          className="w-full h-full bg-palette-dark outline-none "
        />
        <button type="button" onClick={toggleVisibility}>
          <AiOutlineClose size={30} className="mr-3 text-palette-secondary" />
        </button>
      </span>
      <ul>
        {searchResults.map((user) => (
          <Link
            onClick={toggleVisibility}
            href={`/users/${user.id.toString()}`}
            key={user.id.toString()}
          >
            {user.id.toString()}
          </Link>
        ))}
      </ul>
    </form>
  );
};

export default SearchBarForm;
