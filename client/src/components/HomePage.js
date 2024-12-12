import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProducts } from "../redux/productsSlice";
import axios from "axios";
import { Button, Box, Card, CardMedia, CardContent, Grid, IconButton, Typography } from '@mui/material';
import PizzaSticker from '../Assets/Icons/pizza.png';
import FastFood from '../Assets/Icons/Fast-Food.png';
import Cafe from '../Assets/Icons/cafe.png';
import IceCream from '../Assets/Icons/ice-cream.png';
import Grocery from '../Assets/Icons/grocery.png';
import Dessert from '../Assets/Icons/Desserts.png';
import Indian from '../Assets/Icons/Indian.png';
import Mexican from '../Assets/Icons/Mexican.png';
import BreakFast from '../Assets/Icons/Break-Fast.png';
import Chinese from '../Assets/Icons/Chinese.png';
import Sandwich from '../Assets/Icons/sandwich.png';
import Vegetarian from '../Assets/Icons/Vegetarian.png';
import American from '../Assets/Icons/American.png';
import Bakery from '../Assets/Icons/bakery.png';
import Salad from '../Assets/Icons/salad.png';
import StreetFood from '../Assets/Icons/Street-Food.png';
import SeaFood from '../Assets/Icons/Sea-food.png';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    //fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                console.log("API Response:", response.data);
                dispatch(setProducts(response.data));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [dispatch]);

    // Define navigation functions
    const handleCheckoutNavigation = () => {
        navigate('/checkout');
    };

    const handleOrderTrackingNavigation = () => {
        navigate('/order-tracking');
    };

    return (
        <Box sx={{ padding: 4 }}>
            {/* Categories Row */}
            <Box sx={{ display: 'flex', overflowX: 'auto', gap: 3, mb: 3 }}>
                {[
                    { label: 'Pizza', icon: <img src={PizzaSticker} alt="Pizza" width={45} /> },
                    { label: 'Fast-Food', icon: <img src={FastFood} alt="Pizza" width={45} /> },
                    { label: 'Cafe', icon: <img src={Cafe} alt="Cafe" width={45} /> },
                    { label: 'Ice Cream', icon: <img src={IceCream} alt="Ice-Cream" width={45} /> },
                    { label: 'Grocery', icon: <img src={Grocery} alt="Grocery" width={45} /> },
                    { label: 'Desserts', icon: <img src={Dessert} alt="Dessert" width={45} /> },
                    { label: 'Indian', icon: <img src={Indian} alt="Indian" width={45} /> },
                    { label: 'Mexican', icon: <img src={Mexican} alt="Mexican" width={45} /> },
                    { label: 'Break Fast', icon: <img src={BreakFast} alt="Break-Fast" width={45} /> },
                    { label: 'Chinese', icon: <img src={Chinese} alt="Chinese" width={45} /> },
                    { label: 'Sandwich', icon: <img src={Sandwich} alt="Sandwich" width={45} /> },
                    { label: 'Vegetarian', icon: <img src={Vegetarian} alt="Vegetarian" width={45} /> },
                    { label: 'American', icon: <img src={American} alt="American" width={45} /> },
                    { label: 'Bakery', icon: <img src={Bakery} alt="Bakery" width={45} /> },
                    { label: 'Salads', icon: <img src={Salad} alt="Salad" width={45} /> },
                    { label: 'Street Food', icon: <img src={StreetFood} alt="Street Food" width={45} /> },
                    { label: 'Sea Food', icon: <img src={SeaFood} alt="Sea Food" width={45} /> },
                ].map((category, index) => (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <IconButton color="primary">
                            {category.icon}
                        </IconButton>
                        <Typography variant="caption">
                            {category.label}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Offers Section */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#f8d7da', padding: 2 }}>
                        <CardContent>
                            <Typography variant="h6">BOGO Small Popcorn Chicken from KFC</Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 1 }}>Get the deal</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#d1ecf1', padding: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Save 5% with Uber One</Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 1 }}>Pickup now</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#9bfc8b', padding: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Save 10% with Student Discount</Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 1 }}>Pickup now</Button>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Add more offer cards as needed */}
            </Grid>

            {/* Sorting and Filtering Options */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Button variant="outlined">Best Overall</Button>
                <Button variant="outlined">Rating</Button>
                <Button variant="outlined">Price</Button>
                <Button variant="outlined">Dietary</Button>
                <Button variant="outlined">Sort</Button>
            </Box>

            {/* Featured Restaurants Section */}
            <Typography variant="h5" sx={{ mb: 2 }}>Featured on QuickSwift</Typography>
            <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2 }}>
                {[...Array(6)].map((_, index) => (
                    <Card key={index} sx={{ minWidth: 200 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://img.freepik.com/free-vector/flat-restaurant-with-lampposts_23-2147539585.jpg?ga=GA1.1.1582334097.1719190738&semt=ais_hybrid" // Replace with actual restaurant image
                            alt="Restaurant"
                        />
                        <CardContent>
                            <Typography variant="subtitle1">Restaurant Name</Typography>
                            <Typography variant="body2" color="textSecondary">$2.49 Delivery Fee • 30 min</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            {/* Products Section */}
            <Typography variant="h5" sx={{ mb: 2 }}>
                Available Products
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image || "https://via.placeholder.com/150"} // Fallback image
                                alt={product.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{product.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ${product.price}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default HomePage;
