
//get json from filepath 
const test_file_path = 'legal-tech-team/src/test_data.json';

//make request with gpt-3.5 turbo 

var survey_data = "Below are the results of a survey, provide a summary of the data. \n\n" + JSON.stringify(test_file_path);

openai.createCompletion({
    model: "text-davinci-003",
    prompt: survey_data,
  }).then((response) => console.log(response.data));