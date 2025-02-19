export const getFlagUrl = (countryCode: string) => {
  return `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`;
};

export const formatTime = (time: number, position: number) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;
  if (position === 1) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(3, "0")}`;
  } else {
    return `${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(3, "0")}`;
  }
};
