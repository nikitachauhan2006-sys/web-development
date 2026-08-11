const Resume = require("../Models/resume");
const pdfParse = require("pdf-parse");
const cohere = require("cohere-ai");
const fs = require("fs");

const cohereClient = new cohere.CohereClient({
  token: process.env.COHERE_API_KEY,
});

exports.addResume = async (req, res) => {
  try {
    const { job_desc, user } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required.",
      });
    }

    // Read PDF
    const pdfPath = req.file.path;
    const dataBuffer = fs.readFileSync(pdfPath);

    // Extract PDF text
    const pdfData = await pdfParse(dataBuffer);

    //console.log(pdfData.text);

    // Prompt
    const prompt = `
You are an ATS Resume Screening Assistant.

Compare the following Resume with the Job Description.

Resume:
${pdfData.text}

Job Description:
${job_desc}

Return ONLY in this format:

ATS Score: <number out of 100>

Feedback:
Explain in 4-5 lines why this score was given.
`;

    // Cohere API
    const response = await cohereClient.chat({
      model: "command-a-03-2025",
      message: prompt,
    });

    console.log(response.text);

    // Extract ATS Score
    const atsRegex = /ATS Score:\s*(\d+)/i;
    const atsMatch = response.text.match(atsRegex);
    const atsScore = atsMatch ? Number(atsMatch[1]) : 0;

    // Extract Feedback
    const feedbackRegex = /Feedback:\s*([\s\S]*)/i;
    const feedbackMatch = response.text.match(feedbackRegex);
    const feedback = feedbackMatch ? feedbackMatch[1].trim() : "";


    const resume = new Resume({
        user,
        resume_name: req.file.originalname,
        job_desc,
        score: atsScore,
        feedback,
    });

    await resume.save();

    return res.status(200).json({
      success: true,
      atsScore,
      feedback,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllResumesForUser = async (req,res) => {
    try{
        const { user } = req.params;
        //let resumes = await Resume.find({ user: user}).sort({ createdAt: -1});
        let resumes = await Resume.find({ user: user })
          .populate("user", "name email")
          .sort({ createdAt: -1 });
        return res.status(200).json({message: "Your Previous History", resumes: resumes});

    }catch (arr) {
        console.error(arr);
        return res.status(500).json({ error: 'Server error', message: arr.message});
    }
}

/**exports.getResumeForAdmin = async(req,res)=>{
    try{
        //let resumes = await Resume.find({}).sort({ createdAt: -1});
        let resumes = await Resume.find({ user: user })
          .populate("user", "name email")
          .sort({ createdAt: -1 });
        return res.status(200).json({message: "Fetches All History", resumes: resumes});
    }catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error', message: err.message});
    }
}**/

exports.getResumeForAdmin = async (req, res) => {
  try {
    const resumes = await Resume.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Fetched All History",
      resumes: resumes,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
};