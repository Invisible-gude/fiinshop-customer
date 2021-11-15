import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  root: {
  },
  media: {
    height: 315,
  },
});

export default function AttractionCard(props) {
  const classes = useStyles();
  const attraction = props.attraction;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link href={"/"+attraction.id} >
          <CardMedia
            className={classes.media}
            image={attraction.coverimage}
            title={attraction.name}
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {attraction.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" noWrap={true}>
            {attraction.detail}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link href={"/"+attraction.id} >
          <Button size="small" color="primary">
            Learn More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}