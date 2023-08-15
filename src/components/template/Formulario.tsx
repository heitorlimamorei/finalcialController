import StarsRating from "./StarsRating"
import {useState} from 'react'
import Input from "../input";
interface FormModalContentProps {
    handleChange: (event: any) => void;
  }
function Formulario() {
    const [rating, setRating] = useState(0);

    const handleRating = (newRating) => {
      setRating(newRating);
      console.log(rating)
    };
    console.log(rating)

    const [review, setReview] = useState('');

    const handleChange = (event) => {
      setReview(event.target.value);
      console.log(review)
    };
    return ( 
        <div className="w-full h-full">
        <form className="max-w-xl  mx-auto  my-10 p-10 bg-[#E0E5EC] dark:bg-[#232323] rounded-xl dark:shadow-[12px_12px_32px_#0f0f0f,-12px_-12px_32px_#373737]
        shadow-[12px_12px_32px_#5e6063,-12px_-12px_32px_#ffffff] dark:text-white">
            <div className="mb-3">
                <StarsRating
                    onRating={handleRating}
                />
            </div>

            <div className="mb-3"><label htmlFor="text" className="">Escreva uma review sobre o que você achou do app para ajudar-nos a melhorar!</label></div>
            <Input
            id="review"
            name="review"
            type="text"
            value={review}
            placeholder="Sua review aqui!"
            onChange={handleChange}
            />
        </form>
        </div>
     );
}

export default Formulario;