'use client';

import { useContext, useEffect, MouseEvent, ChangeEvent, useTransition, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, TablePagination, Typography } from '@mui/material';
import { MainContainer } from '../_styles/main.styles';
import { UsersContext } from '../_context/userContext';
import { useRouter } from 'next/navigation';
import { getData } from '../actions';

export const List = () => {
  const [error, setError] = useState('');

  const { users, info, setUsers, setInfo } = useContext(UsersContext);

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const { error, info: resInfo, results } = await getData(info);

      if (!error) {
        if (info?.seed !== resInfo?.seed) setInfo(resInfo);
        setUsers(results || []);
      }

      setError(error || '');
    });
  }, [info]);

  const handleChangePage = (_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (newPage + 1 !== info.page) setInfo({ ...info, page: newPage + 1 });
  }

  const handleChangeRowsPerPage = (
    { target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (+target.value !== info.results) setInfo({ ...info, page: 1, results: +target.value });
  };

  return (
    <MainContainer>
      {users?.length || !isPending ?
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
          {error || <CircularProgress size={80} />}
        </div>
      }
      <TablePagination
        component="div"
        count={100}
        page={info.page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={info.results}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 15, 20]}
      />
    </MainContainer>
  )
}
