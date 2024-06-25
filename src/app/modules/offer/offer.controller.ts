import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { offerService } from "./offer.service";

const add = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await offerService.add(payload);
    sendResponse(res, {
        message: 'Offer Added Successfully',
        data: result,
    });
});
export const offerController = { add }