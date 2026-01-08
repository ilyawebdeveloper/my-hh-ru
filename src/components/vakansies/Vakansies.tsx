import { type FC } from "react";
import type { DictionaryItem, Vacancy } from "./Vacancy";
import { Button, Flex, Text } from "@mantine/core";

interface Props {
  vakansies?: Vacancy[];
}

const Vakansies: FC<Props> = ({ vakansies }) => {
  const formatWork = (format: DictionaryItem[]) => {
    const idsFromatWork = format.map((format) => format.id);
    if (idsFromatWork.includes("REMOTE")) {
      return (
        <Flex bg="#4263EB" px="6px" py="2px">
          <Text color="#FFFFFF" fw={700} size="9px">
            Можно удаленно
          </Text>
        </Flex>
      );
    }
    if (idsFromatWork.includes("ON_SITE")) {
      return (
        <Flex bg="#0F0F101A" px="6px" py="2px">
          <Text color="#0F0F1080" fw={700} size="9px">
            Офис
          </Text>
        </Flex>
      );
    }

    return "Гибрид";
  };

  return (
    <Flex direction="column" gap="16px">
      {vakansies?.map((vacancy) => (
        <Flex direction="column" bg="white" p="24px" miw="659px" bdrs="md" key={vacancy.id}>
          <Text fw={600} size="20px" color="#364FC7">
            {vacancy.name}
          </Text>
          <Flex align="center" justify="start" gap="16px" mt="8px">
            <Text fw={400} size="16px" color="#0F0F10">
              {vacancy.salary?.from}
              {vacancy.salary?.to && "-"}
              {vacancy.salary?.to} {vacancy.salary?.currency}
            </Text>
            <Text fw={400} size="14px" color="#0F0F1080">
              {vacancy.experience.name}
            </Text>
          </Flex>
          <Flex
            align="start"
            justify="start"
            gap="8px"
            mt="16px"
            direction="column"
          >
            <Text fw={400} size="14px" color="#0F0F10">
              {vacancy.employer.name}
            </Text>
            <Text fw={400} size="14px" color="#0F0F1080">
              {formatWork(vacancy.work_format)}
            </Text>
            <Text fw={400} size="16px" color="#0F0F10">
              {vacancy.area.name}
            </Text>
          </Flex>
          <Flex gap="12px" mt="16px">
            <Button variant="filled" size="md" bg="black" miw="172px">
              <Text color="white" size="14px" fw={400}>
                Смотреть вакансию
              </Text>
            </Button>
            <Button variant="filled" size="md" bg="#0F0F101A" miw="131px">
              <Text color="black" size="14px" fw={400}>
                Откликнуться
              </Text>
            </Button>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default Vakansies;
