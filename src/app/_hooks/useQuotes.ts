export default function useQuotes() {
  const originalQuotes: string[] = [
    "Throughout your journey, every challenge is an opportunity to grow and become better. Every obstacle helps you get closer to your goals. Take a moment to enjoy your favorite drink and fuel your ambitions. 🚀✨",
    "Creativity and adaptability are key to innovating in any field. Staying curious and open to new ideas allows you to overcome any limits. Embrace this with a relaxing drink. 🌟💡",
    "Resilience and perseverance are crucial lessons on the path to success. Keep moving forward even when things get tough. Pair this with a comforting drink. 💪📖",
    "Every line of code is a step towards something extraordinary. Trust the process and let your skills guide you. Enjoy a refreshing drink as you conquer each challenge. 💻✨",
    "Meaningful achievements come from tackling difficult tasks. Embrace struggles and grow stronger with each challenge. Take a moment with a warm drink to reflect. 🌱🔥",
    "Greatness often begins with uncertainty. Step into the unknown with courage, knowing that every risk brings you closer to mastery. Celebrate milestones with your favorite drink. 🌟🚀",
    "Success isn’t just about results—it’s about the mindset and dedication you bring to your work every day. Stay committed and passionate. Sip a drink that fuels your passion. 🌈💼",
    "Challenges are opportunities in disguise. With the right mindset, even setbacks become catalysts for extraordinary success. Enjoy a drink to inspire new ideas. 💡🌟",
    "Innovation is the lifeblood of progress. Stay curious, continuously learning, and pushing the boundaries of what’s possible. Pair this with a drink that sparks creativity. 🚀📚",
    "Progress often requires stepping out of your comfort zone. Embrace discomfort as a sign of growth and move forward with confidence. Celebrate your journey with a drink. 🌟💪",
    "Persistence turns obstacles into stepping stones. Keep believing in your vision, and success will naturally follow. Savor each moment with a refreshing drink. 🌟🚀",
    "On my journey, I've learned that resilience and perseverance are the keys to success. Keep moving forward and enjoy a comforting drink. 🌟☕️",
  ];

  let availableQuotes = [...originalQuotes];
  let shownQuotes: string[] = [];

  const getQuote = () => {
    if (availableQuotes.length === 0) {
      availableQuotes = [...shownQuotes];
      shownQuotes = [];
    }

    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes[randomIndex];

    // Swap the selected quote with the last element for efficiency
    [
      availableQuotes[randomIndex],
      availableQuotes[availableQuotes.length - 1],
    ] = [
      availableQuotes[availableQuotes.length - 1],
      availableQuotes[randomIndex],
    ];

    availableQuotes.pop();
    shownQuotes.push(selectedQuote);
    return selectedQuote;
  };

  return { getQuote };
}
