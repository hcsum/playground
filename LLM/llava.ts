import ollama from "ollama";

(async () => {
  const res = await ollama.chat({
    // model: "llava:13b",
    model: "llava",
    messages: [
      {
        role: "user",
        // content: `
        //   do not make assumption of what the image is about.
        //   only look for the text "save my exams" or "savemyexams" or something similar in the foreground or background.
        //   answer yes you find it or no if don't.
        // `,
        content: "list all the objects in the image",
        images: [
          // "/Users/sum/Downloads/MA_Q3a_10.1-Solving_Equations_Easy_A_Level_Maths_Pure.png", // yes
          // "/Users/sum/Downloads/Q2a_10.1-Solving_Equations_Medium_A_Level_Maths_Pure.png", // yes
          // "/Users/sum/Downloads/q6-paper3-specimen-ocr-gcse-physics.png", // no
          "/Users/sum/Pictures/IMG_4561.jpg", // no
          // "/Users/sum/Downloads/Q6b_2.9_Transformations-of-Functions_Very_Hard_A_Level_Maths_Pure.png", // yes
        ],
      },
    ],
  });

  console.log(res.message.content);
})();
