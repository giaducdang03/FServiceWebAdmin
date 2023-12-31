import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast, ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { loginAPI } from 'src/services/UserService';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const [isLogged, setIsLogged] = useState(true);
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted with data:', formData);
    console.log('check form', formData.password);
    if (!formData.password) {
      toast.error('Mật khẩu không được để trống');
    }
    try {
      const res = await loginAPI(formData);
      if (res.status !== 401 && res.status !== 400) {
        if (res && res.data && res.data.status === true) {
          const { jwtToken } = res.data;
          if (jwtToken) {
            const decoded = jwtDecode(jwtToken);
            const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            console.log('check role', role);
            const userName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            setIsLogged(true);
            localStorage.setItem('isLogged', isLogged);
            localStorage.setItem('username', userName);
            localStorage.setItem('role', role);
            localStorage.setItem('accesstoken', jwtToken);

            if (role === 'ADMIN') {
              router.push('/admin');
            } else {
              toast.error('Bạn không có quyền truy cập vào trang này');
              router.push('/login');
            }
          } else {
            toast.error('Lỗi token.');
          }
        } else {
          toast.error(res.data);
        }
      } else {
        toast.error(res.message || res.data.errors.Email[0]);
      }
    } catch (error) {
      console.log('Error fetching Signin', error);
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Stack spacing={3}>
        <TextField name="email" label="Email" onChange={handleChange} />

        <TextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          {/* Forgot password? */}
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        Login
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Đăng nhập vào FService</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            {/* Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link> */}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        style={{
          top: '3em',
          zIndex: 1061,
        }}
      />
    </Box>
  );
}
