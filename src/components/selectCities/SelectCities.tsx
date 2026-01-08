import { Flex, MultiSelect } from "@mantine/core";
import LocationIcon from "../../assets/locationIcon";
import type { FC } from "react";

interface Props {
  selectCities: (value: string[]) => void;
}

export const SelectCities: FC<Props> = ({ selectCities }) => {
  const icon = <LocationIcon />;
  return (
    <Flex p="24px" bg="white" mt="28px" bdrs="md">
      <MultiSelect
        data={["Все города", "Москва", "Санкт-Петербург"]}
        leftSectionPointerEvents="none"
        leftSection={icon}
        placeholder="Все города"
        w="269px"
        bdrs="md"
        onChange={(e) => {
          selectCities(e);
        }}
      />
    </Flex>
  );
};

export default SelectCities;
