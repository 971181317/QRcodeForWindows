import { IpcMainInvokeEvent } from "electron";
import QRCode = require("qrcode");
import { log } from "./log"

export async function getQrcodeImg(event: IpcMainInvokeEvent, ...args: any[]): Promise<string> {
    if (args.length == 0) {
        log.fatal("qrcode create err: args :", args)
        return "";
    }
    let text = args[0];
    // 等待结果
    let res = await QRCode.toDataURL(text, {
        width: 200,
        color: {
            dark: "#000000",
            light: "#ffffff"
        }
    });
    log.debug("qrcode url: ", res)
    return res;
}