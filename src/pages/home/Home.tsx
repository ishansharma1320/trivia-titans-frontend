import Grid from '@mui/material/Grid';
import LoginForm from '../../components/LoginForm/LoginForm';
function HomePage() {
    return  (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <LoginForm></LoginForm>
        </Grid>
      </Grid>
      );
}

export default HomePage;