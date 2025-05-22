import { useState } from "react";
import Popup from "./Popup";
import questions from "./questions";
import AILogo from "../assets/AI.svg";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContextProvider";
import generateTodos from "./generateTodos";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [routineData, setRoutineData] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();
  const { user, setLoading } = useUser();

  const askQuestion = () => {
    if (currentQuestion < questions.length) {
      return (
        <Popup
          title={questions[currentQuestion].title}
          inputType={questions[currentQuestion].inputType}
          inputPlaceholder={questions[currentQuestion].inputPlaceholder}
          buttonText={questions[currentQuestion].buttonText}
          onSubmit={handleSubmit}
          onCancel={() => setShowPopup(false)}
        />
      );
    } else {
      setShowPopup(false);
      setLoading(true);
      generateTodos(routineData);
      navigate("/tasks");
    }
  };

  const handleSubmit = (answer) => {
    setRoutineData((prev) => ({
      ...prev,
      [questions[currentQuestion].title]: answer,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      // console.log("Final routine data:", routineData);
    }
  };

  return (
    <>
      <div className="flex-center flex-1 overflow-auto">
        {showPopup ? askQuestion() : null}
        {showSignupPopup && (
          <Popup
            title="Login to Start"
            inputType="hidden"
            inputPlaceholder=""
            buttonText="Sign Up"
            onSubmit={() => {
              setShowSignupPopup(false);
              navigate("/signup");
            }}
            onCancel={() => setShowSignupPopup(false)}
          />
        )}
        <div>
          <button
            className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-black hover:text-white outline outline-1 -outline-offset-1 outline-gray-300 gap-2"
            onClick={() => {
              if (user !== null) {
                setShowPopup(true);
              } else {
                setShowSignupPopup(true);
              }
            }}
          >
            Generate Task
            <img src={AILogo} alt="AI" width={"25px"} />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
