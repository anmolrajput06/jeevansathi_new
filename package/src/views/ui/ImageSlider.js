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
    label: "First Picture",
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
    <div
      style={{
        marginLeft: "40%",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          flexGrow: 1,
        }}
      >
        <Paper
          square
          elevation={0}
          style={{
            height: 50,
            display: "flex",
            paddingLeft: theme.spacing(4),
            backgroundColor: theme.palette.background.default,
            alignItems: "center",
          }}
        >
          <Typography>{MyCollection[index].label}</Typography>
        </Paper>
        <img
          src={MyCollection[index].imgPath}
          style={{
            height: 255,
            width: "100%",
            maxWidth: 400,
            display: "block",
            overflow: "hidden",
          }}
          alt={MyCollection[index].label}
        />
        <MobileStepper
          variant="text"
          position="static"
          index={index}
          steps={CollectionSize}
          nextButton={
            <Button
              size="small"
              onClick={goToNextPicture}
              disabled={index === CollectionSize - 1}
            >
              {/* Next */}
              {theme.direction !== "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={goToPreviousPicture}
              disabled={index === 0}
            >
              {/* Previous */}
              {theme.direction !== "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default ImageSlider;
