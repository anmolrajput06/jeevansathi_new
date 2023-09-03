import React from "react";
import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

const MyCollection = [
  {
    // label: "First Picture",
    imgPath:
      "https://images.unsplash.com/photo-1687170570291-25fa0b2ac336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    label: "Second Picture",
    imgPath:
      "https://images.unsplash.com/photo-1686836342891-6d1b01101f3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    label: "Third Picture",
    imgPath:
      "https://images.unsplash.com/photo-1687156025945-c1008a847e51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];

const ImageSlider = () => {
  const CollectionSize = MyCollection.length;
  const theme = useTheme();
  const [index, setActiveStep] = React.useState(0);

  const goToNextPicture = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const goToPreviousPicture = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="img-fluid" style={{height:"150px"}}>
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        {/* <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div> */}

        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval={10000}>
            <img className="d-block mx-auto" src="https://images.unsplash.com/photo-1687170570291-25fa0b2ac336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" style={{ width: "auto" }} />

          </div>
          <div className="carousel-item" data-bs-interval={2000}>
            <img className="d-block mx-auto" src="https://images.unsplash.com/photo-1686836342891-6d1b01101f3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />

          </div>
          <div className="carousel-item">
            <img className="d-block mx-auto" src="https://images.unsplash.com/photo-1687156025945-c1008a847e51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />

          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </div>
  );
};

export default ImageSlider;
