import { toast } from "react-toastify"

const sendErrorSuccessMessage = (type, message) => {
    toast.dismiss();
    if(type === 'success'){
        toast.success(message, {
            style: { background: "#3B82F6", color: "#FFFFFF", borderRadius: "0.75rem" },
            progressStyle: { background: "#3B82F6" },
        });
    } else {
        toast.error(message, {
            style: { background: "#3B82F6", color: "#FFFFFF", borderRadius: "0.75rem" },
            progressStyle: { background: "#3B82F6" },
        });
    }
}

export default sendErrorSuccessMessage