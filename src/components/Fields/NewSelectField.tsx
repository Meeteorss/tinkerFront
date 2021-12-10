import { FormControl } from "@chakra-ui/form-control";
import { Box } from "@chakra-ui/layout";
import { FieldProps } from "formik";
import React from "react";
import Select from "react-select";
import { OptionsType, ValueType } from "react-select";

const customStyles = {};

type IsMulti = boolean;
interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps extends FieldProps {
  options: OptionsType<Option>;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
}

export const SelectField = ({
  placeholder,
  field,
  form,
  options,
  isMulti = false,
}: SelectFieldProps) => {
  const onChange = (option: ValueType<Option | Option[], IsMulti>) => {
    form.setFieldValue(field.name, (option as Option).value);
  };

  const getValue = () => {
    if (options) {
      return options.find((option) => option.value === field.value);
    }
  };

  return (
    <Select
      styles={customStyles}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  );
};

export default SelectField;
