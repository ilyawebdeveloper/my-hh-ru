import { useState, useEffect, useCallback, useMemo } from "react";
import "@mantine/core/styles.css";
import "./App.css";
import Header from "./components/header/Header";
import Search from "./components/search/Search";
import { Flex, Pagination } from "@mantine/core";
import SectionTeg from "./components/sectionTeg/SectionTeg";
import Vakansies from "./components/vakansies/Vakansies";
import type { Vacancy } from "./components/vakansies/Vacancy";
import useDebounce from "./helpers/debounse";
import SelectCities from "./components/selectCities/SelectCities";
import type { Area } from "./types/area";
import { useDispatch, useSelector } from "react-redux";
import {
  changeVacancies,
  fetchVacancies,
  changeSearchText,
  changeTags,
  changeSelectedCities,
} from "./features/vacancies/vacancies";
import type { UnknownAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { useNavigate, useParams } from "react-router";

interface Data {
  alternate_url: string;
  arguments: string | null;
  clusters: null;
  fixes: null;
  found: number;
  items: Vacancy[];
  page: number;
  pages: number;
  per_page: number;
  suggests: null;
}

function App() {
  const {
    vacanciesList,
    searchText: searchTextState,
    tags: tagsState,
    selectedCities: selectedCitiesState,
  } = useSelector((state: RootState) => state.vacancies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchVacancies() as unknown as UnknownAction);
  }, []);

  const params = useParams();

  console.log(params, "params");

  const [cities, setCities] = useState<string[] | null>(null);
  const [searchText, setSearchText] = useState(searchTextState);
  const [tagsItems, setTegsitems] = useState(tagsState);
  const [page, onChange] = useState(1);
  const [dataCities, setDataCities] = useState<Area[] | null>(
    selectedCitiesState
  );
  const [loading, setLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchText, 1500);

  const deleteTag = useCallback(
    (tag: string) => {
      setTegsitems(tagsItems.filter((tagItem) => tagItem !== tag));
    },
    [tagsItems]
  );

  const addTag = useCallback(
    (tag: string) => {
      setTegsitems([...tagsItems, tag]);
    },
    [tagsItems]
  );

  const addCities = useCallback((cities: string[]) => {
    setCities(cities);
  }, []);

  const tagsItemParams = useMemo(() => {
    return tagsItems
      .map((tagItem) => `skill_set=${tagItem}`)
      .join(",")
      .replaceAll(",", "&");
  }, [tagsItems]);

  const selectedCities = useMemo(() => {
    return dataCities
      ?.map((city) => `area=${city.id}`)
      .join(",")
      .replaceAll(",", "&");
  }, [dataCities]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetch(
        `https://api.hh.ru/vacancies?text=${searchText}&per_page=10&page=${page}&search_field=name&search_field=company_name&${tagsItemParams}&${
          cities && selectedCities
        } `
      )
        .then((response) => response.json())
        .then((data: Data) => {
          dispatch(changeVacancies(data));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке:", error);
          setLoading(false);
        });
    }

    fetch("https://api.hh.ru/areas")
      .then((response) => response.json())
      .then((data: Area[]) => {
        setDataCities(
          data
            ?.find((city) => city.name === "Россия")
            ?.areas.filter((area) => cities?.includes(area.name)) ?? []
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке:", error);
        setLoading(false);
      });
  }, [
    page,
    tagsItems,
    debouncedSearchTerm,
    searchText,
    tagsItemParams,
    cities,
    selectedCities,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(changeSearchText(searchText));
  }, [searchText]);
  useEffect(() => {
    dispatch(changeTags(tagsItems));
  }, [tagsItems]);
  useEffect(() => {
    if (dataCities !== null) {
      dispatch(changeSelectedCities(dataCities[0]));
    }
    return;
  }, [dataCities]);

  useEffect(() => {
    const truthe =
      selectedCitiesState !== null &&
      selectedCitiesState !== undefined &&
      params.city !== selectedCitiesState.name;
    const navigateVacansies = async () => {
      return await navigate(
        `${truthe ? selectedCitiesState.name : "/vacansies"}`,
        {
          relative: "path",
        }
      );
    };

    if (truthe) {
      navigateVacansies();
    }

    return;
  }, [selectedCitiesState, params]);

  if (loading) {
    return <>...</>;
  }

  return (
    <div>
      <Header />
      <Search onSearch={setSearchText} />
      <Flex maw="1000px" m="0 auto" gap="24px">
        <Flex direction="column">
          <SectionTeg tags={tagsItems} deleteTag={deleteTag} addTag={addTag} />
          <SelectCities selectCities={addCities} />
        </Flex>

        <Flex direction="column" align="center" gap="24px" pb="30px">
          <Vakansies vakansies={vacanciesList.items} />
          <Pagination
            total={10}
            siblings={1}
            defaultValue={1}
            value={page}
            onChange={onChange}
            data-testid="pagination"
          />
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
