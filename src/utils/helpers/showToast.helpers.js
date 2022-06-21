import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ShowToast {
  static success(message) {
    toast.success(message, {
      closeOnClick: true
    });
  }

  static error(message) {
    console.log(
      '🚀 ~ file: showToast.helpers.js ~ line 12 ~ ShowToast ~ error ~ message',
      message
    );
    toast.error(message || 'Something went wrong.', {
      closeOnClick: true,
      autoClose: 5000
    });
  }

  static info(message) {
    toast.info(message, {
      closeOnClick: true
    });
  }
}

export {ShowToast};
