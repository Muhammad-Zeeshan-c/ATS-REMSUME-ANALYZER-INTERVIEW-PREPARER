export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const simulateAnalysis = async (onProgress) => {
  const stages = [
    { label: 'Parsing document structure...', progress: 15 },
    { label: 'Extracting keywords and phrases...', progress: 30 },
    { label: 'Matching against job description...', progress: 48 },
    { label: 'Running ATS compliance check...', progress: 62 },
    { label: 'Scoring keyword density...', progress: 75 },
    { label: 'Evaluating formatting rules...', progress: 88 },
    { label: 'Generating impact analysis...', progress: 96 },
    { label: 'Finalizing report...', progress: 100 },
  ];

  for (const stage of stages) {
    await delay(550);
    onProgress(stage);
  }
};
