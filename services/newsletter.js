import mail from "@mailchimp/mailchimp_marketing";
import config from "../config/config.js";
import { Status } from "../config/constants.js";

mail.setConfig({
  apiKey: config.mail.apiKey,
  server: config.mail.server,
});

export async function subscribe(userData) {
  try {
    const response = await mail.lists.addListMember(config.mail.appId, {
      email_address: userData.email,
      status: "subscribed",
      merge_fields: {
        FNAME: userData.firstName,
        LNAME: userData.lastName,
      },
    });

    const status = new Status(200, response.status, {
      email: response.email_address,
      firstName: response.merge_fields,
      FNAME,
      lastName: response.merge_fields.LNAME,
    });
    return status;
  } catch (error) {
    const errorText = JSON.parse(error.response.res.text);
    const status = new Status(errorText.status, errorText.title, {
      message: errorText.detail,
      location: "services/newsletter.js >>> function subscribe(userData)" 
    });
    return status;
  }
}
