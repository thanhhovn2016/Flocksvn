import { Box } from "@mui/system"
import SuccessPayment from "../components/invest/successPayment"
import ErrorPayment from "../components/invest/errorPayment"
import {useRouter} from 'next/router'

const PaymentStatus = () => {
    const router = useRouter()
    return (
        <Box>
            {/* {router?.query?.redirect_status === "succeeded"  ? <SuccessPayment /> : <ErrorPayment />} */}
        </Box>
    )
}

export default PaymentStatus