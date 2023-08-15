import { StarIcon } from "../icons/Icones";

function FeedbackCard(rating, review) {
    console.log(review)
  return (
    <li className="w-full h-[fit] rounded-xl p-3 dark:shadow-[8px_8px_25px_#141414,-8px_-8px_25px_#323232] shadow-[28px_28px_57px_#5a5a5a,-28px_-28px_57px_#ffffff]">
      <div className="flex flex-row items-center w-full h-1/3">
        <img className="w-[10%] h-[95%] rounded-full " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAA1BMVEUAgP+x+0ocAAAASElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIC3AcUIAAFkqh/QAAAAAElFTkSuQmCC" />
        <p className="ml-2">{`${rating.rating}`}</p>
        <div className="mb-1">{StarIcon(6)}</div>
      </div>
      <div>
        <p className="m-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam delectus molestias repellendus, quidem cumque accusamus in repellat, enim culpa, saepe natus eius ab modi aspernatur</p>
      </div>
    </li>
  );
}

export default FeedbackCard;
