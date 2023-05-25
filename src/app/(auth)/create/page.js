"use client";

import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const Create = () => {
  const [name, setName] = useState("");

  const {
    mutate: createOrganization,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(() => axios.post(`${process.env.FUNCTIONS}/organization`, { name }));

  return (
    <div>
      <h1>Register your organization</h1>
      <span>Before doing anything please select a name for our organization</span>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z0-9-]/g, ""))}
        />
        <button type='submit' onClick={createOrganization} disabled={isLoading || isError || isSuccess}>
          {isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Create;
