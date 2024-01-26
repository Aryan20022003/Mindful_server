const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const { json } = require("body-parser");

const aiResponseGenerator = async (thoughts) => {
  try {
    const MODEL_NAME = process.env.MODEL_NAME;
    const API_KEY = process.env.AI_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      {
        text: `You have to act as personal Assistant , where people will tell you wants going on there head and till dump thought running in there mind , You have to identify the tone of the thought like sad , happy , confused ,excited etc and summarize the thought in terms of bullet point and have to provide the actionable through which they could move forward and have tangible outcome , you have to return STRICTLY in JSON format and must not contain any extra text before it and should not contain Bad control character.Return value strictly obey return format at any cost,string should consist of 1 paragraph only with out any tags return format: {tone:[string],summary:string,actionable:[string],disclaimer:string },tone should be array of string , summary should be string with out newline , actionable should be array of string and disclaimer should be string .\nThought :"${thoughts}"`,
      },
    ];

    //{tone:[string],summary:[string],actionable:[string],disclaimer:string}

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const data = await result.response.text();

    //code should fail here as return format could change 
    const timedData = data.slice(7, -3).trim();
    // console.log("start\n", timedData, "\nend");
    // console.log(timedData[0]);
    const finalData = JSON.parse(timedData);
    console.log(finalData);
    return { status: true, data: finalData };
  } catch (err) {
    console.log(err.message);
    return { status: false, data: "could not generate Summary" };
  }
};

module.exports = aiResponseGenerator;
