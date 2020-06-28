import React from "react";
import styled from "styled-components";
import { useTheme } from 'emotion-theming';

const Card = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.2);
  padding: 5px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.07);
`

const CardPrimary = styled.div`
  padding: 10px;
`

const CardActions = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`

export {
  Card,
  CardPrimary,
  CardActions,
}