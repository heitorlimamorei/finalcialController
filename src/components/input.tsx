import React, { memo } from "react";
interface inputProps {
  ClassName?: string;
  name: string;
  id: string;
  type: string;
  value: any;
  onChange: any;
  disabled?: boolean;
  ref?: any;
}

function Input(props: inputProps) {
  return (
    <input
      ref={props.ref}
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      className={`dark:bg-[#232323] bg-[#E0E5EC] rounded-xl w-full h-[2.4rem] py-4 p-3 
        shadow-[inset_9px_9px_18px_#5a5c5e,inset_-9px_-9px_18px_#ffffff]
        dark:shadow-[inset_9px_9px_18px_#0e0e0e,inset_-9px_-9px_18px_#383838] ${props.ClassName}`}
      value={props.value}
      onChange={props.onChange}
      type={props.type}
      required
    />
  );
}

export default memo(Input);
