import { classNames } from "utils/string";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function TextInput({
  label,
  name,
  inputClassname = "",
  placeholder = "",
  ...rest
}: {
  label?: string;
  inputClassname?: string;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={classNames(
        "duration-50 rounded-lg px-4 py-2 transition-all ease-in  ",
        inputClassname,
      )}
    >
      {label && (
        <label htmlFor={name} className="block text-xs font-medium text-gray6">
          {label}
        </label>
      )}
      <input
        type="text"
        {...rest}
        placeholder={placeholder}
        className={classNames(
          "block w-full border-0 bg-transparent p-0 text-black placeholder:text-gray-400 autofill:bg-gray6 focus:ring-0 dark:text-white sm:text-sm sm:leading-6",
          rest?.className || "",
        )}
      />
    </div>
  );
}
