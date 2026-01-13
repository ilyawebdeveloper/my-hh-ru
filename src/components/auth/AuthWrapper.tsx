import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const truthe = 0; // Проверка на авторизацию
    const navigateVacansies = async () => {
      return await navigate("/vacansies", { replace: true });
    };

    if (truthe === 0) {
      navigateVacansies();
    }

    return;
  }, []);

  return <div>AuthWrapper</div>;
};

export default AuthWrapper;
