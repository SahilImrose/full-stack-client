import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});
const Home = () => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        fetch('https://peaceful-sierra-22355.herokuapp.com/product')
            .then(res => res.json())
            .then(data => setEvents(data))
    })
    let dataLoaded;
    if(events.length === 0){
 dataLoaded = <div className="text-center"><div class="spinner-border text-warning" style={{width: '3rem', height: '3rem'}} role="status">
 <span class="visually-hidden">Loading...</span>
</div></div>;
    }else{
        dataLoaded = <div class="spinner-border d-none" style={{width: '3rem', height: '3rem'}} role="status">
        <span class="visually-hidden">Loading...</span>
      </div> ;
    }
    const classes = useStyles();
    return (
        <div className="container mt-5 mb-5">{dataLoaded}
            <div className="home">
                
                {events.map(product => <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="340"
                            image={product.imageURL}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {product.productName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Link style={{textDecoration:'none'}} to={`/checkOut/${product._id}`}><Button size="small" color="primary" variant="contained">
                            Buy Now
                        </Button></Link>
                    </CardActions>
                </Card>)}
            </div></div>
    );
};

export default Home;