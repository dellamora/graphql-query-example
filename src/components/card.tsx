const Card = ({
    subTitle,
    title,
    append,
  }: {
    title: string;
    subTitle: string;
    append?: string;
  }): JSX.Element => {
    return (
      <div className="flex h-28 w-80 flex-col items-center justify-center rounded-md border-2 border-primary bg-secondary p-4 shadow-md">
        <h1 className="text-center font-bold">{title}</h1>
        <h1 className="text-textGray">{subTitle}</h1>
        {append ? <h1 className="text-textGray">{append}</h1> : null}
      </div>
    );
  };
  
  export default Card;
  