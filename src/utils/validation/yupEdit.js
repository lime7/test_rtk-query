import * as yup from "yup";
import { MAX_NAME_LENGTH } from "utils/constants";
export const getEditSchema = () => {
  return yup.object().shape({
    name: yup
      .string()
      .max(MAX_NAME_LENGTH, `This field should be less than ${MAX_NAME_LENGTH} chars`)
      .required("This is a required field")
  });
};
