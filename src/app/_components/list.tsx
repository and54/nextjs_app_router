'use client';

import { useContext, useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, TablePagination, Typography } from '@mui/material';
import { MainContainer } from '../_styles/main.styles';
import { IList } from '../interfaces/interfaces';
import { UsersContext } from '../_context/userContext';
import { useRouter } from 'next/navigation';

export const List = ({ results, info }: IList) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { users, setUsers } = useContext(UsersContext);
  const router = useRouter();

  useEffect(() => {
    setUsers(results);
    if (info.page && page !== info.page) setPage(info.page);
    if (info.results && rowsPerPage !== info.results) setRowsPerPage(info.results);
  }, [results]);

  useEffect(() =>
    router.push(`?results=${rowsPerPage}&seed=${info.seed}&page=${page}`),
    [page, rowsPerPage]);

  const handleChangePage = (_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (newPage + 1 !== page) {
      setUsers([]);
      setPage(newPage + 1);
    }
  }

  const handleChangeRowsPerPage = (
    { target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (+target.value !== rowsPerPage) {
      setUsers([]);
      setRowsPerPage(+target.value);
      setPage(1);
    }
  };

  return (
    <MainContainer>
      {users?.length ?
        <Grid container spacing={2}>
          {users.map((user) => {
            const { login, picture, name, dob, location } = user;
            return (
              <Grid key={login.uuid} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card>
                  <CardActionArea onClick={() => router.push(`/${login.username}`)}>
                    <CardMedia
                      component="img"
                      image={picture.large}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {`${name.title} ${name.first} ${name.last}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Age: ${dob.age}yo`}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {location.city}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          }
          )}
        </Grid> :
        <div className="loader">
          <CircularProgress size={80} />
        </div>
      }
      <TablePagination
        component="div"
        count={100}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 15, 20]}
      />
    </MainContainer>
  )
}
