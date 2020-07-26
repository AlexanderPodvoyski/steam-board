import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '10px 40px',
    paddingLeft: 20,
    borderRadius: 0,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: '10px 16px',
  },
  cover: {
    width: 92,
    alignSelf: 'start',
    paddingTop: 20,
  },
  chips: {
    display: 'flex',
    paddingTop: 10,
  },
  chip: {
    marginRight: 15,
  },
}));

const userChip = ({ id, avatar, realname, personaname }, className) => (
  <Chip
    key={id}
    className={className}
    label={`${personaname} (${realname})`}
    avatar={<Avatar src={avatar}>{realname[0]}</Avatar>}
  />
);

export default function GameCard({ title, imgUrl, users = [] }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {imgUrl && <img className={classes.cover} src={imgUrl} alt={title} />}
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {title}
          </Typography>
          {users.length ? (
            <div className={classes.chips}>
              {users.map((user) => userChip(user, classes.chip))}
            </div>
          ) : null}
        </CardContent>
      </div>
    </Card>
  );
}
