import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import BasketSummary from './BasketSummary';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice';

export default function BasketPage() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  if (!basket) return <Typography variant="h3">Your basket is empty!</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((product) => (
              <TableRow key={product.productId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box display={'flex'} alignItems={'center'}>
                    <img src={product.pictureUrl} alt={product.name} style={{ height: 50, marginRight: 20 }} />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">$ {(product.price / 100).toFixed(3)}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={status === 'pendingRemoveItem' + product.productId + 'rem'}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: product.productId,
                          quantity: 1,
                          name: 'rem',
                        }),
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {product.quantity}
                  <LoadingButton
                    loading={status === 'pendingAddItem' + product.productId}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({
                          productId: product.productId,
                        }),
                      )
                    }
                    color="secondary"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">$ {((product.price / 100) * product.quantity).toFixed(3)}</TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={status === 'pendingRemoveItem' + product.productId + 'del'}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: product.productId,
                          quantity: product.quantity,
                          name: 'del',
                        }),
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary />
          <Button component={Link} to="/checkout" variant="contained" size="large" fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
