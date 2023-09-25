import { toast } from 'react-toastify'

export const notifyError = (message) => (
    toast.error(message, {
        style: {
          border: '4px solid #D83F31',
          padding: '14px',
          background: "#EEEEEE",
          color: '#D83F31',
          fontWeight: 'bold'
        },
        iconTheme: {
          primary: "#2686CE",
          secondary: "#EBBA16",
        },
        position: "top-center"
      } )
);

export const notifySuccess = (message) => (
    toast.success(message, {
        style: {
          border: '4px solid #1dbf48',
          padding: '14px',
          background: "#EEEEEE",
          color: '#1dbf48',
        },
        iconTheme: {
          primary: "#2686CE",
          secondary: "#EBBA16",
        },
        position: "top-center"
      })
)
export const notifyInfo = (message) => {
  toast.info(message, {
    position: "top-center"
  });
}