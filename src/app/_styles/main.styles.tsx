import styled from "@mui/material/styles/styled";

export const MainContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  '.loader': {
    minHeight: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export const UserPageStyled = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  height: `calc(100vh - ${theme.spacing(6)})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
