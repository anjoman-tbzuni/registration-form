import axios from 'axios';

export default {
  sendAuthCode: async (to: string, code: string) => {
    const res = await axios.request({
      url: `https://console.melipayamak.com/api/send/simple/${process.env.MELIPAYAMAK_KEY}`,
      method: 'POST',
      data: {
        to,
        text: `ثبت نام در وبسایت انجمن اسلامی دانشگاه تبریز: ${code}`,
      },
    });
    return res;
  },
};
