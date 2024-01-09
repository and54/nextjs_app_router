import styled from "@mui/material/styles/styled";

export const MainContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3)
}));

export const UserPageStyled = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  height: `calc(100vh - ${theme.spacing(6)})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
