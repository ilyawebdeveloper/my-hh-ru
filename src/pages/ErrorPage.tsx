import React from "react";
import Header from "../components/header/Header";
import { Button, Flex, Text } from "@mantine/core";
import imgCat from "../assets/sad-cat 1.png";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Flex
        p="24px"
        bg="white"
        mt="72px"
        w="659px"
        m="72px auto"
        direction="column"
        gap="md"
      >
        <Flex justify="center" align="center">
          <div>
            <Text fw={700} size="34px">
              Упс! Такой страницы не существует
            </Text>
            <Text mt="md">Давайте перейдём к началу.</Text>
          </div>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            На главную
          </Button>
        </Flex>
        <img src={imgCat} alt="" />
      </Flex>
    </div>
  );
};

export default ErrorPage;
