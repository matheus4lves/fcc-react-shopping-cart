import styled from "styled-components";
import { IconButton } from "@material-ui/core";

export const Wrapper = styled.div`
  margin: 40px;
`

/* Besides creating your own button, you can import a component,
style it, and export it as an "improved" component. It'll have
all of its original properties plus the ones you added. */
export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`