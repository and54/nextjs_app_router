'use client';

import { useContext, useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, TablePagination, Typography } from '@mui/material';
import { MainContainer } from '../_styles/main.styles';
import { IList } from '../interfaces/interfaces';
import { UsersContext } from '../_context/userContext';
import { useRouter } from 'next/navigation';

export function List({ results }: IList) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { users, setUsers } = useContext(UsersContext);
  const router = useRouter();

  useEffect(() => setUsers(results), []);

  useEffect(() => { getData() }, [page, rowsPerPage]);

  const getData = async () => {
    const res = await fetch(`https://randomuser.me/api/?results=${rowsPerPage}&seed=ef5a43297aff174b&page=${page}`)
    if (!res.ok) throw new Error('Failed to fetch data');
    const { results } = await res.json();
    setUsers(results);
  }

  const handleChangePage = (_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (newPage + 1 !== page) setPage(newPage + 1);
  }

  const handleChangeRowsPerPage = (
    { target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (+target.value !== rowsPerPage) {
      setRowsPerPage(+target.value);
      setPage(1);
    }
  };

  return (
    <MainContainer>
      {users &&
        <Grid container spacing={2}>
          {users.map((user) => {
            const { login, picture, name, dob, location } = user;
            return (
              <Grid key={login.uuid} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card>
                  <CardActionArea onClick={() => router.push(`/${login.username}`)}>
                    <CardMedia
                      component="img"
                      image={picture.medium}
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
        </Grid>
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
