import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ShowToast {
  static success(message) {
    toast.success(message, {
      closeOnClick: true
    });
  }

  static error(message) {
    toast.error(message ?? 'Something went wrong.', {
      closeOnClick: true,
      autoClose: false
    });
  }

  static info(message) {
    toast.info(message, {
      closeOnClick: true
    });
  }
}

export {ShowToast};
