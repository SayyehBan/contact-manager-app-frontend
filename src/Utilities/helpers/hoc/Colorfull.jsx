const Colorfull = (WrappedComponent) => {
  return function ColorfulComponent(props) {
    const colors = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
    ];
    const randomColor = colors[Math.floor(Math.random() * 6)];
    const className = `bg-${randomColor}`;

    return (
      <div className={className}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default Colorfull;
