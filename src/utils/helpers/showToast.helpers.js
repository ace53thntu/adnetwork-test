import {toast} from 'react-toastify';

class ShowToast {
  static success(message) {
    toast.success(message, {
      closeOnClick: true
    });
  }

  static error(message) {
    toast.error(message ?? 'Something went wrong.', {
      closeOnClick: true
    });
  }
}

export {ShowToast};
