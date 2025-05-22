import { useUser } from "../context/UserContextProvider";

const generateTaskPrompt = (data) => {
    console.log(data['Deadline']);
    const deadline = new Date(data['Deadline']);
    const today = new Date();
    const days = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return `You are a productivity coach. Based on the following user input:
  
  Daily Time Commitment is ${data["Daily Time Commitment"]}  per day and 
 in  Days: ${days}  where user distracts by ${data["Distractions"]} and motivation of user is ${data["Motivation"]} and
   Preferred Time of Day: ${data["Preferred Time of Day"]},
  Task Preference: ${data["Task Preference"]},
  Goal: ${data["Your Goal"]}
  
  Generate a day-wise task schedule starting from today until the deadline. Tasks should be aligned with the user's time availability, motivation, and goal. Keep tasks small and achievable. Respond only in JSON-like format such as:
  
  {
    "day1": "Learn about variables in JavaScript",
    "day2": "Understand data types",
    ...
  }
  
  No additional text. Only return the structured JSON task list.`;
};


const generateTodos = async (routineData) => {
    const { setTodos, setLoading } = useUser();

    let prompt = generateTaskPrompt(routineData);

    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;
    const AI_Model = import.meta.env.VITE_AI_MODEL;

    fetch(apiUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            // "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
            // "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: `${AI_Model}`,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        }),
    })
        .then(data => data.json())
        .then(data => {
            console.log(data);
            setTodos(data.choices[0].message.content);
            setLoading(false);
        })
    // console.log(prompt);
}

export default generateTodos;