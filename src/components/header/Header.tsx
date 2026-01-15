import { Flex, Text } from "@mantine/core";
import UserIcon from "../../assets/userIcon";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Flex
      align="center"
      justify="space-between"
      bg="#FFFFFF"
      pl="20px"
      h="60px"
      data-testid="header"
    >
      <Flex align="center" justify="center" gap="sm">
        <img
          data-testid="mock-user-icon"
          src="../../../src/assets/logo-hh.png"
          height={30}
          width={30}
          alt=""
        />
        <Text fw={700} size="lg">
          .FrontEnd
        </Text>
      </Flex>
      <Flex align="center" justify="center" gap="24px" pr="50px">
        <Flex
          align="center"
          justify="center"
          gap="8px"
          onClick={() => {
            navigate("/");
          }}
        >
          <Text fw={500}>Вакансии FE</Text>
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#4263EB",
            }}
          />
        </Flex>
        <Flex align="center" justify="center" gap="5px">
          <UserIcon />
          <Text
            size="md"
            color="gray"
            onClick={() => {
              navigate("/about", { replace: true });
            }}
          >
            Обо мне
          </Text>
        </Flex>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
};

export default Header;
