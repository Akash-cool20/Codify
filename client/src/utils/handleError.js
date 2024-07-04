import { toast } from "sonner";

export const handleError = (error) => {
    console.log(error.data.message);
    toast(error.data.message);
};
