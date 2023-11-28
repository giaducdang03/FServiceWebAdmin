// import * as React from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import axios from "axios";
// // import { Toaster, toast } from "react-hot-toast";

// export default function DeleteModal({

// }) {
//   const handleSubmit = async () => {
//     try {
//       let res = await axios.delete(
//         `https://652fa0cc6c756603295d6229.mockapi.io/users/${dataDelete}`
//       );
//       if (res && res.status === 200) {
//         toast.success("Xóa thành công");
//         handleClose();
//         fetchAllUser();
//       } else {
//         toast.error("Xóa thất bại");
//       }
//     } catch (error) {
//       console.log("Error deleting user", error);
//     }
//   };

//   return (
//     <div>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Delete Modal"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Do you want to delete user ?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Close</Button>
//           <Button onClick={handleSubmit} autoFocus>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Toaster position="top-right" reverseOrder={false} />
//     </div>
//   );
// }
