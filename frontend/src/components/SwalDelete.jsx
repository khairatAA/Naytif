import React from 'react';
import Swal from 'sweetalert2';

function SwalDelete({ title, warningText, onConfirmDelete, cancel_text }) {
  const handleDeleteConfirmation = () => {
    Swal.fire({
      title: title,
      text: warningText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirmDelete(); // Call the function to delete when confirmed
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: cancel_text,
          icon: 'error',
        });
      }
    });
  };

  // Return the function to handle the delete confirmation
  return handleDeleteConfirmation;
}

export default SwalDelete;
