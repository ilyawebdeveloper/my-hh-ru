import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "../../store";

const AuthWrapper = () => {
  const navigate = useNavigate();
  const { searchText: searchTextState, tags } = useSelector(
    (state: RootState) => state.vacancies,
  );

  useEffect(() => {
    const truthe = 0;
    const navigateVacansies = async () => {
      return await navigate(
        `/vacansies?search=${searchTextState}?tags=${tags}`,
        {
          replace: true,
          state: {
            searchText: searchTextState,
            tags: tags,
          },
        },
      );
    };

    if (truthe === 0) {
      navigateVacansies();
    }

    return;
  }, []);

  return <div>AuthWrapper</div>;
};

export default AuthWrapper;
