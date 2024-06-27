const ProgressBar = ({ progress }) => {
  const colors = [
    "rgba(255, 214, 161)",
    "rgba(255, 175, 163)",
    "rgba(108, 115, 148)",
    "rgba(141, 181, 145)",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: randomColor }}
      ></div>
    </div>
  );
};

export default ProgressBar;
