import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import { ThumbUpAlt, Delete, MoreHoriz, ThumbDown } from '@material-ui/icons';
import moment from 'moment';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6"> {post.creator} </Typography>
        <Typography variant="body2">
          {' '}
          {moment(post.createdAt).fromNow()}{' '}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          siz="small"
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHoriz fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <CardContent>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {' '}
          {post.message}{' '}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button color="primary" size="small" onClick={() => {}}>
          <ThumbUpAlt fontSize="small" /> Like {post.likeCount}
        </Button>
        <Button
          color="primary"
          size="small"
          onClick={() => {
            dispatch(deletePost(post._id));
          }}
        >
          <Delete fontSize="small" /> Delete
        </Button>
        <Button color="secondary" size="small" onClick={() => {}}>
          <ThumbDown fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
