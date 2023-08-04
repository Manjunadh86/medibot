const setupTextarea = document.getElementById("setup-textarea");
const setuploading = document.getElementById("loading-container");
const setupInputContainer = document.getElementById("setup-input-container");
const movieBossText = document.getElementById("movie-boss-text");
const OPENAI_API_KEY0 = "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";
const OPENAI_API_KEY1 = "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";
const OPENAI_API_KEY2 = "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";



const url = "https://api.openai.com/v1/completions";
const url1 = "https://api.openai.com/v1/images/generations";

$(window).on("load", function () {
  $("#loading-container").css("display", "block");
});

document.getElementById("send-btn").addEventListener("click", () => {
  var userInput = $("#setup-textarea").val();
  $("#loading-container").css("display", "none");
  movieBossText.innerText = "";
  fetchBotReply(userInput);
});

async function fetchBotReply(userInput) {
  try {
    const response = await fetchAPI(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENAI_API_KEY0,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Generate a short message to enthusiastically say that you understand situation of patient and tell you are ready to help him out
        
    ###
    outline:cold fever
    message: 
    I am sad to hear that, hold tight while I help you out 

    ###
    outline: ${userInput}
    message: 
    `,
        max_tokens: 100, // Replace with your desired value
        temperature: 0.8, // Replace with your desired value
      }),
    });

    const data = await response.json();
    console.log(data);
    setTimeout(function () {
      $("#loading-container").css("display", "block");
      movieBossText.innerText = data.choices[0].text;
      fetchSynopsis(userInput);
    }, 1000);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchSynopsis(outline) {
  try {
    const response = await fetchAPI(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENAI_API_KEY1,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Generate a detailed message in fragments 
        describing causes preventions medications based on given outline
        ###
        outline: cold fever cough 
        
        synopsis:
        Prevention of Common Cold-
        1.Wash Hands Regularly
        2.Avoid Close Contact with Sick Individuals
        3.Practice Respiratory Etiquette
        4.Keep Surfaces Clean
        
        Medicine for Common Cold:
        1.Over-the-Counter Cold Remedies
        2.Pain Relievers
        3.Vitamin C Supplements
        4.Nasal spray and saline rinse

        Precautionary Steps for Common Cold:
        1.Rest and Hydration
        2.Isolation and Quarantine:
        3.Avoid Smoking and Secondhand Smoke
        4.Seek Medical Attention if Necessary


    
       
        ###
        outline:Skin rash Joint pain Fever
        
        
        synopsis:
        Prevention of joint pain-
        1.Maintain healthy health
        2.Stay physically active
        3.Practice good posture 
        4.Avoid prolonged repititive moments

        Precautionary Steps for Joint Pain-
        1.Use joint protection technique
        2.Use Heat or Cold therapy
        3.Maintain a balanced diet
        4.Listen to your body

        Medication for Joint Pain-
        1.Over-the-Counter Pain Relievers
        2.Acetaminophen
        3.Topical Pain Relief
        4.Prescription Medications




        ###


        outline: ${outline}
        synopsis: 
        `,
        max_tokens: 700,
      }),
    });

    const data = await response.json();
    const synopsis = data.choices[0].text.trim();
    document.getElementById("output-text").innerText = synopsis;
    fetchTitle(synopsis);
    // fetchStars(synopsis);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchTitle(synopsis) {
  try {
    const response = await fetchAPI(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENAI_API_KEY2,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Generate a sentence which makes feel you better when you are not feeling well synopsis:\n\n${synopsis}`,
        max_tokens: 25,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const title = data.choices[0].text.trim();
    document.getElementById("output-title").innerText = title;
    fetchImagePrompt(title, synopsis);
  } catch (error) {
    console.error("Error:", error);
  }
}

// async function fetchStars(synopsis) {
//   try {
//     const response = await fetchAPI(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + OPENAI_API_KEY1,
//       },
//       body: JSON.stringify({
//         model: "text-davinci-003",
//         prompt: `
//           Extract the names in brackets from the synopsis.
//           ###
//           synopsis: ${synopsis}
//           names:   
//         `,
//         max_tokens: 30,
//       }),
//     });

//     const data = await response.json();
//     const extractedText = data.choices[0].text.trim();
//     // const starNames = extractedText.replace("names:", "").trim();
//     // document.getElementById("output-stars").innerText = starNames;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// changes

async function fetchImagePrompt(title, synopsis) {
  // try {
  //   const response = await fetchAPI(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + OPENAI_API_KEY4,
  //     },
  //     body: JSON.stringify({
  //       model: "text-davinci-003",
  //       prompt: `Give a short description of an image that could be used to cure ${title} and ${synopsis}. The description should be rich in visual detail but contain no names.
  //       ###
  //       title: cold cough fever
  //       synopsis: cold cough fever
  //       ###
  //       title: headache 
  //       synopsis: head pain.
  //       ###
  //       title: ${title}
  //       synopsis: ${synopsis}
  //       image description: 
  //       `,
  //       temperature: 0.8,
  //       max_tokens: 100,
  //     }),
  //   });

  //   const data = await response.json();
  //   const imagePrompt = data.choices[0].text.trim();
    fetchImageUrl(synopsis);
    //movieBossText.innerText = imagePrompt;
  // } catch (error) {
  //   console.error("Error:", error);
  // }
}

async function fetchImageUrl(imagePrompt) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY0}`,
    },
    body: JSON.stringify({
      prompt: `${imagePrompt}. There should be no text in this image.`,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    }),
  };
  fetch(url1, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      //const imageData = data.data[0].b64_json;
      if (data.data && data.data.length > 0) {
        document.getElementById(
          "output-img-container"
        ).innerHTML = `<img src="data:image/png;base64,${data.data[0].b64_json}">`;
      }
    });
}

//changes

// Helper function to handle fetch and rate limits
async function fetchAPI(url, options) {
  const response = await fetch(url, options);
  if (response.status === 429) {
    // Handle rate limit by waiting and retrying the request after a delay
    const retryAfter = parseInt(response.headers.get("Retry-After")) || 1;
    await sleep(retryAfter * 1000);
    return fetchAPI(url, options); // Retry the request
  }
  return response;
}

// Helper function to introduce delay using setTimeout
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
