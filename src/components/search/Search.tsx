import { Button, Flex, Text, TextInput } from "@mantine/core";
import SearchIcon from "../../assets/searchIcon";
import { useState, type FC } from "react";
interface Props {
  onSearch: (value: string) => void;
}

export const Search: FC<Props> = ({ onSearch }) => {
  const icon = <SearchIcon />;
  const [valueSearch, setValueSearch] = useState("");

  return (
    <Flex
      align="center"
      justify="space-between"
      maw="1000px"
      m="0 auto"
      py="24px"
    >
      <Flex align="start" justify="start" direction="column">
        <Text fw={700} size="26px">
          Список вакансий
        </Text>
        <Text color="grey" fw={500}>
          по профессии Frontend-разработчик
        </Text>
      </Flex>
      <Flex align="center" justify="center" gap="12px">
        <TextInput
          size="lg"
          radius="md"
          w="400px"
          placeholder="Должность или название компании"
          leftSectionPointerEvents="none"
          leftSection={icon}
          onChange={(e) => {
            setValueSearch(e.target.value);
          }}
          value={valueSearch}
        />
        <Button
          variant="filled"
          size="lg"
          onClick={() => {
            onSearch(valueSearch);
            setValueSearch("");
          }}
        >
          Найти
        </Button>
      </Flex>
    </Flex>
  );
};

export default Search;
