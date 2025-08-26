import { usePersonStore } from "../../../hooks/usePerson";
import { nameSchema } from "../../../schemas/common";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NameForm } from "../../../schemas/common";
const PersonName = () => {
  const { firstName, lastName, updateFirstName, updateLastName } =
    usePersonStore();

  const data = useLoaderData() as { message: string };

  const {
    register: registerFirst,
    handleSubmit: handleSubmitFirst,
    formState: { errors: errorsFirst },
    reset: resetFirst,
  } = useForm<NameForm>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: "" },
  });

  // Form cho LastName
  const {
    register: registerLast,
    handleSubmit: handleSubmitLast,
    formState: { errors: errorsLast },
    reset: resetLast,
  } = useForm<NameForm>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: "" },
  });

  const onSubmitFirst = (values: NameForm) => {
    updateFirstName(values.name);
    resetFirst();
  };

  const onSubmitLast = (values: NameForm) => {
    updateLastName(values.name);
    resetLast();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white w-1/3">
        <h1 className="text-center py-4 mb-10">{data.message}</h1>
        <h1 className="text-center">
          {" "}
          Hello {firstName} {lastName}
        </h1>

        <form
          onSubmit={handleSubmitFirst(onSubmitFirst)}
          className="py-2 flex w-11/12 mx-auto gap-2 justify-between"
        >
          <input
            className="border w-2/3 px-2"
            type="string"
            {...registerFirst("name")}
          />
          {errorsFirst.name && (
            <p className="text-red-500 text-sm mt-1">
              {errorsFirst.name.message}
            </p>
          )}
          <button
            className="border rounded-3xl bg-gray-300 cursor-pointer p-3 hover:bg-blue-300"
            type="submit"
          >
            {" "}
            Change First name
          </button>
        </form>
        <form
          onSubmit={handleSubmitLast(onSubmitLast)}
          className="py-2 flex w-11/12 mx-auto gap-2 justify-between"
        >
          <input
            className="border w-2/3 px-2"
            type="string"
            {...registerLast("name")}
          />
          {errorsLast.name && (
            <p className="text-red-500 text-sm mt-1">
              {errorsLast.name.message}
            </p>
          )}
          <button
            className="border rounded-3xl bg-gray-300 cursor-pointer p-3 hover:bg-blue-300"
            type="submit"
          >
            {" "}
            Change Last name
          </button>
        </form>
      </div>
    </div>
  );
};
export default PersonName;
