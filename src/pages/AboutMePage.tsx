import { Flex, Text } from "@mantine/core";
import Header from "../components/header/Header";

const AboutMePage = () => {
  return (
    <div>
      <Header />
      <Flex
        p="24px"
        mt="24px"
        bg="white"
        w="659px"
        direction="column"
        m="40px auto"
      >
        <Text fw={700} size="26px">
          Иван Васильев
        </Text>
        <Text mt="20px">
          Привет! Я - Frontend-разработчик. Пишу приложения на React +
          TypeScript + Redux Toolkit.
        </Text>
      </Flex>
    </div>
  );
};

export default AboutMePage;
