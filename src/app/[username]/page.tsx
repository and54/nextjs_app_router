'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { UsersContext } from '../_context/userContext';
import { IUser } from '../interfaces/interfaces';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { UserPageStyled } from '../_styles/main.styles';

const UserPage = () => {
  const [user, setUser] = useState<IUser>();
  const { searchUser } = useContext(UsersContext);
  const { username } = useParams<{ username: string }>();
  const router = useRouter();

  useEffect(() => {
    if (!username) router.back();
    const tmpUser = searchUser(username);
    if (tmpUser) setUser(tmpUser);
  }, []);

  const { picture, name, dob, location, email, phone } = user || {};
  const { street, city, state, country, postcode } = location || {};

  const info = useMemo(() => ([
    { name: 'Age', value: dob?.age },
    { name: 'Address', value: `${street?.number} ${street?.name}, ${city}, ${state} ${postcode}, ${country}` },
    { name: 'Email', value: email },
    { name: 'Date of Birth', value: new Date(dob?.date || 0).toLocaleDateString() },
    { name: 'Phone', value: phone },
  ]), [user]);

  return (
    <UserPageStyled>
      <Card sx={{ maxWidth: 500 }} elevation={3}>
        <CardActions>
          <Button size="small" onClick={router.back}>
            Go Back
          </Button>
        </CardActions>
        <CardMedia
          component="img"
          image={picture?.large}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${name?.title} ${name?.first} ${name?.last}`}
          </Typography>
          {info.map(({ name, value }) => (
            <div key={value}>
              <Typography sx={{ display: 'inline' }} variant="body1">
                {`${name}: `}
              </Typography>
              <Typography sx={{ display: 'inline' }} variant="body1" color="text.secondary">
                {value}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </UserPageStyled>
  )
}

export default UserPage;