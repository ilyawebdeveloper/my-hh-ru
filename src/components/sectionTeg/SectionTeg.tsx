import { Button, Flex, Text, TextInput } from "@mantine/core";
import CloseIcon from "../../assets/closeIcon";
import { useState, type FC } from "react";
interface Props {
  tags: string[];
  deleteTag: (tag: string) => void;
  addTag: (tag: string) => void;
}

export const SectionTeg: FC<Props> = ({ tags, deleteTag, addTag }) => {
  const [inputValue, setInputValue] = useState<string | null>(null);

  return (
    <Flex
      p="24px"
      direction="column"
      bg="white"
      maw="317px"
      mah="206px"
      bdrs="md"
      data-testid="section-tags"
    >
      <Text fw={500}>Ключевые навыки</Text>
      <Flex align="center" justify="center" gap="8px" mt="12px">
        <TextInput
          size="sm"
          radius="sm"
          w="227px"
          placeholder="Навык"
          disabled={tags.length === 5}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <Button
          variant="filled"
          size="sm"
          disabled={tags.length === 5}
          onClick={() => {
            addTag(inputValue as string);
            setInputValue(null);
          }}
        >
          <Text fw={500} size="sm">
            +
          </Text>
        </Button>
      </Flex>
      <Flex wrap="wrap" gap="5px" mt="12px" data-testid="section-tags">
        {tags.map((tag) => (
          <Button
            variant="filled"
            bg="#F6F6F7"
            px="12px"
            bdrs="md"
            onClick={() => {
              deleteTag(tag);
            }}
          >
            <Text color="black" mr="4px" size="12px" fw={400}>
              {tag}
            </Text>
            <CloseIcon />
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default SectionTeg;
