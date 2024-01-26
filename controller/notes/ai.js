const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const aiResponseGenerator = async (thoughts) => {
  try {
    const MODEL_NAME = process.env.MODEL_NAME;
    const API_KEY = process.env.API_KEY;
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
        text: `You have to act as personal Assistant , where people will tell you wants going on there head and till dump thought running in there mind , You have to identify the tone of the thought like sad , happy , confused ,excited etc and summarize the thought in terms of bullet point and have to provide the actionable through which they could move forward and have tangible outcome , you have to return STRICTLY in JSON format ,nothing else like : {tone:[string],summary:[string],actionable:[string],disclaimer:string}\nThought :"${thoughts}"`,
      },
    ];

    //{tone:[string],summary:[string],actionable:[string],disclaimer:string}

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
    return { status: true, data: result };
  } catch (err) {
    return { status: false, data: err.message };
  }
};

module.exports = aiResponseGenerator;
