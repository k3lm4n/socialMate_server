// import * as twilio from "twilio";

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
// const client = new twilio.Twilio(accountSid, authToken);

// function sendOTP(phoneNumber: string, otp: string): Promise<void> {
//   return client.messages
//     .create({
//       body: `O seu OTP: ${otp}`,
//       from: twilioNumber,
//       to: phoneNumber,
//     })
//     .then((message) => console.log(message.sid));
// }

// function generateOTP(length: number = 6): string {
//   let otp = "";
//   for (let i = 0; i < length; i++) {
//     otp += Math.floor(Math.random() * 10).toString();
//   }
//   return otp;
// }

// let storedOTP: string | null = null;

// function storeOTP(otp: string): void {
//   storedOTP = otp;
// }

// function validateOTP(input: string): boolean {
//   if (storedOTP === input) {
//     storedOTP = null; // Invalida o OTP depois de usado
//     return true;
//   }
//   return false;
// }

// function verifyUserInput(
//   phoneNumber: string,
//   userOTP: string
// ): Promise<boolean> {
//   if (validateOTP(userOTP)) {
//     return Promise.resolve(true);
//   } else {
//     const newOTP = generateOTP();
//     storeOTP(newOTP);
//     return sendOTP(phoneNumber, newOTP).then(() => false);
//   }
// }

// export const OTPServices = {
//   sendOTP,
//   generateOTP,
//   storeOTP,
//   validateOTP,
//   verifyUserInput,
// };
