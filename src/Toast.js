import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadein = keyframes`
  from { transform: scale(.8); opacity: 0; } 
  to { transform: scale(1); opacity: 1; }
`;

const fadeout = keyframes`
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(.8); opacity: 0; }
`;

const ToastContainer = styled.div`
  z-index: 1;
  margin: 8px;
  display: flex;
  position: fixed;
  right: 0px;
  bottom: 0px;
  left: 0px;
  align-items: center;
  justify-content: flex-end;
`;

const ToastMessage = styled.div`
  min-width: 344px;
  max-width: 672px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  font-size: 17px;
  animation: ${fadein} 0.5s, ${fadeout} 0.5s ${props => props.autoHideDuration}s;
`;

const Toast = ({ autoHideDuration, open, onClose, children }) => {
  // NOTE: We only want useEffect to be called when the component is mounted,
  // unmounted and open changes. So onClose and autoHideDuration arent' included
  // in the array, even though useEffect depends on them.
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, (autoHideDuration + 0.5) * 1000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    open && (
      <ToastContainer>
        <ToastMessage autoHideDuration={autoHideDuration}>
          {children}
        </ToastMessage>
      </ToastContainer>
    )
  );
};

export default Toast;
