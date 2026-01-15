import { type FC } from "react";
import type { DictionaryItem, Vacancy } from "./Vacancy";
import { Button, Flex, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";

interface Props {
  vacancy: Vacancy;
  linkToHh?: string;
}

const VakancyCard: FC<Props> = ({ vacancy, linkToHh }) => {
  const { searchText: searchTextState, tags } = useSelector(
    (state: RootState) => state.vacancies,
  );
  const navigate = useNavigate();
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

  const navToVacasncy = () => {
    if (linkToHh === undefined) {
      navigate({
        pathname: `/vacansies/vacancy/${vacancy.id}`,
        search: `?search=${searchTextState}?tags=${tags}`,
      });
    }
    return;
  };

  return (
    <Flex
      direction="column"
      bg="white"
      p="24px"
      w="659px"
      bdrs="md"
      key={vacancy.id}
      onClick={navToVacasncy}
    >
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
      {linkToHh === undefined ? (
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
      ) : (
        <a
          href={linkToHh}
          target="blank"
          style={{
            padding: "18px 20px",
            backgroundColor: "black",
            width: "179px",
            marginTop: "20px",
            textDecoration: "none",
          }}
        >
          <Text color="white" size="14px" fw={400}>
            Откликнуться на hh
          </Text>
        </a>
      )}
    </Flex>
  );
};

export default VakancyCard;
