import { type FC } from "react";
import type { Vacancy } from "./Vacancy";
import { Flex } from "@mantine/core";

import VakancyCard from "./VakancyCard";

interface Props {
  vakansies?: Vacancy[];
}

const Vakansies: FC<Props> = ({ vakansies }) => {
  return (
    <Flex direction="column" gap="16px">
      {vakansies?.map((vacancy) => (
        <VakancyCard vacancy={vacancy} />
      ))}
    </Flex>
  );
};

export default Vakansies;
