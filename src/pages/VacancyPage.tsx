import { useParams } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Header from "../components/header/Header";
import VakancyCard from "../components/vakansies/VakancyCard";
import { Flex, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

interface LogoUrls {
  [key: string]: string;
}

interface Area {
  id: string;
  name: string;
  url: string;
}

interface Industry {
  id: string;
  name: string;
}

interface BrandingMakeup {
  url: string;
}

interface Branding {
  type: string;
  template_code: string;
  template_version_id: string;
  makeup: BrandingMakeup;
}

interface InsiderInterview {
  id: string;
  title: string;
  url: string;
}

interface DataCompany {
  id: string;
  trusted: boolean;
  accredited_it_employer: boolean;
  has_divisions: boolean;
  name: string;
  type: string;
  description: string;
  site_url: string;
  alternate_url: string;
  vacancies_url: string;
  logo_urls: LogoUrls;
  relations: unknown[];
  area: Area;
  country_code: string;
  industries: Industry[];
  is_identified_by_esia: boolean;
  branded_description: string;
  branding: Branding;
  insider_interviews: InsiderInterview[];
  open_vacancies: number;
}

const VacancyPage = () => {
  const [data, setData] = useState<DataCompany | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { vacanciesList } = useSelector((state: RootState) => state.vacancies);

  const activeVaacancies = useMemo(() => {
    return vacanciesList.items?.find((vacancy) => vacancy.id === params.id);
  }, [params.id, vacanciesList.items]);

  useEffect(() => {
    fetch(activeVaacancies?.employer.url ?? "")
      .then((response) => response.json())
      .then((data: DataCompany) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке:", error);
        setLoading(false);
      });
  }, [activeVaacancies]);

  if (activeVaacancies === undefined) {
    return <> Вакансия была удалена </>;
  }

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div>
      <Header />
      <Flex
        w="100%"
        align="center"
        justify="center"
        mt="xl"
        direction="column"
        gap="md"
      >
        <VakancyCard
          vacancy={activeVaacancies}
          linkToHh={activeVaacancies.alternate_url ?? ""}
        />
        <Flex p="lg" bg="white" w="659px" direction="column">
          <Text size="20px" fw={600}>
            Компания
          </Text>
          <Text mt="sm">{stripHtml(data?.description ?? "")}</Text>

          <Text size="20px" fw={600} mt="lg">
            О проекте
          </Text>
          <Text mt="sm">
            {activeVaacancies.snippet.responsibility}
            {activeVaacancies.snippet.requirement}
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

export default VacancyPage;
