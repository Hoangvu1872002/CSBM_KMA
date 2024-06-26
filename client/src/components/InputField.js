import React, { memo } from "react";
import clsx from "clsx";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invaliFields,
  setInvaliFields,
  style,
  fullWidth,
  placeholder,
  isShowLaybel
}) => {
  return (
    <div className={clsx(`flex flex-col relative mb-2`, fullWidth && "w-full")}>
      {!isShowLaybel && value?.trim() !== "" && (
        <label
          className="text-[10px] absolute animate-silde-top-sm top-0 left-[12px] block bg-white px-1"
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        className={clsx(
          `px-4 py-2 rounded-sm border w-full mt-2 placeholder:italic placeholder:text-sm outline-none `,
          style
        )}
        placeholder={placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey.split(' ').join('')]: e.target.value }))
        }
        onFocus={() => setInvaliFields && setInvaliFields([])}
      ></input>
      {invaliFields?.some((e) => e.name === nameKey.split(' ').join('')) && (
        <small className="text-red-700 italic">
          {invaliFields?.find((e) => e.name === nameKey.split(' ').join(''))?.mes}
        </small>
      )}
    </div>
  );
};

export default memo(InputField);
