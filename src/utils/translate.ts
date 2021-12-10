import { jobOptions } from "./selectOptions";

export const translateCategory = (category: string) => {
  jobOptions.map((j) => {
    if (j.value == category) {
      category = j.label;
    }
  });
  console.log("cat", category);

  return category;
};
