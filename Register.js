// import React, { useState } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';


// const MySwal = (Swal);

// const defaultTheme = createTheme();

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     Username: '',
//     Password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();
  
//   //   try {
//   //     const response = await fetch('http://localhost:3001/register', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify(formData),
//   //     });
  
//   //     if (response.ok) {
//   //       console.log('User registered successfully');
  
//   //       // Show SweetAlert on success
//   //       MySwal.fire({
//   //         icon: 'success',
//   //         title: 'Registration Successful',
//   //         text: 'You have successfully registered!',
//   //         confirmButtonText: 'OK',
//   //       }).then(() => {
//   //         navigate('/');
//   //         // Redirect or perform any other action after successful registration
//   //       });
//   //     } else {
//   //       console.error('Error registering user:', response.statusText);
//   //       // Handle error, e.g., show error message to the user
//   //     }
//   //   } catch (error) {
//   //     console.error('Error registering user:', error.message);
//   //     // Handle error, e.g., show error message to the user
//   //   }
//   // };  

//   const loginUser = async (jsonData) => {
//   try {
//     const response = await fetch('http://localhost:3001/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(jsonData),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('Success:', data);
//       // Handle successful login, e.g., redirect or set user state
//     } else {
//       console.error('Error:', response.statusText);
//       // Handle login error, e.g., show error message to the user
//     }
//   } catch (error) {
//     console.error('Error:', error.message);
//     // Handle other errors, e.g., show error message to the user
//   }
// };

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const data = new FormData(event.currentTarget);
//   const jsonData = {
//     Email: data.get('Email'),
//     Username: data.get('Username'),
//     Password: data.get('Password'),
//   };
//   loginUser(jsonData);
// };


//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   onChange={handleChange}
//                   value={formData.email}
//                   autoComplete="given-name"
//                   name="Email"
//                   required
//                   fullWidth
//                   id="Email"
//                   label="Email"
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   onChange={handleChange}
//                   value={formData.username}
//                   required
//                   fullWidth
//                   id="Username"
//                   label="Username"
//                   name="Username"
//                   autoComplete="family-name"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   onChange={handleChange}
//                   value={formData.password}
//                   required
//                   fullWidth
//                   name="Password"
//                   label="Password"
//                   type="password"
//                   id="Password"
//                   autoComplete="new-password"
//                 />
//               </Grid>
//             </Grid>
//             <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//               Sign Up
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="/" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MySwal = Swal;

const defaultTheme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: '',
    Username: '',
    Password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User registered successfully');

        // Show SweetAlert on success
        MySwal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered!',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/');
          // Redirect or perform any other action after successful registration
        });
      } else {
        console.error('Error registering user:', response.statusText);
        // Handle error, e.g., show error message to the user
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
      // Handle error, e.g., show error message to the user
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={formData.Email}
                  autoComplete="given-name"
                  name="Email"
                  required
                  fullWidth
                  id="Email"
                  label="Email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={formData.Username}
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  name="Username"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={formData.Password}
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="password"
                  id="Password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;

