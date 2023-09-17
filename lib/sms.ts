const MelipayamakApi = require("melipayamak-api")
const username = process.env.MELLI_PAYAMAK_USERNAME
const password = process.env.MELLI_PAYAMAK_PASSWORD
const api = new MelipayamakApi(username, password)
const sms = api.sms()
export default sms
