import React, { useRef, useState } from "react";
import { Box, Button, Container, HStack, VStack } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const colors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];
const brushSizes = [5, 10, 15, 20, 25];

const Index = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <Container maxW="container.xl" p={0} m={0} centerContent>
      <Box
        as="canvas"
        ref={canvasRef}
        width="100vw"
        height="90vh"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        border="1px solid black"
      />
      <HStack spacing={4} p={4} bg="gray.100" width="100vw" justifyContent="center">
        {colors.map((c) => (
          <Button
            key={c}
            onClick={() => setColor(c)}
            bg={c}
            size="lg"
            border={color === c ? "2px solid black" : "none"}
            borderRadius="full"
            p={4}
          />
        ))}
        {brushSizes.map((size) => (
          <Button
            key={size}
            onClick={() => setBrushSize(size)}
            size="lg"
            border={brushSize === size ? "2px solid black" : "none"}
            borderRadius="full"
            p={4}
          >
            <FaCircle size={size} />
          </Button>
        ))}
      </HStack>
    </Container>
  );
};

export default Index;